"use client";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { PenTool } from "lucide-react";
import { GridLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

interface FormData {
  email?: string;
}

export default function ForgetPassword() {
  const [error, setError] = useState<InitialState>({});
  const [pending, setPending] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const schema = z.object({ email: z.string().email() });
  const submit = async () => {
    setPending(true);
    const validatedFields = schema.safeParse(formData);
    if (!validatedFields.success) {
      setError({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "validation failed",
      });
      setPending(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.openlibrary.app/auth/password/request-reset",
        formData,
      );
      const data = response.data;
      if (data.success) {
        toast.info("Reset password!", {
          description: "Check your email for code",
          icon: <PenTool />,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      switch (axiosError.response?.status) {
        case 400:
          toast.error("Invalid credentials!", {
            description: "Email is required",
            icon: <PenTool />,
          });
        default:
          toast.info("Internal server error!", {
            description: "Failed to reset password",
            icon: <PenTool />,
          });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="box-border grid h-screen w-full lg:grid-cols-2">
      <div className="relative flex w-full flex-col items-center space-y-5 bg-slate-200 md:p-4 lg:p-8">
        <div className="flex h-full w-[300px] flex-col justify-center pt-[60px] lg:w-[350px] lg:pt-0 xl:w-[400px]">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col space-y-2">
              <span className="text-lg font-semibold lg:text-2xl dark:text-[#9A99BB]">
                Forget Password
              </span>
              <p className="ma text-xs text-[#656480]">
                if you have forgotten your password, please enter your email to
                reset it
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
                    onKeyDown={(e) => {
                      if (e.key == "Enter") e.preventDefault();
                    }}
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
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={submit}
                  className={clsx(
                    "w-full rounded-xl bg-[#2E3159] text-white hover:cursor-pointer hover:bg-[#333770]",
                    pending ? "px-3 py-1" : "p-2 lg:p-3",
                  )}
                >
                  {" "}
                  {pending ? <GridLoader size={9} color="#ffffff" /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full bg-[url(/images/l-image.avif)] bg-cover bg-[100%] bg-no-repeat lg:block">
        <div className="grid translate-y-[25%] gap-y-12 xl:translate-y-[35%]"></div>
      </div>
    </div>
  );
}
