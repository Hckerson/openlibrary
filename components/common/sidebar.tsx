"use client";
import clsx from "clsx";
import Link from "next/link";
import { Logo } from "./Logo";
import { format } from "date-fns";
import SwitchDemo from "../ui/switch";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import CustomImage from "../custom-image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  HardDriveUpload,
  UserStar,
  Brush,
  LogOut,
} from "lucide-react";
import { useTheme, } from "next-themes";
import { useEffect, useState } from "react";

const navlinks = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
  { name: "Upload", icon: HardDriveUpload, link: "/dashboard/upload" },
  { name: "Books", icon: UserStar, link: "/dashboard/books" },
  { name: "Profile", icon: Brush, link: "/dashboard/profile" },
];

export function Sidebar() {
  const [path, setPathname] = useState("/Dashboard");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const handleScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };
  const pathname = usePathname();
  useEffect(() => {

    setPathname(pathname);
  }, [pathname]);

  const handleLogout = async () => {};
  return (
    <div className="relative h-full w-full overflow-hidden bg-background py-6 pr-2 pl-4">
      <nav
        className="styled-scrollbar box-border flex h-full w-full flex-col justify-between overflow-y-auto scroll-smooth"
        onWheel={handleScroll}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex w-full flex-col space-y-5">
            <div className="box-border w-full">
              <Logo />
            </div>
            <div className="flex w-full flex-col items-center space-y-3 rounded-3xl bg-[#F2F6FA] p-3 dark:bg-black">
              <div className="flex w-full justify-between">
                <div className="h-12 w-12  shrink-0">
                  <CustomImage
                    image={{
                      src: "/images/woman.jpg",
                      alt: "profile photo",
                      aspectRatio: "1",
                      className: "rounded-xl",
                    }}
                  />
                </div>
                <div>
                  <SwitchDemo
                    theme={(resolvedTheme ?? theme) as string}
                    setTheme={setTheme}
                  />
                </div>
              </div>
              <div className="w-full">
                <strong className="text-sm font-medium text-stone-500">
                  {format(new Date(), "EEEE, MMMM yyyy")}
                </strong>
                <p className="text-2xl leading-[25px] font-medium text-black dark:text-white">
                  Welcome back Emma
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center rounded-3xl bg-[#F2F6FA] dark:bg-black">
            <ul className="flex w-full flex-col space-y-1 p-2">
              {navlinks.map((link, idx) => {
                const ICON = link.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={link.link}
                      className={clsx(
                        "flex space-y-1 space-x-2 rounded-2xl px-3 py-2 hover:bg-white dark:hover:bg-stone-800",
                        path == link.link ? "bg-white dark:bg-stone-800" : "",
                      )}
                    >
                      <div>
                        <ICON className="size-5 stroke-[1.5px]" />
                      </div>
                      <span className="text-base font-normal">
                        {" "}
                        {link.name}
                      </span>
                    </Link>
                  </li>
                );
              })}

              <Button
                className={clsx(
                  "flex w-full items-start space-y-1 space-x-2 rounded-2xl px-3 py-2 hover:bg-white dark:hover:bg-stone-800",
                )}
                onClick={handleLogout}
              >
                <div>
                  <LogOut className="size-5 stroke-[1.5px]" />
                </div>
                <span className="text-base font-normal"> Logout</span>
              </Button>
            </ul>
          </div>
        </div>
        <div className="flex w-full items-center rounded-3xl bg-[#F2F6FA] p-2 pl-0 text-white dark:bg-stone-800">
          <div className="flex h-[50px] w-[50px] items-center justify-center">
            <Sparkles />
          </div>
          <div className="flex flex-col space-y-1"></div>
        </div>
      </nav>
    </div>
  );
}
