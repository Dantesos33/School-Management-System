import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalenderContainer from "@/components/EventCalenderContainer";
import FinanceCharts from "@/components/FinanceCharts";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = ({searchParams}:{searchParams:{[keys:string]:string | undefined}}) => {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row bg-gray-100">
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* User Cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>

        {/* Middle Charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            {/* Count Charts */}
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            {/* Attendance Charts */}
            <AttendanceChartContainer />
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="w-full h-[500px]">
          {/* Finance Charts */}
          <FinanceCharts/>
        </div>

      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalenderContainer searchParams={searchParams}/>
        <Announcements/>      
      </div>
    </div>
  );
};

export default AdminPage;
