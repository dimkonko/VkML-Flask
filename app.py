# from urlparse import urlparse, parse_qs
import os
import requests
import json

from flask import (
	Flask,
	session,
	render_template,
	request,
	redirect
)


app = Flask(__name__)
app.debug = True
app.secret_key = os.urandom(27)


@app.route("/")
def index():
	auth_link = "https://oauth.vk.com/authorize?" +\
				"client_id=4585679" +\
				"&scope=audio" +\
				"&redirect_uri=http://localhost:5000/auth" +\
				"&response_type=code"
	return render_template("home.html", auth_link=auth_link)

@app.route("/auth")
def auth():
	req_data = request.args.get("code")#url_to_dict(request.url)
	if not req_data:
		return "Something goes wrong"

	r = requests.get("https://oauth.vk.com/access_token?client_id=4585679"+\
		"&client_secret=UR0YHKjbj0ZwKg2nOKuN"+\
		"&redirect_uri=http://localhost:5000/auth" +\
		"&code={0}".format(req_data)
	)
	req_data = json.loads(r.text)

	if "error" in req_data:
		return "Something goes wrong"

	session["user"] = {"token": req_data["access_token"], "user_id": req_data["user_id"]}
	return redirect("/profile")


@app.route("/profile")
def profile():
	if "user" not in session:
		return redirect("/")
	r = requests.post("https://api.vk.com/method/audio.get?" +\
		"user_id={0}".format(session["user"]["user_id"]) +\
		"&access_token={0}".format(session["user"]["token"]) +\
		"&count=5" +\
		"&v=5.25"
	)
	req_data = json.loads(r.text)["response"]
	track_list = req_data["items"]
	return render_template("profile.html", track_list=track_list)


def url_to_dict(url):
	# data = parse_qs(urlparse(url).query)
	# if "error" in data:
	# 	return None
	# return data
	print url
	url_args = url.split("#")
	arg_pairs = [arg.split("&") for arg in url_args]
	data = map(arg_pairs)
	return data



if __name__ == "__main__":
	app.run()