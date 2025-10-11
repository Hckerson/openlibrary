"use client";
import clsx from "clsx";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { PenTool, ArrowLeft } from "lucide-react";
import { GridLoader } from "react-spinners";
import { signupSchema } from "@/lib/validator/signupSchema";
import { Input } from "@/components/ui/input";
import VerificationPopup from "@/components/ui/email-popup";

interface FormData {
  email?: string;
  password: string;
  rememberMe?: boolean;
  name?: string;
}
export default function Signup() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<InitialState>({
    message: null,
    errors: {},
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const submit = async () => {
    setPending(true);
    const validatedFields = signupSchema.safeParse(formData);
    if (!validatedFields.success) {
      setError({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "validation failed",
      });
      setPending(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        ...formData,
      });
      const data = response.data;
      if (data.success) {
        toast.success("Signup successful!", {
          description: "User signed up succesfully",
          icon: <PenTool />,
        });
        try {
          const response = await axios.post("/api/email/verify", {
            email: formData.email,
          });
          const result = response.data;
          if (result.success) setOpen(true);
        } catch (error) {
          console.error(`Error sending verification email: ${error}`);
        }
      }
      setFormData({
        email: "",
        password: "",
        name: "",
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      switch (axiosError.response?.status) {
        case 400:
          toast.error("Invalid credentials!", {
            description: "Email and password is required",
            icon: <PenTool />,
          });
          break;
        case 409:
          toast.error("Email already Exists!", {
            description: "User ith this email already exists",
            icon: <PenTool />,
          });
          break;
        default:
          toast.error("Internal server error!", {
            description: "Registration failed, try again later",
            icon: <PenTool />,
          });
      }
    } finally {
      setPending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="box-border grid h-screen w-full lg:grid-cols-2">
      <VerificationPopup
        isOpen={open}
        onClose={handleClose}
        header="Verification Email Sent!"
        subject="Please check your inbox and follow the link to verify your email."
      />
      <div className="relative flex w-full flex-col items-center space-y-5 bg-slate-200 md:p-4 lg:p-8">
        <div className="absolute lg:left-7">
          <Link
            href={`/`}
            className="flex space-x-2 rounded-2xl p-3 hover:bg-slate-100"
          >
            <ArrowLeft />
            <p>Back</p>
          </Link>
        </div>
        <div className="flex h-full w-[300px] flex-col justify-center pt-[60px] lg:w-[350px] lg:pt-0 xl:w-[400px]">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col space-y-2">
              <span className="text-2xl font-semibold lg:text-5xl dark:text-[#9A99BB]">
                Sign up
              </span>
              <p className="text-xs text-[#9A99BB]">
                {`Already have an account?`}{" "}
                <Link
                  className="text-xs text-[#2E3159] underline underline-offset-[2px] lg:text-sm lg:font-medium"
                  href={`/login`}
                >
                  login
                </Link>
              </p>
            </div>
            <form action="" className="">
              <div className="flex flex-col space-y-2">
                <span className="flex flex-col">
                  <label
                    className="text-[15px] lg:text-base lg:font-medium dark:text-[#0E0F26]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Input
                    type="text"
                    className="rounded-xl border border-[#9FA0BF] px-4 py-2 text-sm text-[#0E0F26] transition-colors outline-none placeholder:text-sm hover:bg-slate-300"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  {error.errors &&
                    error.errors.email?.map((error, idx) => {
                      return (
                        <span
                          key={idx}
                          className="box-border w-full text-xs font-medium text-[#2E3159]"
                        >
                          {error}
                        </span>
                      );
                    })}
                </span>
                <span className="flex flex-col">
                  <label
                    className="text-[15px] lg:text-base lg:font-medium dark:text-[#0E0F26]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Input
                    type="text"
                    className="rounded-xl border border-[#9FA0BF] px-4 py-2 text-sm text-[#0E0F26] transition-colors outline-none placeholder:text-sm hover:bg-slate-300"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  {error.errors &&
                    error.errors.password?.map((error, idx) => {
                      return (
                        <span
                          key={idx}
                          className="box-border w-full text-xs font-medium text-[#2E3159]"
                        >
                          {error}
                        </span>
                      );
                    })}
                </span>
                <span className="flex flex-col">
                  <label
                    className="text-[15px] lg:text-base lg:font-medium dark:text-[#0E0F26]"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    className="rounded-xl border border-[#9FA0BF] px-4 py-2 text-sm text-[#0E0F26] transition-colors outline-none placeholder:text-sm hover:bg-slate-300"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  {error.errors &&
                    error.errors.name?.map((error, idx) => {
                      return (
                        <span
                          key={idx}
                          className="box-border w-full text-xs font-medium text-[#2E3159]"
                        >
                          {error}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div className="flex flex-col space-y-4 pt-5">
                <button
                  type="button"
                  onClick={submit}
                  className={clsx(
                    "flex w-full items-center justify-center rounded-xl bg-[#2E3159] text-white hover:cursor-pointer hover:bg-[#333770]",
                    pending ? "px-3 py-1" : "p-2 lg:p-3",
                  )}
                >
                  {" "}
                  {pending ? <GridLoader size={9} color="#ffffff" /> : "Signup"}
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col space-y-2 pt-2">
            <div className="flex w-full items-center justify-center space-x-2">
              <div className="flex-1 border-b border-[#9FA0BF]"></div>
              <div className="text-xs lg:text-base dark:dark:text-[#0E0F26]">
                OR
              </div>
              <div className="flex-1 border-b border-[#9FA0BF]"></div>
            </div>
            <div className="grid gap-y-4">
              <div className="duraion-300 relative flex items-center justify-center rounded-3xl border border-[#9FA0BF] p-2 transition-colors hover:bg-slate-300">
                <span className="absolute top-[2px] left-3 h-[50px] w-[50px] lg:top-[4px]">
                  <Image
                    src={`/svgs/google.svg`}
                    alt="Google icon"
                    width={50}
                    height={50}
                    className="size-8"
                  ></Image>
                </span>
                <button className="text-sm lg:text-base dark:text-[#2E3159]">
                  <Link href={`https://api.openlibrary.app/auth/google`}>
                    Continue with Google
                  </Link>
                </button>
              </div>
              <div className="duraion-300 relative flex items-center justify-center rounded-3xl border border-[#9FA0BF] p-2 transition-colors hover:bg-slate-300">
                <span className="absolute top-[2px] left-3 h-[50px] w-[50px] lg:top-[4px]">
                  <Image
                    src={`/svgs/apple.png`}
                    alt="Github icon"
                    width={50}
                    height={50}
                    className="size-7"
                  ></Image>
                </span>
                <button className="text-sm lg:text-base dark:text-[#2E3159]">
                  <Link href={`https://api.openlibrary.app/auth/apple`}>
                    Continue with Appl
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full bg-[url(/images/l-image.avif)] bg-cover bg-[100%] bg-no-repeat lg:block">
        <div className="grid translate-y-[25%] gap-y-12 xl:translate-y-[35%]"></div>
      </div>
    </div>
  );
}
