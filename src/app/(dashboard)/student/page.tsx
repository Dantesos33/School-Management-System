import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const StudentPage = async () => {

  const {userId} = await auth();
  const classItem = await prisma.class.findMany({
    where: {
      students: {some: {id:userId!}}
    }
  })

  return (
    <div className="p-4 flex flex-col gap-4 xl:flex-row bg-gray-100">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalenderContainer type="classId" id={classItem[0]?.id} />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
