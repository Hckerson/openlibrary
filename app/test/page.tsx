"use client";
import { SyntheticEvent, useState, RefObject } from "react";
import "react-resizable/css/styles.css";
import FeedCard from "@/components/ui/feed-card";
import { feedDataSet } from "@/lib/placeholder_data";
import { Resizable } from "react-resizable";
import { ResizeCallbackData } from "react-resizable";

export default function ResizablePanel() {
  const [height, setHeight] = useState<number>(200);
  const onResize = (event: SyntheticEvent, { size }: ResizeCallbackData) => {
    setHeight(size.height);
  };

  const handle = (resizeHandle: string, ref: RefObject<HTMLDivElement>) => {
    return (
      <div
        ref={ref} // Forward the ref to this div (required by the library)
        className={`resize-handle group relative rounded-lg bg-[#ccc] p-1 transition-colors duration-200 ease-in hover:bg-stone-600 resize-handle-${resizeHandle}`} // Optional: Custom class for styling
        style={{
          position: "absolute",
          bottom: -5,
          right: "50%",
          width: "40px",
          height: "10px",
          cursor: "s-resize", // North-south cursor for vertical resize
        }}
      >
        <div className="inset-o group-hover:bg-stone-800"></div>
      </div>
    );
  };
  return (
    <Resizable
      height={height}
      width={500}
      handle={handle}
      onResize={onResize}
      resizeHandles={["s"]}
      maxConstraints={[500, 350]}
    >
      <div style={{ height: `${height}px`, background: "#f0f0f0" }}>
        <ul className="relative box-border w-full">
          {feedDataSet.map((feed, idx) => {
            return <li key={idx}>{<FeedCard feed={feed} />}</li>;
          })}
        </ul>
      </div>
    </Resizable>
  );
}
