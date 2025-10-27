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

const data = [
  {
    name: "Mon",
    present: 4000,
    absent: 2400,
    amt: 2400,
  },
  {
    name: "Tues",
    present: 3000,
    absent: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    present: 2000,
    absent: 9800,
    amt: 2290,
  },
  {
    name: "Thurs",
    present: 2780,
    absent: 3908,
    amt: 2000,
  },
  {
    name: "Fri",
    present: 1890,
    absent: 4800,
    amt: 2181,
  },
  {
    name: "Sat",
    present: 2390,
    absent: 3800,
    amt: 2500,
  },
  {
    name: "Sun",
    present: 3490,
    absent: 4300,
    amt: 2100,
  },
];

const AttendanceCharts = () => {
  return (
    <div className="bg-white p-4 h-full w-full rounded-lg">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Charts */}
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
    </div>
  );
};

export default AttendanceCharts;
