import scrapy
from datetime import datetime
from zero.items import QuotesItem
from scrapy.loader import ItemLoader


class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = [
        "https://quotes.toscrape.com/page/1/",
    ]

    def parse(self, response):
        date = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
        
        for quote in response.css("div.quote"):
            loader = ItemLoader(item=QuotesItem())

            loader.add_value("text", quote.css("span.text::text").get())
            loader.add_value("author", quote.css("small.author::text").get())
            loader.add_value("date", date)
            yield loader.load_item()

        next_page = response.css("li.next a::attr(href)").get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
