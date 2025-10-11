import Slider from "@/components/slider";
import Chart from "@/components/ui/chart";
import CurrentlyReading from "@/components/currently-reading";

export default function DashPage() {
  return (
    <div className="relative flex h-full flex-col gap-y-4">
      <div className="relative grid gap-4 w-full grid-cols-[58%_40%]">
        <div className="rounded-2xl   ">
          <Chart />
        </div>
        <div className=" rounded-2xl">
          <Slider />
        </div>
      </div>
      <div className="h-[calc(100%-320px)] w-full overflow-hidden bg-[#F2F6FA] dark:bg-stone-800 rounded-2xl">
        <CurrentlyReading />
      </div>
    </div>
  );
}
