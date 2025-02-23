import json
import os

import requests
from seleniumwire import webdriver
from flask import Flask, jsonify
from flask_cors import CORS
import atexit

AUTH_FILE = "auths.json"


def cleanup_auth_file():
    try:
        if os.path.exists(AUTH_FILE):
            os.remove(AUTH_FILE)
            print(f"Deleted authentication file: {AUTH_FILE}")
    except OSError as e:
        print(f"Error deleting authentication file: {e}")


atexit.register(cleanup_auth_file)

app = Flask(__name__)
CORS(app)


@app.route("/api/get_auths", methods=["GET"])
def get_auths():
    if os.path.exists("auths.json"):
        return jsonify({
            "Success": "auths.json already exists"
        })

    # Configure Chrome options for headless mode
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')  # Run Chrome in headless mode
    chrome_options.add_argument('--disable-gpu')  # Disable GPU acceleration
    chrome_options.add_argument('--no-sandbox')  # Required for some environments

    # Initialize driver with headless configuration
    driver = webdriver.Chrome(options=chrome_options)

    one_day_token = None
    auth_cookie = None

    def interceptor(request, response):
        nonlocal one_day_token, auth_cookie

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

    auths_obj = {
        "one_day_token": one_day_token,
        "auth_cookie": auth_cookie
    }

    with open("auths.json", "w") as f:
        json.dump(auths_obj, f)

    return jsonify({
        "Success": "Created new auths.json"
    })


@app.route("/api/search_products/<product>", methods=["GET"])
def search_products(product):
    with open("auths.json", "r") as f:
        auths = dict(json.load(f))
    cookies = auths["auth_cookie"]

    session = requests.Session()

    url = f"https://www.sayweee.com/_next/data/{auths['one_day_token']}/en/search.json?keyword={product}&trigger_type=search_active"

    response = session.get(url, cookies=cookies)

    print(response)
    if "\"products\"" in response.text:
        json_data = json.loads(response.text)
        products = json_data["pageProps"]["result"]["products"]

    return jsonify(products)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
