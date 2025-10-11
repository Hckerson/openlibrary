"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Button } from "./button";
import { Separator } from "./separator";
import { chartData } from "@/lib/placeholder_data";
import { MoveUp, MoveDown, Search } from "lucide-react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  ResponsiveContainer,
} from "recharts";

interface CustomTooltipPayload {
  name: string;
  value: number;
  dataKey: keyof ChartData;
  color?: string;
}

export default function Chart() {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: CustomTooltipPayload[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {payload.map((entry, idx) => (
            <div
              key={idx}
              className={clsx(
                "flex items-center justify-center space-x-1 rounded px-2 py-1 text-xs",
                idx == 0 ? "bg-white text-black shadow" : "bg-black text-white",
              )}
            >
              <span
                style={{ backgroundColor: entry.color }}
                className="h-2 w-2 rounded-full"
              ></span>
              <p>{entry.value}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="grid xl:h-[340px] h-[320px] xl:grid-rows-[85%_15%] grid-rows-[75%_15%] rounded-2xl bg-[#F2F6FA] dark:bg-stone-800 p-4">
      <div className="relative box-border h-full w-full">
        <div className="absolute flex w-full justify-between">
          <p className="text-2xl font-semibold">Statistics</p>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-fit rounded-lg border">
                <Button className="relative h-8 w-fit">Weekly</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount>
                <DropdownMenuItem>Monthly</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Yearly</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Yearly</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="rounded-full border p-2">
              <Search className="size-4" />
            </div>
          </div>
        </div>
        <ResponsiveContainer width={`100%`} height={`100%`}>
          <LineChart
            data={chartData}
            className="relative inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="gridPattern" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f3f4f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#f3f4f6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <Line
              dataKey="averageReadingTime"
              type={`monotone`}
              stroke="#3B82F6"
              strokeWidth={1}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#3B82F6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              name="averageReadingTime"
            />
            <Line
              dataKey="downloads"
              type={`monotone`}
              stroke="#F59E0B"
              strokeWidth={1}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#F59E0B",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              name="downloads"
            />

            <Line
              dataKey="searchQueries"
              type={`monotone`}
              stroke="#22C55E"
              strokeWidth={1}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#22C55E",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              name="searchQueries"
            />

            <Tooltip content={<CustomTooltip />} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              className="p-2 text-xs"
            />
            <YAxis hide />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <Separator className="" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col p-3">
            <div className="flex items-center space-x-1">
              <span
                style={{ backgroundColor: "#3B82F6" }}
                className="h-2 w-2 rounded-full"
              ></span>
              <span className="text-xs">Average reading time</span>
            </div>
            <div className="flex space-x-2">
              <p className="text-2xl font-semibold">4000 m</p>
              <div className="flex space-x-1">
                <span></span>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3">
            <div className="flex items-center space-x-1">
              <span
                style={{ backgroundColor: "#F59E0B" }}
                className="h-2 w-2 rounded-full"
              ></span>
              <span className="text-xs">Downloads</span>
            </div>

            <div className="flex items-end space-x-2">
              <p className="text-2xl font-semibold">260</p>
              <div className="mb-2 flex h-fit items-end text-green-600">
                <MoveUp className="size-[11px]" />
                <p className="text-[10px] leading-[9px]">13%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3">
            <div className="flex items-center space-x-1">
              <span
                style={{ backgroundColor: "#22C55E" }}
                className="h-2 w-2 rounded-full"
              ></span>
              <span className="text-xs">Search queries</span>
            </div>

            <div className="flex items-end space-x-2">
              <p className="text-2xl font-semibold">452</p>
              <div className="mb-2 flex h-fit items-end text-red-600">
                <MoveDown className="size-[11px]" />
                <p className="text-[10px] leading-[9px]">7%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
