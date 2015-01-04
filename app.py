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
from etc.view_decorators import authorized_only

import etc.vkapi as vkapi


app = Flask(__name__)
app.config["DEBUG"] = True
app.config["TESTING"] = False
app.config["SECRET_KEY"] = os.urandom(24)

CLIENT_ID = "4585679"
CLIENT_SECRET = "UR0YHKjbj0ZwKg2nOKuN"


@app.route("/")
def index():
	if "user" in session:
		return redirect("/profile")
	auth_link = vkapi.get_oauth_link(CLIENT_ID, "audio",
		request.url_root + "auth", "code")
	return render_template("home.html", auth_link=auth_link)


@app.route("/auth")
def auth():
	# Checking for errors
	code = request.args.get("code")
	if not code:
		abort(500)

	# Making a request
	req_data = vkapi.get_access_token(CLIENT_ID, CLIENT_SECRET,
		request.url_root + "auth", code)
	if "error" in req_data:
		abort(500)

	# Adding user data in current session
	session["user"] = {
		"access_token": req_data["access_token"],
		"user_id": req_data["user_id"]
	}
	return redirect("/profile")


@app.route("/profile")
@authorized_only
def profile():
	"""Args:
		track_list - list with track objects
		audio_count - Total audio tracks
	"""
	req_data = vkapi.get_audio(session["user"]["user_id"],
		session["user"]["access_token"], count=5)
	if "error" in req_data:
		print "Error in get_audio:"
		print req_data
		return "Something went wrong. Try to reload a page."
	track_list = req_data["response"]["items"]
	audio_count = req_data["response"]["count"]

	req_data = vkapi.get_albums(session["user"]["user_id"],
		session["user"]["access_token"])
	if "error" in req_data:
		print "Error in get_albums:"
		print req_data

	# Ignore first item, becouse first item is a count of albums
	album_list = req_data["response"][1:]
	return render_template("profile.html", track_list=track_list)


@app.route("/logout")
@authorized_only
def logout():
	session.clear()
	return redirect("/")


if __name__ == "__main__":
	app.run()