import Link from "next/link";
import { Fingerprint } from "lucide-react";
export default function StudyGroups() {
  return (
    <div className="inset-0 flex h-screen w-full items-center justify-center bg-[url(/images/dima.jpg)] bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center space-y-[100px]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[200px] leading-[185px] max-w-[10ch]">COMING SOON</p>

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
