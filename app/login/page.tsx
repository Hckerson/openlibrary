"use client";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";
import { GridLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { PenTool, ArrowLeft } from "lucide-react";
import { loginSchema } from "@/lib/validator/loginSchema";

interface FormData {
  email?: string;
  password: string;
  username?: string;
}

export default function Login() {
  const [error, setError] = useState<InitialState>({});
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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
    const validatedFields = loginSchema.safeParse(formData);
    if (!validatedFields.success) {
      setError({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "validation failed",
      });
      setPending(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", { ...formData });
      const data = response.data;
      if (data.success) {
        toast.success("Login successful!", {
          description: "User logged in successfully",
          icon: <PenTool />,
        });

        setFormData({
          email: "",
          password: "",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      switch (axiosError.response?.status) {
        case 401:
          toast.error("Invalid credentials!", {
            description: "Email and password don't match",
            icon: <PenTool />,
          });
          break;

        default:
          toast.error("Internal server error!", {
            description: "Login failed, try again later",
            icon: <PenTool />,
          });
          break;
      }
    } finally {
      setPending(false); // Always stop loading state
    }
  };

  return (
    <div className="box-border grid h-screen w-full lg:grid-cols-2">
      <div className="relative flex w-full flex-col items-center space-y-5 bg-slate-200 md:p-4 lg:p-8">
        <div className="absolute lg:left-7">
          <Link href={`/`} className="flex space-x-2 p-3 hover:bg-slate-100 rounded-2xl  ">
            <ArrowLeft />
            <p>Back</p>
          </Link>
        </div>
        <div className="flex h-full w-[300px] flex-col justify-center pt-[60px] lg:w-[350px] lg:pt-0 xl:w-[400px]">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col space-y-2">
              <span className="text-2xl font-semibold lg:text-5xl dark:text-[#9A99BB]">
                Login
              </span>
              <p className="text-xs text-[#9A99BB]">
                {`Don't have an account?`}{" "}
                <Link
                  className="text-xs text-[#2E3159] underline underline-offset-[2px] lg:text-sm lg:font-medium"
                  href={`/signup`}
                >
                  Signup
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
              </div>
              <div className="mt-2 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="rememberMe"
                    className="flex items-center space-x-1"
                  >
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="checked"
                      onChange={handleChange}
                    />
                    <p className="text-xs lg:text-sm dark:text-stone-700">
                      Remember me
                    </p>
                  </label>
                  <Link
                    href={`/password/forget`}
                    className="text-xs hover:underline lg:text-sm dark:text-stone-700"
                  >
                    Forget password?
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={submit}
                  className={clsx(
                    "w-full rounded-xl bg-[#2E3159] text-white hover:cursor-pointer hover:bg-[#333770]",
                    pending ? "px-3 py-1" : "p-2 lg:p-3",
                  )}
                >
                  {" "}
                  {pending ? <GridLoader size={9} color="#ffffff" /> : "Login"}
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
                    Continue with Apple
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
