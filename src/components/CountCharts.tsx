"use client";

import Image from "next/image";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 60,
    fill: "#C3EBFA",
  },
];

const CountCharts = () => {
  return (
    <div className="bg-white p-4 h-full w-full rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Charts */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
            <RadialBar
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="" height={50} width={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-schooSky rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-sm text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-schooYellow rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-sm text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountCharts;
