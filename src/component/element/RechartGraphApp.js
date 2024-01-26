import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RechartGraphApp({ simulationDataApp, ssidMonitor }) {
  return (
    <div>
      <AreaChart
        width={730}
        height={250}
        data={simulationDataApp}
        style={{ margin: "-0.5em" }}
      >
        <defs>
          {ssidMonitor.map((ssid, index) => {
            return ssid.nodes.map((node, index) => {
              if (node.checked) {
                return (
                  <linearGradient
                    key={index}
                    id={node.node}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={node.color}
                      stopOpacity={0.8}
                    />
                    <stop offset="95%" stopColor={node.color} stopOpacity={0} />
                  </linearGradient>
                );
              }
            });
          })}
        </defs>
        <XAxis dataKey="timeStamp" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {ssidMonitor.map((ssid, index) => {
          return ssid.nodes.map((node, index) => {
            if (node.checked) {
              return (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={node.node}
                  stroke={node.color}
                  fillOpacity={1}
                  fill={`url(#${node.node})`}
                />
              );
            }
          });
        })}
      </AreaChart>
    </div>
  );
}

export default RechartGraphApp;
