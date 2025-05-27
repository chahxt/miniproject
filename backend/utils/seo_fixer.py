from bs4 import BeautifulSoup

def suggest_fixes(html):
    soup = BeautifulSoup(html, 'html.parser')
    suggestions = []

    # Check <title>
    if not soup.title or not soup.title.string.strip():
        suggestions.append({
            'element': 'title',
            'message': 'Missing or empty <title> tag.',
            'fix': 'Add a relevant <title> for the page.'
        })

    # Check meta description
    if not soup.find('meta', attrs={'name': 'description'}):
        suggestions.append({
            'element': 'meta[name=description]',
            'message': 'Missing meta description.',
            'fix': 'Add a concise meta description (under 160 characters).'
        })

    # Check images for alt attributes
    for img in soup.find_all('img'):
        if not img.get('alt'):
            suggestions.append({
                'element': 'img',
                'message': f'Missing alt text for image: {img.get("src", "")}',
                'fix': 'Add a descriptive alt attribute.'
            })

    # Check for multiple <h1> tags
    h1_tags = soup.find_all('h1')
    if len(h1_tags) > 1:
        suggestions.append({
            'element': 'h1',
            'message': f'{len(h1_tags)} <h1> tags found.',
            'fix': 'Use only one <h1> tag per page for best SEO.'
        })

    # Check for internal links
    a_tags = soup.find_all('a')
    if len(a_tags) < 3:
        suggestions.append({
            'element': 'a',
            'message': 'Low number of internal links.',
            'fix': 'Add more internal links to important pages.'
        })

    return suggestions
