import { startOfWeek, addWeeks, format } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";



interface Filter {
    [key: string]: string[]
}

interface Sort {
    [key: string]: string
}

type RequestData = {
    table_name: string,
    filter: Filter,
    sort: Sort
}

type ResponseData = {
    event_name: string,
    event_location: string,
    event_date: string,
    xata: {
        createdAt: string,
        updatedAt: string,
        version: number
    },
    formatted_date: string
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const currentDate: Date = new Date();
        const nextWeek: Date = addWeeks(currentDate, 1);
        const formattedCurrentDate: string = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        const formattedNextWeek: string = format(nextWeek, "yyyy-MM-dd'T'HH:mm:ss'Z'");

        const URL: string = "https://myapp-shtaldaidq-uc.a.run.app/read-records/"


        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                table_name: "zero",
                columns: ["date", "event_location", "event_description", "event_date", "event_link"],
                filter: {"$all": [{"event_date": {"$ge": formattedCurrentDate}},
                                  {"event_date": {"$lt": formattedNextWeek}}]},
                sort: {"event_date": "asc"}
            })
        });
        const data: Promise<ResponseData> = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("ERROR: fetching data", error);
        res.status(500).json({error: "Error fetching data"});
    }
}