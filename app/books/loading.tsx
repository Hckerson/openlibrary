import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex flex-col space-y-3 items-center">
        <FadeLoader className="size-10" color="#ffffff" />
        <div className="text-2xl font-medium">Loading...</div>
      </div>
    </div>
  );
}
