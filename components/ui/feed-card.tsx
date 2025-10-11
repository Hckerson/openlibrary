import Image from "next/image";
import { timeAgo } from "@/lib/date-formatter";
export default function FeedCard({ feed }: { feed: FeedData }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#e7eef5] p-2 dark:bg-stone-800">
      <div className="flex items-start space-x-2">
        <div className="h-10 w-10 shrink-0">
          <div className="h-full w-full">
            <Image
              src={feed.link}
              height={100}
              width={100}
              className="rounded-lg max-h-10 max-w-10"
              alt={`Profile picture of ${feed.name}`}
            ></Image>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex space-x-2">
            <p className="text-base font-medium">{feed.name}</p>
            <span className="text-xs pt-1">{`(${feed.role})`}</span>
          </div>
          <p className="text-xs">
            {`${feed.name} ${feed.action == "Commented" ? feed.action + " " + "on" : feed.action}  a book`}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-4 rtl:mr-0">
        <div className="flex items-center space-x-1 text-sm">
          {timeAgo(feed.time)}
        </div>
        <div></div>
      </div>
    </div>
  );
}
