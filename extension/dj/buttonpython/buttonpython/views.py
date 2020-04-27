from django.shortcuts import render
import requests
from rake_nltk import Rake
from bs4 import BeautifulSoup


def button(request):
    return render(request, 'home.html')


def buttonUrl(request):
    return render(request, 'url_kw_finder.html')


def buttonText(request):
    return render(request, 'text_kw_finder.html')


def urlSearch(request):
    textArray = []
    text = ''
    inp = request.POST.get('param')
    page = requests.get(inp)
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

    print(data)

    return render(request, 'results.html', {'data': data})


def textSearch(request):
    inp = request.POST.get('param')
    words = Rake(max_length=1)
    words.extract_keywords_from_text(inp)
    list_words = words.get_ranked_phrases()
    list_words = list_words[:5]

    print(list_words)
    data = ''
    for w in list_words:
        data = data + w + '%'

    return render(request, 'results.html', {'data': data})
