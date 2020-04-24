import requests
import URLS
from bs4 import BeautifulSoup


def update_information_links(url):
    page = requests.get(url)
    titlesArray = getTitles(page)
    linksArray = getLinks(page)
    informationArray = getNewsInformation(page)

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
    all_titles = results.find_all('div', class_='sf-content-block content-block')
    for title in all_titles:
        realTitle = title.find_all('h2')
        for rt in realTitle:
            titlesArray.append(rt.text.strip())

    return titlesArray


def getNewsInformation(page):
    textInformation = []
    text_soup = BeautifulSoup(page.content, 'html.parser')

    results = text_soup.find(id='PageContent_C229_Col01')
    all_information = results.find_all('p')
    for information in all_information:
        textInformation.append(information.text.strip())

    return textInformation
