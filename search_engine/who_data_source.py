import requests
import URLS
import re
from bs4 import BeautifulSoup


def update_information_links(url):
    page = requests.get(url)
    # titleArray = getTitles(page)
    # print(len(titleArray))
    informationArray = getNewsInformation(page)
    # print(len(informationArray))
    return informationArray


def getLinks(page):
    urlsArray = []
    links_soup = BeautifulSoup(page.content, 'lxml')
    all_links = links_soup.find_all('a', class_='link-container')
    for fact_link in all_links:
        link = fact_link.get('href')
        if not link.startswith('https://www.who.int'):
            link = URLS.who_covid_en_main + link
        if '(' in link:
            link = link.replace('(', '%28')
        if ')' in link:
            link = link.replace(')', '%29')
        urlsArray.append(link)

    return urlsArray


def getTitles(page):
    titlesArray = []
    titles_soup = BeautifulSoup(page.content, 'html.parser')

    results = titles_soup.find(id='PageContent_C229_Col01')
    all_paragrahs = results.find_all('div', class_='sf-content-block content-block')
    for title in all_paragrahs:
        realTitle = title.get_text(separator=" ")
        txt = realTitle
        if '\xa0' in txt:
            txt = txt.replace('\xa0', '')
        titlesArray.append(txt)

    print(titlesArray)
    return titlesArray


def getNewsInformation(page):
    text_soup = BeautifulSoup(page.content, 'html.parser')

    results = text_soup.find(id='PageContent_C229_Col01')
    all_div = results.find_all('div', class_='sf-content-block content-block')

    all_paragraphsArray = []
    '''
    for div in all_div:
        all_paragraphs = div.find_all('p')
        paragraphText = ''
        for paragraph in all_paragraphs:
            txt = paragraph.text.strip()
            if not txt == '':
                paragraphText = paragraphText + txt + '\n'
    '''
    for div in all_div:
        paragraph = div.get_text(" ")
        # print(div.get_text(separator="\n"))
        if '\xa0' in paragraph:
            txt = paragraph.replace('\xa0', '')
        txt = txt.strip()
        # print(txt)
        # print('\n\n')
        all_paragraphsArray.append(txt)
        # paragraphText = ''

    return all_paragraphsArray

