import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row">
      <div className="w-full lg:2/3">
        {/* User Cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="staff" />
        </div>
      </div>
      <div className="w-full lg:1/3">Right</div>
    </div>
  );
};

export default AdminPage;
