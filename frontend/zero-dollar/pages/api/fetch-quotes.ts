import { addWeeks, format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    date: string,
    author: string,
    qupte: string,
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const currentDate: Date = new Date();
        const nextWeek: Date = addWeeks(currentDate, 1);
        const formattedCurrentDate: string = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        const formattedNextWeek: string = format(nextWeek, "yyyy-MM-dd'T'HH:mm:ss'Z'");

        const URL: string = "https://zero-dollar-api-rblfprys6q-ue.a.run.app/read-records/"


        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                table_name: "zero",
                columns: ["date", "author", "quote"],
                filter: {"$all": [{"date": {"$ge": formattedCurrentDate}},
                                  {"date": {"$lt": formattedNextWeek}}]},
                sort: {"date": "asc"}
            })
        });
        const data: Promise<ResponseData> = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("ERROR: fetching data", error);
        res.status(500).json({error: "Error fetching data"});
    }
}