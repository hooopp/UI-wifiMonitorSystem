import { Legend } from "chart.js";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

function RechartGraph({ data, listNode }) {

  return (
    <div>
      <AreaChart
        width={730}
        height={250}
        data={data}
        style={{ margin: "-0.5em" }}
      >
        <defs>
          {listNode.map((node, index) => {
            return (
              node.checked && (
                <linearGradient
                  key={index}
                  id={node.node}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={node.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={node.color} stopOpacity={0} />
                </linearGradient>
              )
            );
          })}
        </defs>
        <XAxis dataKey="timeStamp" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {listNode.map((node, index) => {
          return (
            node.checked && (
              <Area
                type="monotone"
                dataKey={node.node}
                stroke={node.color}
                fillOpacity={1}
                fill={`url(#${node.node})`}
                key={index}
              />
            )
          );
        })}
      </AreaChart>
    </div>
  );
}

export default RechartGraph;
