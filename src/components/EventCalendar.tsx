"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(()=>{
    if(value instanceof Date){
    router.push(`?date=${value.toLocaleDateString("en-US")}`);
    }
  },[value, router])

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
