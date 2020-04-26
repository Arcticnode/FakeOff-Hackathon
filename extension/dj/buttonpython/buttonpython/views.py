from django.shortcuts import render
import requests
from rake_nltk import Rake
from bs4 import BeautifulSoup
from subprocess import run, PIPE
import sys


def button(request):
    return render(request, 'home.html')


def output(request):
    url = ''
    textArray = []
    text = ''

    page = requests.get("https://www.bbc.com/news/world-europe-52409407")
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
    list_words = words.get_ranked_phrases()

    data = ''
    for w in list_words[:5]:
        data = data + w + '%'

    return render(request, 'home.html', {'data': data})


def external(request):
    inp = request.POST.get('param')
    words = Rake(max_length=1)
    words.extract_keywords_from_text(inp)
    list_words = words.get_ranked_phrases()
    list_words = list_words[:5]

    print(list_words)
    data = ''
    for w in list_words:
        data = data + w + '%'

    return render(request, 'home.html', {'data1': data})


def search_key_words_url(url):
    url = ''
    textArray = []
    text = ''

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
    list_words = words.get_ranked_phrases()

    result = ''
    for w in list_words:
        result = result + w + '%'
    return result
