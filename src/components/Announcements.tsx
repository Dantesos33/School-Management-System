import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const Announcements = async () => {

  const {userId, sessionClaims} = await auth();
  const role = (sessionClaims?.metadata as {role?:string})?.role;

  const roleConditions = {
    teacher: {lessons:{some:{teacherId: userId!}}},
    student: {students:{some:{id: userId!}}},
    parent: {students:{some:{parentId: userId!}}},
  }

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: {date: "desc"},
    where: {
      ...(role !== "admin" && {
        OR: [
        {classId: null},
        {class: roleConditions[role as keyof typeof roleConditions] || {} },
      ],
      }),
    }
  })

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Announcements</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {data?.map((i) => (
          <div
            className="p-5 rounded-md odd:bg-schooSkyLight even:bg-schooYellowLight"
            key={i.id}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-gray-600">{i.title}</h1>
              <span className="text-xs text-gray-400 rounded-full bg-white px-2 py-1">{new Intl.DateTimeFormat("en-US").format(i.date)}</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{i.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
