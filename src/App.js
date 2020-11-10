import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Selector from "./components/Selector";
import MyLineChart from "./components/MyLineChart";
import MyBarChart from "./components/MyBarChart";
import { MyButton } from "./styled";
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
  const [inputValue, setInputValue] = useState();
  const [chartType, setChartType] = useState("line");
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

  const changeChart = (type) => {
    setChartType(type);
  };
  return (
    <div>
      <div className="header">
        <h1 className="title">Coronavirus Worldwide</h1>
        <Selector countries={countries} setInputValue={setInputValue} />
        <MyButton className="left" variant="contained" onClick={() => changeChart("bar")}>
          Bar Chart
        </MyButton>
        <MyButton variant="contained" onClick={() => changeChart("line")}>
          Line Chart
        </MyButton>
      </div>
      {inputValue ? (
        chartType === "line" ? (
          <MyLineChart data={data} inputValue={inputValue} />
        ) : (
          <MyBarChart data={data} inputValue={inputValue} />
        )
      ) : (
        <h2 className="body">No country selected</h2>
      )}
    </div>
  );
}
