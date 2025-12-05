"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject, getTeacherOptions } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data: initialData,
  setOpen
}: {
  type: "create" | "update";
  data?: any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [teacherOptions, setTeacherOptions] = useState<{ id: string; name: string }[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema as any),
    defaultValues: {
      name: initialData?.name || "",
      id: initialData?.id,
      teachers: initialData?.teachers?.map((t: any) => t.id) || [],
    },
  });

  const [state, formAction] = useFormState(type === "create" ? createSubject : updateSubject, {
    success: false,
    error: false
  });

  const onSubmit = handleSubmit((data) => {
    const payload = type === "update" ? { ...data, id: initialData?.id } : data;
    formAction(payload as any);
  });

  const router = useRouter();

  useEffect(()=>{
    if(state.success){
      toast.success(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      if (typeof setOpen === "function") setOpen(false);
      router.refresh();
    }
  },[state, router, type, setOpen])

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getTeacherOptions();
        if (active) setTeacherOptions(data || []);
      } catch (_) {}
    })();
    return () => { active = false; };
  }, []);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update the subject"}</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject name"
          name="name"
          defaultValue={initialData?.name}
          error={errors.name}
          register={register}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-xs text-gray-500">Assign teachers</label>
          <select
            multiple
            {...register("teachers")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none min-h-24"
            defaultValue={initialData?.teachers?.map((t: any) => t.id) || []}
          >
            {teacherOptions.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>
      {state.error && <span className="text-red-500">Something went wrong!</span>}
      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
