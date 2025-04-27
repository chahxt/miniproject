import requests
from bs4 import BeautifulSoup

def analyze_images(url):
    image_data = {"missing_alt": [], "wrong_format": []}

    headers = {
        'User-Agent': 'OPTIBOOST-Bot/1.0 (+https://yourdomain.com/contact)'
    }

    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img')

        for img in img_tags:
            src = img.get('src', '').strip()

            # Missing alt attribute
            alt_text = img.get('alt')
            if not alt_text or not alt_text.strip():
                image_data["missing_alt"].append(src or "Unknown Source")

            # Wrong image formats (allow only jpg, jpeg, png, gif)
            if src and not src.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                image_data["wrong_format"].append(src)

        # If no images found at all
        if not img_tags:
            image_data['info'] = "No images found on the page."

    except requests.exceptions.RequestException as e:
        image_data['error'] = f"Network error fetching image data: {str(e)}"
    except Exception as e:
        image_data['error'] = f"Unexpected error: {str(e)}"

    return image_data
