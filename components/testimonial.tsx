import Link from "next/link";
import CustomImage from "./custom-image";

export default function Testimonial() {
  return (
    <section className="box-border grid w-full items-center gap-x-4 gap-y-[50px] bg-black py-[25px] lg:grid-cols-2 lg:gap-y-0 xl:py-[100px]">
      <CustomImage
        image={{
          alt: "A large set of books",
          src: "/images/reading.jpg",
          className: "rounded-3xl bg-cover brightness-80 lg:w-[500px]",
          class: "flex items-center justify-center h-full xl:p-0 p-4",
          aspectRatio: "9/14",
        }}
      />
      <div className="flex w-full flex-col items-center gap-y-8 lg:items-start">
        <p className="w-[8ch] text-center text-4xl font-semibold tracking-tight md:text-6xl lg:w-[10ch] lg:text-start lg:text-7xl lg:leading-[60px]">
          Redefining the way you read
        </p>
        <span className="flex flex-col items-center lg:items-start">
          <p className="text-center text-base font-normal md:text-xl lg:w-[30ch] lg:text-start lg:text-2xl">
            All your books are now in one place.
          </p>
          <p className="text-center text-xs font-normal md:text-sm lg:w-[30ch] lg:text-start lg:text-base">
            Experience the future of reading with our innovative platform.
          </p>
          <p className="text-center text-xs font-normal md:text-sm lg:w-[30ch] lg:text-start lg:text-base">
            In one place
          </p>
        </span>
        <div className="flex items-center space-x-4">
          <Link
            href={`/dashboard`}
            className="rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 px-3 py-1 text-white lg:rounded-2xl lg:px-6 lg:py-3"
          >
            Get Started
          </Link>
          <Link
            href={`/books`}
            className="rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 px-3 py-1 text-white lg:rounded-2xl lg:px-6 lg:py-3"
          >
            Books
          </Link>
        </div>
      </div>
    </section>
  );
}
