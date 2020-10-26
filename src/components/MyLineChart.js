import React, { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
} from "recharts";

export default function MyLineChart({ data, inputValue }) {
    const [dataOfCountry, setDataOfCountry] = useState([]);
    const [countryName, setCountryName] = useState("");
    useEffect(() => {
        if (inputValue) {
            const index = data.findIndex((obj) => obj["Country/Region"] === inputValue.label);
            const obj = data[index];
            setCountryName(obj["Country/Region"]);
            delete obj["Country/Region"];
            delete obj["Lat"];
            delete obj["Long"];
            delete obj["Province/State"];
            let array = [];
            console.log(obj);
            for (const property in obj) {
                array = [...array, { date: property, value: obj[property] }];
            }
            setDataOfCountry(array);
        }
    }, [inputValue, data]);

    return (
        <div style={{ width: "100vw", height: "80vh" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={dataOfCountry}
                    margin={{ top: 20, right: 80, left: 40, bottom: 0 }}
                >
                    <Line name={countryName} type="monotone" dataKey="value" stroke="red" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="value" type="category" />
                    <Legend verticalAlign="top" height={36} />
                    <Tooltip formatter={(value) => new Intl.NumberFormat("en").format(value)} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
