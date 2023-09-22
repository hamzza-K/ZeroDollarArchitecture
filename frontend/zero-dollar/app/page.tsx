'use client'
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

type RowData = {
  key: string;
  name: string;
  role: string;
  status: string;
};

type ColumnData = {
  key: string;
  label: string;
};

export default function Home() {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/fetch-quotes");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);


  return (
    <h1>Navanaga</h1>
  );
}