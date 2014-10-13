from functools import wraps
from flask import session, redirect

def need_login(f):
	@wraps(f)
	def inner(*args, **kwargs):
		if "user" not in session:
			return redirect("/")
		return f(*args, **kwargs)
	return inner