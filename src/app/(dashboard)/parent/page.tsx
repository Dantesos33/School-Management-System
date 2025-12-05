import Announcements from "@/components/Announcements";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import { getCurrentUserId } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

const ParentPage = async () => {
  const userId = await getCurrentUserId();
  const students = await prisma.student.findMany({
    where: {
      parentId: userId!,
    }
  });
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row bg-gray-100">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {students.map((student) => (
          <div className="h-full bg-white p-4 rounded-md" key={student.id}>
            <h1 className="text-xl font-semibold">Schedule ({student.name})</h1>
            <BigCalenderContainer type="classId" id={student.classId} />
          </div>
        ))}
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
