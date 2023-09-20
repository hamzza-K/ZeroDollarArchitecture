from typing import Any, Union
from datetime import datetime
from pydantic import BaseModel
from xata.client import XataClient
from fastapi import FastAPI, HTTPException, Query, Body

app = FastAPI()

API_KEY = "xau_0ZXi5vvSWOii8e3RrcEVjMllNZv4EEMT5"
DB_URL = "https://Makafate-Amal-s-workspace-98ldke.us-east-1.xata.sh/db/zeroDollar"

xata = XataClient(api_key=API_KEY, db_url=DB_URL)

class FilterParams(BaseModel):
    """Base Model class to pass into the FastAPI routes for xata client."""
    table_name: str
    columns: list
    filter: Union[dict, None] = None
    sort: Union[dict, None] = None


@app.get("/")
def read_root():
    return {"message": "All OK"}

@app.post("/read-records/")
def read_records(filter_params: FilterParams):
    """Reads the records from XataDB"""
    try:
        resp = xata.data().query(filter_params.table_name, {
            "columns": filter_params.columns,
            "filter": filter_params.filter,
            "sort": filter_params.sort
        })

        if resp.is_success():
            records = resp.json()["records"]

            for record in records:
                date_str = record["date"]
                date_obj = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                formatted_date = date_obj.strftime("%A, %B %d, %Y")
                record["formatted_date"] = formatted_date

            return records
        else:
            raise HTTPExecption(status_code=resp.status_code, detail="Error reading records")
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error