"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthday: z.date({ message: "Date of Birth is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
  type,
  data,
  setOpen
}: {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Create a new attendance</h1>
      <span className="text-xs font-medium text-gray-400">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          error={errors.username}
          register={register}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          error={errors.email}
          register={register}
        />
        <InputField
          label="Password"
          name="password"
          defaultValue={data?.password}
          error={errors.password}
          register={register}
        />
      </div>
      <span className="text-xs font-medium text-gray-400">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Firstname"
          name="firstName"
          defaultValue={data?.firstName}
          error={errors.firstName}
          register={register}
        />
        <InputField
          label="Lastname"
          name="lastName"
          defaultValue={data?.lastName}
          error={errors.lastName}
          register={register}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          error={errors.phone}
          register={register}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          error={errors.address}
          register={register}
        />
        <InputField
          label="Bloodtype"
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors.bloodType}
          register={register}
        />
        <InputField
          label="Date of Birth"
          name="birthday"
          defaultValue={data?.birthday}
          error={errors.birthday}
          register={register}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <select
            {...register("gender")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none"
            defaultValue={data?.gender}
            
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors?.gender && (
            <p className="text-xs text-red-400">{errors?.gender.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors?.gender && (
            <p className="text-xs text-red-400">{errors?.gender.message}</p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;
