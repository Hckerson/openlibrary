"use client";
import { SyntheticEvent, useState, RefObject } from "react";
import "react-resizable/css/styles.css";
import { Resizable } from "react-resizable";
import { ResizeCallbackData } from "react-resizable";

export default function ResizablePanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [height, setHeight] = useState<number>(200);
  const onResize = (event: SyntheticEvent, { size }: ResizeCallbackData) => {
    setHeight(size.height);
  };

  const handle = (resizeHandle: string, ref: RefObject<HTMLDivElement>) => {
    return (
      <div
        ref={ref} // Forward the ref to this div (required by the library)
        className={`resize-handle z-20 group relative rounded-lg bg-stone-500 p-1 transition-colors duration-200 ease-in hover:bg-stone-600 resize-handle-${resizeHandle}`} // Optional: Custom class for styling
        style={{
          position: "absolute",
          bottom: -5,
          right: "45%",
          width: "40px",
          height: "10px",
          cursor: "s-resize", // North-south cursor for vertical resize
        }}
      />
    );
  };
  return (
    <Resizable
      height={height}
      width={500}
      handle={handle}
      onResize={onResize}
      resizeHandles={["s"]}
      className="relative"
      maxConstraints={[500, 350]}
    >
      <div style={{ height: `${height}px` }} className="relative overflow-hidden">
        {children}
      </div>
    </Resizable>
  );
}
