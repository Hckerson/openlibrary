"use client";
import clsx from "clsx";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { PenTool } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

interface FormData {
  token?: string;
  newPassword: string;
}

interface InitialState {
  message?: string | null;
  errors?: {
    token?: string[];
    newPassword?: string[];
  };
}

export default function ConfirmPassword() {
  const [error, setError] = useState<InitialState>({});
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    token: "",
    newPassword: "",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const schema = z.object({
    token: z.string(),
    newPassword: z
      .string({ error: "Password is required" })
      .min(6, { error: "Password must be a mininmum of 6 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
        error:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      }),
  });

  const submit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        "https://api.openlibrary.app/auth/password/confirm-reset",
        { ...formData },
      );
      const data = response.data;
      if (data.success) {
        toast.info("Reset passwordd!", {
          description: "Password reset successful",
          icon: <PenTool />,
        });
        router.push('/login')
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError.response?.status)
      switch (axiosError.response?.status) {
        case 400:
          toast.error("Reset Failed!", {
            description: "Failed to reset password",
            icon: <PenTool />,
          });
          break
        default:
          toast.info("Internal server error!", {
            description: "Failed to reset password",
            icon: <PenTool />,
          });

      }
      console.log(error)
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        token: token,
      };
    });
  }, [pending, token]);

  return (
    <div className="box-border grid h-screen w-full lg:grid-cols-2">
      <div className="relative flex w-full flex-col items-center space-y-5 bg-slate-200 md:p-4 lg:p-8">
        <div className="flex h-full w-[300px] flex-col justify-center pt-[60px] lg:w-[350px] lg:pt-0 xl:w-[400px]">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col space-y-2">
              <span className="text-lg font-semibold lg:text-2xl dark:text-[#9A99BB]">
                Confirm Password
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
                    htmlFor="password"
                  >
                    New Password
                  </label>
                  <Input
                    type="password"
                    className="rounded-xl border border-[#9FA0BF] px-4 py-2 text-sm text-[#0E0F26] transition-colors outline-none placeholder:text-sm hover:bg-slate-300"
                    name="newPassword"
                    value={formData.newPassword}
                    placeholder="New password"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  {error.errors &&
                    error.errors.newPassword?.map((error, idx) => {
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
