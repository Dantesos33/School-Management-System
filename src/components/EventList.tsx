import { prisma } from '@/lib/prisma';
import React from 'react'

const EventList = async ({dateParam}:{dateParam: string | undefined}) => {

    const date = dateParam ? new Date(dateParam) : new Date();

    const data = await prisma.event.findMany({
        where: {
            startTime: {
                gte: new Date(date.setHours(0,0,0,0)),
                lte: new Date(date.setHours(23,23,23,23)),
            }
        }
    })

  return data.map((i) => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-schooSky even:border-t-schooYellow" key={i.id}>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-gray-600">{i.title}</h1>
              <span className="text-xs text-gray-400">{i.startTime.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false})}</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{i.startTime + "-" + i.endTime}</p>
          </div>
        ))
}

export default EventList