import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";

const UserCard = async ({ type }: { type: "admin" | "teacher" | "student" | "parent" }) => {

  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    parent: prisma.parent,
    student: prisma.student,
  }

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-schooPurple even:bg-schooYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white rounded-full text-green-600 px-2 py-1">2025/26</span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="text-sm font-medium text-gray-500 capitalize">{type}s</h2>
    </div>
  );
};

export default UserCard;
