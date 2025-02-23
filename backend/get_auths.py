import json

from seleniumwire import webdriver

driver = webdriver.Chrome()

one_day_token = None
auth_cookie = None


def interceptor(request, response):
	global one_day_token, auth_cookie

	if "_buildManifest.js" in request.url:
		start_index = request.url.index('static/') + len('static/')
		end_index = request.url.index('/_buildManifest.js')

		one_day_token = request.url[start_index:end_index]

	if "https://www.sayweee.com/en/search?keyword=tofu&trigger_type=search_active" == request.url:
		for k, v in response.headers.items():
			if "auth_token=" in v:
				token_list = v.split("; ")

				auth_cookie = token_list[0]
				auth_cookie = {
					"auth_token": auth_cookie.split("=")[1]
				}
				break


driver.response_interceptor = interceptor
driver.get('https://www.sayweee.com/en/search?keyword=tofu&trigger_type=search_active')
driver.close()

auth_obj = {
	"one_day_token": one_day_token,
	"auth_cookie": auth_cookie
}

with open("auths.json", "w") as f:
	json.dump(auth_obj, f)
