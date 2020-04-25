import requests
import sys
from rake_nltk import Metric, Rake
from bs4 import BeautifulSoup

url = ''
textArray = []
text = ''

try:
    url = sys.argv[1]
    print(url)
except:
    print('The input was not a URL')

if url is not '':
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

    print('\n' + text)

    words = Rake(max_length=1)
    words.extract_keywords_from_text(text)
    print(words.get_ranked_phrases_with_scores())

    degree_word_frequency = Rake(ranking_metric=Metric.DEGREE_TO_FREQUENCY_RATIO, max_length=1)
    degree_word_frequency.extract_keywords_from_text(text)
    degree_word_frequency_array = degree_word_frequency.get_ranked_phrases_with_scores()
    print(degree_word_frequency_array)

    word_degree = Rake(ranking_metric=Metric.WORD_DEGREE, max_length=1)
    word_degree.extract_keywords_from_text(text)
    word_degree_array = word_degree.get_ranked_phrases_with_scores()
    print(word_degree_array)

    word_frequency = Rake(ranking_metric=Metric.WORD_FREQUENCY, max_length=1)
    word_frequency.extract_keywords_from_text(text)
    word_frequency_array = word_frequency.get_ranked_phrases_with_scores()
    print(word_frequency_array)