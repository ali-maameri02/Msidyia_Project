import requests

LESSONSPACE_API_KEY = "9bdee75a-2971-4123-88c0-848982d4eff0"  # Replace with your actual API key
LESSONSPACE_API_URL = "https://api.thelessonspace.com/v2/spaces/launch/"

def create_lessonspace_room(space_name):
    headers = {
        "Authorization": f"Organisation {LESSONSPACE_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "space_name": space_name,
        "settings": {
            "whiteboard": True,
            "recording": True,
            "chat": True,
            "screen_sharing": True,
        }
    }

    response = requests.post(LESSONSPACE_API_URL, json=payload, headers=headers)
    if response.status_code == 201:
        room_data = response.json()
        return room_data.get("space_url")
    elif response.status_code == 403:
        # Handle organization block
        error_details = response.json()
        raise Exception(f"Organization blocked: {error_details.get('detail')}. Visit {error_details.get('url')}")
    else:
        raise Exception(f"Failed to create Lessonspace room: {response.text}")
