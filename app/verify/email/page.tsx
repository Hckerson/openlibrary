"use client";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.post(
          `https://api.openlibrary.app/auth/verify/confirm`,
          { token },
        );
        const result = response?.data;
        if (result.success) {
          toast.success("Email verified successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const timeoutId = setTimeout(() => {
            router.push("/login");
          }, 3000);

          return () => clearInterval(timeoutId);
        } else {
        }
      } catch {}
    };
    verify();
  }, [token, router]);
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <ToastContainer />
      <p className="mr-[10px] text-xl font-bold text-black">Verifying...</p>
      <span>
        <ScaleLoader color="#000" />
      </span>
    </div>
  );
}
