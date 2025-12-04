"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react";

const AttendanceCharts = ({data}:{data: {name: string, present: number, absent: number}[]}) => {
  return (
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis width="auto" axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px", fontWeight: "bold" }} />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[ 10, 10, 0, 0 ]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[ 10, 10, 0, 0 ]}
          />
        </BarChart>
        </ResponsiveContainer>
  );
};

export default AttendanceCharts;
