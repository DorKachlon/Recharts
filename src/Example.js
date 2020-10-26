import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

function Example() {
    const data = [
        { date: "01.01.2020", uv: 400, pv: 700, amt: 2400 },
        { date: "02.01.2020", uv: 500, pv: 800, amt: 2400 },
        { date: "03.01.2020", uv: 700, pv: 900, amt: 2400 },
    ];

    return (
        <div >
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="red" />
                <Line type="monotone" dataKey="pv" stroke="#000000" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
            </LineChart>
        </div>
    );
}

export default Example;
