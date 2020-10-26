import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Selector from "./Selector";
import Chart from "./Chart";

function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

export default function App() {
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);
    // const [currentCountry, setCurrentCountry] = useState();
    const [inputValue, setInputValue] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
                );
                const dataJson = csvJSON(data);
                const dataWitoutStates = dataJson.filter(
                    (obj) => obj["Province/State"] === "" && obj["Country/Region"]
                );

                const countries = dataWitoutStates.map((obj) => {
                    if (obj["Country/Region"]) {
                        return { label: obj["Country/Region"] };
                    }
                });
                setCountries(countries);
                setData(dataWitoutStates);
            } catch (e) {}
        }
        fetchData();
    }, []);
    // console.log(countries);
    return (
        <div>
            <div className="header">
                <h1 className="title">Coronavirus Worldwide</h1>
                <Selector countries={countries} setInputValue={setInputValue} />
            </div>
            {inputValue ? (
                <Chart data={data} inputValue={inputValue} />
            ) : (
                <h2 className="body">No country selected</h2>
            )}
        </div>
    );
}

// 10/23/20: "40687"
// 10/24/20: "40768"
// 10/25/20: "40833"
// Country/Region: "Afghanistan"
// Lat: "33.93911"
// Long: "67.709953"
// Province/State: ""
