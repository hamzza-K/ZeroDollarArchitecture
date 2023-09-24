import configparser
from xata.client import XataClient
from itemadapter import ItemAdapter

config = configparser.ConfigParser()
config.read('secrets.ini')

API_KEY = "xau_2VUwPU8mGKMitsK0fhkFiMwp8dM3hTPi"
DB_URL = "https://Makafate-Amal-s-workspace-98ldke.us-east-1.xata.sh/db/zeroDollar"

class ZeroPipeline:
    def __init__(self):
        self.client = XataClient(api_key=API_KEY, db_url=DB_URL)

    def process_item(self, item, spider):
        text   = item['text']
        date   = item['date']
        author = item['author']

        record = {
            "author": author,
            "quote": text,
            "date": date
        }
        
        resp = self.client.records().insert("zero", record)
        spider.logger.info("Record id is: %s" %resp.json()["id"])
        return item
