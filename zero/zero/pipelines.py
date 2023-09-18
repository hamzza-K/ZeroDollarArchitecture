from xata.client import XataClient
from itemadapter import ItemAdapter

API_KEY = ""
DB_URL  = ""

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
