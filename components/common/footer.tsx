"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { quickLinks, support } from "@/lib/placeholder_data";


export function Footer() {
  return (
    <footer className="border-t p-8">
      <div className="mx-auto grid max-w-[1380px] gap-6">
        <div className="box-border flex w-full flex-col items-end space-y-2 space-x-4 xl:flex-row">
          <div className="w-[2/6] text-xl font-semibold lg:text-2xl">
            Keep up to date with Ferroque information
          </div>
          <div className="w-[3/6] flex-col space-y-2">
            <div className="flex w-full flex-col space-y-3 space-x-2 md:flex-row">
              <Input
                type="firstName"
                id="firstName"
                name="firstName"
                autoComplete="off"
                placeholder="FirstName"
                className="w-full rounded-2xl border py-3 pr-4 pl-10 text-stone-700 outline-none placeholder:text-sm placeholder:text-stone-500 hover:bg-slate-50"
              />
              <Input
                type="lastName"
                id="lastName"
                name="lastName"
                autoComplete="off"
                placeholder="LastName"
                className="w-full rounded-2xl border py-3 pr-4 pl-10 text-stone-700 outline-none placeholder:text-sm placeholder:text-stone-500 hover:bg-slate-50"
              />
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Email Address"
                className="w-full rounded-2xl border py-3 pr-4 pl-10 text-stone-700 outline-none placeholder:text-sm placeholder:text-stone-500 hover:bg-slate-50"
              />
            </div>
            <p className="translate-x-1 text-sm font-semibold">
              Subscribe me to the Ferroque system newsletter for articles,
              events and offers. I can unsuscribe at any time
            </p>
          </div>
          <div className="flex h-full w-[1/6] justify-center">
            <Link
              href={`/signup`}
              className="text-no-wrap flex h-fit space-x-1 rounded-2xl px-5 py-3 ring"
            >
              <span> Sign </span> <span>up</span>
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Logo and Description */}
            <div className="space-y-4 rounded-xl border p-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <span className="text-primary-foreground text-lg font-bold">
                    E
                  </span>
                </div>
                <span className="text-primary text-xl font-bold">
                  Openlibrary
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering Nigerian students and lecturers with comprehensive
                PDF library resources.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 rounded-xl border p-4 xl:border-0 xl:p-0">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link, idx) => {
                  return (
                    <li
                      key={idx}
                      className="w-full rounded-xl border px-5 py-2"
                    >
                      <Link
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4 rounded-xl border p-4 xl:border-0 xl:p-0">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm">
                {support.map((link, idx) => {
                  return (
                    <li
                      key={idx}
                      className="w-full rounded-xl border px-5 py-2"
                    >
                      <Link
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Openlibrary Library. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
