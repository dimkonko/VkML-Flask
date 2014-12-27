import urllib
import json
import requests


def build_url(url_root, url_path, url_args):
	url_args = urllib.urlencode(url_args)
	url = url_root + url_path + "?" + url_args
	return url


def get_oauth_link(client_id, scope, redirect_uri, response_type):
	url_args = locals()
	return build_url("https://oauth.vk.com", "/authorize", url_args)


def get_access_token(client_id, client_secret, redirect_uri, code):
	url_args = locals()
	url = build_url("https://oauth.vk.com", "/access_token", url_args)
	r = requests.get(url)
	req_data = json.loads(r.text)
	return req_data


def get_audio(user_id, access_token, v=5.25, count=""):
	"""Get track list
	This function send a post request to api service and create a track
	list with returned params
	"""
	url_args = locals()
	print "Args",  url_args
	url = build_url("https://api.vk.com", "/method/audio.get", url_args)
	r = requests.post(url)
	req_data = json.loads(r.text)
	return req_data
