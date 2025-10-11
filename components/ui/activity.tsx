import Link from "next/link";
import FeedCard from "./feed-card";
import ResizablePanel from "./resizable-panel";
import { feedDataSet, feedData } from "@/lib/placeholder_data";

export default function ActivityFeed() {
  return (
    <section className="box-border flex w-full flex-col">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Activity Feed</p>

        <span className="flex items-center space-x-2 text-[12px] font-medium">
          <p className=" ">view your full analytics</p>
          <Link href={``} className="text-blue-500">
            View Report
          </Link>
        </span>
      </div>
      <p className="text-sm font-bold">User</p>
      <ResizablePanel>
        <ul className="hstyled-scrollbar relative box-border h-[350px] w-full space-y-3 overflow-y-auto">
          {feedDataSet.map((feed, idx) => {
            return <li key={idx}>{<FeedCard feed={feed} />}</li>;
          })}
        </ul>
      </ResizablePanel>
      <div className="h-[calc(100%-600px)]">
        <p className="text-sm font-bold">Others</p>
        <ul className="hstyled-scrollbar relative box-border h-[calc(100%-600px)] w-full space-y-3 overflow-y-auto">
          {feedData.map((feed, idx) => {
            return <li key={idx}>{<FeedCard feed={feed} />}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
