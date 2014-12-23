import os
import requests
import json

from flask import (
	Flask,
	session,
	render_template,
	request,
	redirect,
	abort
)
from etc.view_decorators import need_login


app = Flask(__name__)
app.config["DEBUG"] = False
app.config["TESTING"] = False
app.config["SECRET_KEY"] = os.urandom(24)

AUTH_ROUTE = "auth"


@app.route("/")
def index():
	if "user" in session:
		return redirect("/profile")
	auth_link = "https://oauth.vk.com/authorize?" +\
				"client_id=4585679" +\
				"&scope=audio" +\
				"&redirect_uri={0}".format(request.url_root + AUTH_ROUTE) +\
				"&response_type=code"
	return render_template("home.html", auth_link=auth_link)


@app.route("/auth")
def auth():
	req_data = request.args.get("code")
	print "data", req_data
	if not req_data:
		abort(500)

	print "url: ", request.url_root

	r = requests.get("https://oauth.vk.com/access_token?client_id=4585679"+\
		"&client_secret=UR0YHKjbj0ZwKg2nOKuN"+\
		"&redirect_uri={0}".format(request.url_root + AUTH_ROUTE) +\
		"&code={0}".format(req_data)
	)
	req_data = json.loads(r.text)

	if "error" in req_data:
		abort(500)

	session["user"] = {"token": req_data["access_token"], "user_id": req_data["user_id"]}
	return redirect("/profile")


@app.route("/profile")
@need_login
def profile():
	if "user" not in session:
		return redirect("/")
	r = requests.post("https://api.vk.com/method/audio.get?" +\
		"user_id={0}".format(session["user"]["user_id"]) +\
		"&access_token={0}".format(session["user"]["token"]) +\
		# "&count=5" +\
		"&v=5.25"
	)
	req_data = json.loads(r.text)["response"]
	track_list = req_data["items"]
	return render_template("profile.html", track_list=track_list)


@app.route("/logout")
@need_login
def logout():
	if "user" not in session:
		return redirect("/")
	session.clear()
	return redirect("/")


if __name__ == "__main__":
	app.run()