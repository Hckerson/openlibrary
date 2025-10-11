"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import clsx from "clsx";
import { toast } from "sonner";
import { useState } from "react";
import { GridLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const VerifyPhoneNO = () => {
  const [otpValue, setOtpValue] = useState("");
  const email = "h****gmail.com"
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(60);
  const router = useRouter();

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      sendOTP();
    }

    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const sendOTP = async () => {
    try {
      setLoading(true);

      const response = await fetch("");
      const data = await response.json();

      if (data?.sent) {
        setLoading(false);
        toast("OTP Sent", {
          description: "OTP has been sent to your phone no",
        });
      } else {
        setLoading(false);
        toast("OTP Sent Failed", {
          description: "Try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const verifyOTP = async () => {
    try {
      if (!otpValue) {
        return toast("Pleae enter OTP", {});
      }

      setLoading(true);

      const response = await fetch(
        `/api/verify-phoneno/verify-otp?otp=${otpValue}`,
      );
      const data = await response.json();

      if (data?.verified) {
        setLoading(false);
        toast("OTP Verified");
        router.push("/");
      } else {
        setLoading(false);
        toast("OTP Verification Failed", {
          description: "Try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-black">
      <div className="flex w-full max-w-[400px] flex-col rounded-4xl bg-white px-6 py-12">
        <div className="flex flex-col space-y-4">
          <legend className="text-xl font-semibold">Verify Email</legend>
          <p className="text-xs lg:text-sm">
            Verify your email below to proceed
          </p>
        </div>
        <Card className="w-full space-y-4 text-center">
          <CardHeader className="flex items-center">
            <CardDescription className="max-w-[25ch] text-black">
              Enter the 6 digits sent to the email {email} address{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-center space-y-2">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {time > 0 ? (
              <div className="flex justify-center space-x-1">
                <p className="text-sm">Code expires in:</p>
                <span className="text-sm text-black">{time}</span>
              </div>
            ) : (
              <p className="text-sm">Code expired</p>
            )}
            <div className="flex justify-center space-x-1">
              <p className="text-sm">Didn&apos;t get code?</p>
              <span className="text-sm text-black">Resend code</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button
              className={clsx(
                "w-full rounded-xl  bg-[#2E3159] text-white hover:cursor-pointer hover:bg-[#333770]",
                loading ? "px-3 py-1" : "p-2 lg:p-3",
              )}
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading ? (
                <GridLoader
                  size={9}
                  color="#ffffff"
                  className="size-6 text-white"
                />
              ) : (
                <p className="w-full text-center">

                  Verify Email address
                </p>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyPhoneNO;
