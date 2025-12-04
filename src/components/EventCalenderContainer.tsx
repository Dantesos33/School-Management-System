import Image from 'next/image'
import React from 'react'
import EventList from './EventList'
import EventCalendar from './EventCalendar'

const EventCalenderContainer = async ({searchParams}:{searchParams:{[keys:string]:string | undefined}}) => {

    const {date} = searchParams;
  return (
    <div className="bg-white rounded-md p-4">
      <EventCalendar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
        </div>
    </div>
  )
}

export default EventCalenderContainer