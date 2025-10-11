import Link from "next/link";
import { Fingerprint } from "lucide-react";
export default function NotFound() {
  return (
    <div className="inset-0 flex h-screen w-full items-center justify-center bg-[url(/images/dima.jpg)] bg-center bg-no-repeat">
      <div className="flex text-white flex-col items-center justify-center space-y-[100px]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[200px] leading-[185px]">404</p>
          <span className="text-xl">It seems you got a bit lost</span>
        </div>
        <Link
          href={`/`}
          className="flex flex-col items-center justify-center space-y-[20px]"
        >
          <Fingerprint />
          <div className="text-sm text-stone-400">Go back to HomePage</div>
        </Link>
      </div>
    </div>
  );
}
