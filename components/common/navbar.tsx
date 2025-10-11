"use client";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import type React from "react";
import { toast } from "sonner";
import { useState } from "react";
import SearchBar from "../ui/searchBar";
import { useRouter } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  X,
  User,
  LogOut,
  Upload,
  Calendar,
  Book,
  PenTool,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const user = {
    avatar: "/",
    name: "John Doe",
    loggedIn: true,
    email: "john.doe@example.com",
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.status == 200) {
        toast.info("Logged out successfully", { icon: <PenTool /> });
        router.push("/login");
      }
    } catch (error) {
      console.log(`Error loggin out: ${error}`);
    }
    router.push("/login");
  };

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: RxDashboard,
      visible: "md",
    },
    { href: "/dashboard/upload", label: "Upload", icon: Upload, visible: "md" },
    { href: "/events", label: "Events", icon: Calendar, visible: "lg" },
    { href: "/books", label: "Books", icon: Book, visible: "xl" },
  ];

  return (
    <nav className="fixed top-3 z-50 w-full px-3">
      <div className="container mx-auto rounded-lg border bg-background/95 px-4 shadow-sm inset-shadow-2xs backdrop-blur md:rounded-full lg:w-[calc(100vw-100px)]">
        <div className="flex h-[70px] items-center justify-between sm:justify-center md:justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <SearchBar />
          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {navLinks.map((link) => {
              const step = link.visible;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "hidden items-center space-x-1 rounded-md px-3 py-2 font-normal transition-colors lg:text-[14px]",
                    step == "lg" ? "lg:flex" : "",
                    step == "xl" ? "xl:flex" : "",
                    step == "md" && user.loggedIn ? "md:flex" : "",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            {user.loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 -translate-x-4">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="inset-0 border-0 bg-black text-white ring-0 outline-0 dark:bg-white dark:text-black">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="hidden md:block"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="text-sm font-medium lg:text-base">
                        {user.name}
                      </p>
                      <p className="w-[150px] truncate text-xs lg:text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="cursor-pointer rounded-xl bg-black p-3 text-white shadow-md inset-shadow-sm dark:bg-white dark:text-black">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            {/* Mobile Search */}
            <SearchBar />

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="mt-4 border-t pt-4">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="h-8 w-8 hover:border-0">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="text-black hover:text-black">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center space-x-2 px-3 py-2 text-left text-sm text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
