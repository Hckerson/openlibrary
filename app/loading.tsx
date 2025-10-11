import { FadeLoader } from "react-spinners";
export default function Loading() {
  return <div className="h-screen w-full bg-black text-white flex items-center justify-center">
    <div className="flex flex-col items-center">
      <FadeLoader className="size-10" color="#ffffff"/>
      <div className="font-medium text-2xl">Loading</div>
    </div>
  </div>;
}
