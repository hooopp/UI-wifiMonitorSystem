import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function RechartGraph() {
  const data = [
    {
      timeStamp: "2022-01-01T15:00:00",
      "192.168.0.1": 4,
      "192.168.0.2": 23,
    },
    {
      timeStamp: "2022-01-01T16:00:00",
      "192.168.0.1": 5,
      "192.168.0.2": 20,
    },
    {
      timeStamp: "2022-01-01T17:00:00",
      "192.168.0.1": 6,
      "192.168.0.2": 24,
    },
    {
      timeStamp: "2022-01-01T18:00:00",
      "192.168.0.1": 2,
      "192.168.0.2": 22,
    },
    {
      timeStamp: "2022-01-01T19:00:00",
      "192.168.0.1": 4,
      "192.168.0.2": 21,
    },
    {
      timeStamp: "2022-01-01T20:00:00",
      "192.168.0.1": 5,
      "192.168.0.2": 20,
    },
  ]
  return (
    <div>
      <AreaChart
        width={730}
        height={250}
        data={data}
        style={{margin: "-0.5em"}}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="timeStamp"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="192.168.0.1"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="192.168.0.2"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
}

export default RechartGraph;
