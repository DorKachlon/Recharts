import React, { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    ComposedChart,
    Bar,
} from "recharts";

function getMonthFromNumber(mon) {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months[mon];
}

export default function MyBarChart({ data, inputValue }) {
    const [dataOfCountry, setDataOfCountry] = useState([]);
    const [countryName, setCountryName] = useState("");

    //תומך רק לשנת 2020
    useEffect(() => {
        if (inputValue) {
            const index = data.findIndex((obj) => obj["Country/Region"] === inputValue.label);
            const obj = data[index];
            setCountryName(obj["Country/Region"]);
            delete obj["Country/Region"];
            delete obj["Lat"];
            delete obj["Long"];
            delete obj["Province/State"];
            console.log(obj);
            let objOfMonth = {};
            for (const property in obj) {
                const monthNumber = property.split("/")[0];
                // let newObj = {};
                // newObj[property] = obj[property];
                objOfMonth[monthNumber] = objOfMonth[monthNumber]
                    ? [...objOfMonth[monthNumber], obj[property]]
                    : [obj[property]];
                //     array = [...array, { date: property, value: obj[property] }];
            }
            console.log(objOfMonth);
            let numberPeerMonth = [];
            for (const monthNumber in objOfMonth) {
                const arrayOfMonth = objOfMonth[monthNumber];
                const LastNumberAtMonth = arrayOfMonth[arrayOfMonth.length - 1];
                numberPeerMonth.push(LastNumberAtMonth);
            }
            console.log(numberPeerMonth);
            let differnceBetweenMonths = [];
            for (let index = 0; index < numberPeerMonth.length; index++) {
                if (index > 0) {
                    differnceBetweenMonths[index] = {
                        name: getMonthFromNumber(index),
                        value: numberPeerMonth[index] - numberPeerMonth[index - 1],
                    };
                } else {
                    differnceBetweenMonths[index] = {
                        name: getMonthFromNumber(index),
                        value: numberPeerMonth[index],
                    };
                }
            }
            setDataOfCountry(differnceBetweenMonths);

            // setDataOfCountry(array);
        }
    }, [inputValue, data]);

    return (
        <div style={{ width: "100vw", height: "80vh" }}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={dataOfCountry}
                    margin={{ top: 20, right: 80, left: 40, bottom: 0 }}
                >
                    <Bar name={countryName} dataKey="value" barSize={40} fill="#413ea0" />
                    <Line name={countryName} type="monotone" dataKey="value" stroke="red" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend verticalAlign="top" height={36} />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
