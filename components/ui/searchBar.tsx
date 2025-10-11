"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const handleSearch = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  useEffect(() => {
    // keep sync when navigating with back/forward
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div
      className={clsx(
        "relative hidden flex-col",
        pathname !== "/" ? "lg:flex" : "",
      )}
    >
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

      <Input
        type="search"
        id="search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search PDFs, subjects, or tags..."
        className="search w-[150px] rounded-2xl border py-2 pr-4 pl-10 outline-none placeholder:text-xs lg:w-[300px]"
      />

      {searchValue && (
        <X
          onClick={() => {
            setSearchValue("");
            handleSearch(""); // clear URL param too
          }}
          className="absolute top-1/2 right-3 size-5 -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
}
