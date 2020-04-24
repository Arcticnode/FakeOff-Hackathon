import requests
import URLS
from bs4 import BeautifulSoup


def getPage(url):
    page = requests.get(url)
    linksArray = getLinks(page)
    return linksArray


def getLinks(page):
    linksArray = []
    links_soup = BeautifulSoup(page.content, 'html.parser')
    all_table = links_soup.find_all('table', class_='wikitable sortable')

    for table in all_table:
        all_td = table.find_all('td')
        for td in all_td:
            txt = td.text.strip()

            if not txt.startswith('['):

                if any(ext in ur)
                linksArray.append(txt)

    return linksArray
