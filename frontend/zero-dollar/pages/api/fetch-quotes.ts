import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    date: string,
    author: string,
    quote: string,
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const URL: string = "http://localhost:8080/read-records/"
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "table_name": "zero",
                "columns": ["date", "author", "quote"],
                "filter": {"date": "2023-09-18T11:34:27Z"},
                "sort": {"date": "asc"}
                })
        });
        const data: Promise<ResponseData> = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("ERROR: fetching data", error);
        res.status(500).json({error: "Error fetching data"});
    }
}