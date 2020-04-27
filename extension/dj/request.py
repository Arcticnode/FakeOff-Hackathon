import requests

data = requests.get("https://reques.in/api/users")

print(data.text)
