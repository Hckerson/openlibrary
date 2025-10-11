import { Quote } from "lucide-react";
import Image from "next/image";
export default function ReviewCard() {
  return (
    <div className="box-border grid gap-y-6 rounded-3xl bg-white px-5 py-4 shadow-2xl inset-shadow-2xs">
      <div className="flex flex-col space-y-4">
        <span className="rounded-full border bg-stone-100 p-2 w-fit">
          <Quote className="block h-6 w-6 rotate-180 fill-[#D9D9D9] text-gray-400" />
        </span>
        <p className="text-sm leading-6 text-gray-700">
       {`   The progress tracker is fantastic. It's motivating to see how much
          I've read and how far I've come.The app has a great mix of common and
          challenging books`}
        </p>
      </div>
      <div className="flex space-x-2 border-t border-gray-200 pt-2">
        <div className="size-10 rounded-full">
          <Image
            src={`/images/woman.jpg`}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full object-cover"
          ></Image>
        </div>
        <div className="grid ">
          <strong>Fatima khoury</strong>
          <p className="-translate-y-1 text-xs">diatory_curtains_98</p>
        </div>
      </div>
    </div>
  );
}
