
import scrapy
from itemloaders.processors import TakeFirst

class QuotesItem(scrapy.Item):
    text   = scrapy.Field(output_processor=TakeFirst())
    date   = scrapy.Field(output_processor=TakeFirst())
    author = scrapy.Field(output_processor=TakeFirst())