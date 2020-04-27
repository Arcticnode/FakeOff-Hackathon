import pymysql
from . import URLS
import requests
from . import covid19fact_data_source
from . import wk_black_list_data_source

mydb = pymysql.connect(host="localhost", user='root', passwd="", database="test_data")
cursor = mydb.cursor()


def updateWhiteList():
    dropTable('WhiteList')
    createTable()
    addWhoInformation()
    insertCovid19Information()
    insertWHOInformation()


def update_BList():
    # dropTable('BlackList')
    # createBList()
    # insertBList()

    print("Update in Process... Please Wait...")
    linksArray = wk_black_list_data_source.getPage(URLS.wk_black_list)
    print('%s links were found and reading to be added to the Black List.' % len(linksArray))
    val = []

    for i in linksArray:
        index = linksArray.index(i)
        if not linksArray[index].lower() in val:
            val.append(linksArray[index].lower())

    counter = 0
    for v in val:
        counter = counter + insertNewLinkBList(v)
    print('\n\n\n' + str(counter) + ' new links are added')


def createTable():
    table = """CREATE TABLE WhiteList( ID INT NOT NULL AUTO_INCREMENT, SOURCE TEXT NOT NULL, TITLE TEXT NULL, 
    INFORMATION MEDIUMTEXT NOT NULL, PRIMARY KEY(ID)) """
    print('Table created')
    cursor.execute(table)


def dropTable(table_name):
    drop_table = "DROP TABLE IF EXISTS %s"
    cursor.execute(drop_table % table_name)
    print('Table dropped')


def insertCovid19Information():
    print("Insert Process... Please Wait...")
    page = requests.get(URLS.covid19facts_en_main)

    source = covid19fact_data_source.getLinks(page)
    print("%s sources found" % len(source))
    print("Sources collected... Please Wait...")

    title = covid19fact_data_source.getTitles(page)
    print("%s titles found" % len(title))
    print("Titles collected... Please Wait...")

    information = URLS.getInformation_covid19()
    print("%s articles found" % len(information))
    print("Information collected... Please Wait...")
    val = []

    for i in information:
        index = information.index(i)
        val.append((source[index], title[index], '\n'.join(map(str, information[index]))))

    print(val)

    add_order = "INSERT INTO WhiteList (SOURCE, TITLE,INFORMATION) VALUES (%s, %s, %s);"

    cursor.executemany(add_order, val)
    mydb.commit()
    print(cursor.rowcount, "was inserted.")


def close_connection():
    mydb.close()


def select_all(table):
    retrieve = "SELECT * FROM %s"
    cursor.execute(retrieve % table)
    rows = cursor.fetchall()
    for row in rows:
        print(row)

    mydb.commit()


def createBList():
    table = """CREATE TABLE BlackList( ID INT NOT NULL AUTO_INCREMENT, LINK TEXT NOT NULL UNIQUE , CONFIRMED BOOLEAN, 
     PRIMARY KEY(ID)) """
    print('Table BlackList created')
    cursor.execute(table)


def insertBList():
    print("Insert Process... Please Wait...")
    linksArray = wk_black_list_data_source.getPage(URLS.wk_black_list)
    print('%s links were found and reading to be added to the Black List.' % len(linksArray))
    val = []

    for i in linksArray:
        index = linksArray.index(i)
        if not linksArray[index].lower() in val:
            val.append(linksArray[index].lower())

    print(val)

    add_order = "INSERT INTO BlackList (LINK, CONFIRMED) VALUES (%s, 1);"

    cursor.executemany(add_order, val)
    mydb.commit()
    print(cursor.rowcount, " was inserted.")


def insertNewLinkBList(url):
    url = '' + url
    counter = 0
    if not url.startswith("https://"):
        url = "https://" + url
    try:
        insertLink = "INSERT INTO BlackList (LINK, CONFIRMED) VALUES (%s,1);"
        cursor.execute(insertLink, url)
        mydb.commit()
        print(cursor.rowcount, " link inserted to BlackList")
        counter = counter + 1
    except:
        print(url + ' is already in the BlackList')

    return counter


def insertWHOInformation():
    print("Insert Process... Please Wait...")
    information = URLS.get_updated_information_who()
    print("%s articles found" % len(information))
    print("Information collected... Please Wait...")
    val = []
    web = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/events-as-they-happen'
    for i in information:
        index = information.index(i)
        val.append((web, None, information[index]))

    print(val)

    add_order = "INSERT INTO WhiteList (SOURCE, TITLE,INFORMATION) VALUES (%s, %s, %s);"

    cursor.executemany(add_order, val)
    mydb.commit()
    print(cursor.rowcount, "was inserted.")


def addWhoInformation():
    title = 'World Health Organization'
    source = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019'
    information = 'The World Health Organization (WHO) is a specialized agency of the United Nations responsible for ' \
                  'international public health. The WHO Constitution, which establishes the agencys governing ' \
                  'structure and principles, states its main objective as ensuring "the attainment by all peoples of ' \
                  'the highest possible level of health."It is headquartered in Geneva, Switzerland, ' \
                  'with six semi-autonomous regional offices and 150 field offices worldwide. \nThe WHO was ' \
                  'established in 7 April 1948, which is commemorated as World Health Day. The first meeting of the ' \
                  'World Health Assembly (WHA), the agencys governing body, took place on 24 July 1948. The WHO ' \
                  'incorporated the assets, personnel, and duties of the League of Nations Health Organisation and ' \
                  'the Office International d Hygiène Publique, including the International Classification of ' \
                  'Diseases. Its work began in earnest in 1951 following a significant infusion of financial and ' \
                  'technical resources.\nThe WHOs broad mandate includes advocating for universal healthcare, ' \
                  'monitoring public health risks, coordinating responses to health emergencies, and promoting human ' \
                  'health and well being. It provides technical assistance to countries, sets international health ' \
                  'standards and guidelines, and collects data on global health issues through the World Health ' \
                  'Survey. Its flagship publication, the World Health Report, provides expert assessments of global ' \
                  'health topics and health statistics on all nations. The WHO also serves as a forum for summits and ' \
                  'discussions on health issues.\nThe WHO has played a leading role in several public health ' \
                  'achievements, most notably the eradication of smallpox, the near-eradication of polio, ' \
                  'and the development of an Ebola vaccine. Its current priorities include communicable diseases, ' \
                  'particularly HIV/AIDS, Ebola, malaria and tuberculosis; non-communicable diseases such as heart ' \
                  'disease and cancer; healthy diet, nutrition, and food security; occupational health; and substance ' \
                  'abuse. '
    val = [source, title, information]

    add_order = "INSERT INTO WhiteList (SOURCE, TITLE,INFORMATION) VALUES (%s , %s, %s);"
    cursor.execute(add_order, val)
    mydb.commit()
    print(cursor.rowcount, "was inserted.")
