import eel
import requests
from rake_nltk import Rake
from bs4 import BeautifulSoup

url = ''
textArray = []
text = ''


@eel.init('web')
@eel.start('searchkeywords.html')
@eel.expose
def search_key_words_url(url):
    if url.startswith("www"):
        url = 'http://' + url
    page = requests.get(url)
    information_soup = BeautifulSoup(page.content, 'html.parser')
    all_text = information_soup.find_all('p')

    for i in all_text:
        text = i.get_text().strip()
        if text != '' and text.endswith("."):
            textArray.append(' ' + text)

    for t in textArray:
        text = text + t

    words = Rake(max_length=1)
    words.extract_keywords_from_text(text)
    list_words = words.get_ranked_phrases_with_scores()

    return list_words[:5]


