"use client";
import { Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ActivityFeed from "@/components/ui/activity";
import { Sidebar } from "@/components/common/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <section className="relative box-border flex h-screen max-h-screen w-full">
      <aside className={`sticky top-0 h-full w-[280px] bg-white`}>
        <Sidebar />
      </aside>
      <div className="flex w-[calc(100vw-280px)] bg-[#F2F6FA] dark:bg-background">
        <div className="w-full p-6 pl-2 dark:bg-stone-800">
          <div className="h-full rounded-xl bg-background p-4 dark:pl-2">
            <div className="relative flex justify-between pb-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center justify-center rounded-2xl bg-[#F2F6FA] px-3 py-2 dark:bg-stone-800">
                  <Calendar />
                  <p className="text-black dark:text-white">This month</p>
                </div>
                <p className="rounded-xl bg-[#F2F6FA] px-3 py-2 text-2xl font-semibold dark:bg-stone-800">
                  {pathname == "/dashboard"
                    ? "Dashboard"
                    : pathname == "/dashboard/books"
                      ? "Uploaded Books"
                      : pathname == "/dashboard/upload"
                        ? "Upload"
                        : "Profile"}
                </p>
              </div>
              <Button className="rounded-2xl bg-[#F2F6FA] px-3 py-2 dark:bg-stone-800">
                Add new book
              </Button>
            </div>
            <div className="relative grid h-[calc(100vh-130px)] w-full grid-cols-1 space-x-4 lg:h-[calc(100vh-150px)] xl:grid-cols-[70%_auto]">
              {children}
              <div className="hstyled-scrollbar hidden h-full overflow-y-auto rounded-2xl bg-[#F2F6FA] px-3 py-2 xl:block dark:bg-[#161515]">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
