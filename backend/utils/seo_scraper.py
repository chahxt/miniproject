import requests
from bs4 import BeautifulSoup

def scrape_seo_data(url):
    seo_data = {"title": "", "description": "", "h1": [], "h2": [], "h3": []}

    headers = {
        'User-Agent': 'OPTIBOOST-Bot/1.0 (+https://yourdomain.com/contact)'
    }

    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()  # Raise error for bad status codes (400/500)

        soup = BeautifulSoup(response.text, 'html.parser')

        # Title
        if soup.title and soup.title.string:
            seo_data['title'] = soup.title.string.strip()
        else:
            seo_data['title'] = 'No title found'

        # Meta Description
        description_tag = soup.find('meta', attrs={'name': 'description'})
        if description_tag and description_tag.get('content'):
            seo_data['description'] = description_tag['content'].strip()
        else:
            seo_data['description'] = 'No description found'

        # H1, H2, H3 Tags (strip spaces, ignore empty ones)
        seo_data['h1'] = [h1.get_text(strip=True) for h1 in soup.find_all('h1') if h1.get_text(strip=True)] or ['No H1 tags found']
        seo_data['h2'] = [h2.get_text(strip=True) for h2 in soup.find_all('h2') if h2.get_text(strip=True)] or ['No H2 tags found']
        seo_data['h3'] = [h3.get_text(strip=True) for h3 in soup.find_all('h3') if h3.get_text(strip=True)] or ['No H3 tags found']

    except requests.exceptions.RequestException as e:
        seo_data['error'] = f"Network error fetching SEO data: {str(e)}"
    except Exception as e:
        seo_data['error'] = f"Unexpected error: {str(e)}"

    return seo_data
