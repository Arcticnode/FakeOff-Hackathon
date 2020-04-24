import pymysql
import URLS
import requests
import covid19fact_data_source

mydb = pymysql.connect(host="localhost", user='root', passwd="", database="test_data")
cursor = mydb.cursor()


def update_covid19facts():
    dropTable('TEST')
    createTable()
    insertCovid19Information()


def createTable():
    table = """CREATE TABLE TEST( ID INT NOT NULL AUTO_INCREMENT, SOURCE TEXT NOT NULL, TITLE TEXT NOT NULL, 
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

    table_name = 'TEST'
    val = []

    for i in information:
        index = information.index(i)
        val.append((source[index], title[index], '\n'.join(map(str, information[index]))))

    print(val)

    add_order = "INSERT INTO TEST (SOURCE, TITLE,INFORMATION) VALUES (%s, %s, %s)"

    cursor.executemany(add_order, val)
    mydb.commit()
    print(cursor.rowcount, "was inserted.")


def close_connection():
    mydb.close()


def select_all(table):
    retrive = "SELECT * FROM %s"
    cursor.execute(retrive % table)
    rows = cursor.fetchall()
    for row in rows:
        print(row)

    mydb.commit()
