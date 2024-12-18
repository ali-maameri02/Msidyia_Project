import requests

LESSONSPACE_API_KEY = "•••••••• •••• •••• •••• ••••••••••••"  # Replace with your actual API key
LESSONSPACE_API_URL = "https://api.lessonspace.com/v2/spaces"

def create_lessonspace_room():
    headers = {
        "Authorization": f"Bearer {LESSONSPACE_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "space_name": "Group Class Room",  # Customize this as needed
        "settings": {
            "whiteboard": True,
            "recording": True,
            "chat": True,
            "screen_sharing": True,
            # You can add more settings here based on your needs
        }
    }

    response = requests.post(LESSONSPACE_API_URL, json=payload, headers=headers)
    if response.status_code == 201:
        room_data = response.json()
        return room_data.get("space_url")  # Returns the URL to join the room
    else:
        raise Exception(f"Failed to create Lessonspace room: {response.text}")
