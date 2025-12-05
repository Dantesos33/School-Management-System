import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRole, getCurrentUserId } from "@/lib/utils";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";

const baseColumns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
];

type EventList = Event & { class: Class };

function renderRow(role: string | undefined) {
  return function EventRow(item: EventList) {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schooPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td>{item.class?.name || "-"}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false})}</td>
        <td className="hidden md:table-cell">{item.endTime.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false})}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal
                  table="event"
                  type="update"
                  data={item}
                  id={item.id}
                />
                <FormModal table="event" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

Object.assign(renderRow, { displayName: "EventRowRenderer" });

//Url Params Condition

const EventListPage = async ( {searchParams} : { searchParams: {[key: string]:string | undefined }}) => {
  const role = await getRole();
  const currentUserId = await getCurrentUserId();

  const { page , ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.EventWhereInput = {}

  if(queryParams){
    for(const [key, value] of Object.entries(queryParams)){
      if(value !== undefined){
        switch (key){
            case "search":
              query.title = {contains: value, mode: "insensitive"}
              break;
            default:
              break;
        }
      }
    }
  }

  // Role Conditions

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  } as const;

  query.OR = [
    { classId: null },
    { class: role ? roleConditions[role as keyof typeof roleConditions] || {} : {} },
  ]

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
    where: query,
    include: {
      class: true,
    },
    take: ITEMS_PER_PAGE,
    skip: ITEMS_PER_PAGE * (p - 1)
  }),
  prisma.event.count({
    where: query
  }),
  ]);

  return (
    <div className="bg-white p-4 m-4 mt-0 rounded-md flex-1">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Events
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 bg-schooYellow rounded-full flex items-center justify-center">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 bg-schooYellow rounded-full flex items-center justify-center">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>

      {/* List */}
      {(() => {
        const columns = [...baseColumns, ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : [])];
        const rowRenderer = renderRow(role);
        Object.assign(rowRenderer, { displayName: "EventRowRenderer" });
        return <Table columns={columns} renderRow={rowRenderer} data={data} />;
      })()}

      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventListPage;
