import Teams from "./teams";
import ReviewCard from "./ui/review-card";

export default function Review() {
  return (
    <div className="box-border w-full bg-gray-100 py-[100px]">
      <div className="mx-auto box-border xl:w-[1380px]">
        <div className="grid gap-y-8">
          <span
            style={{ maxWidth: "10ch" }}
            className="mx-auto bg-linear-to-b from-black to-white/30 bg-clip-text text-center  lg:text-9xl md:text-6xl text-4xl font-semibold text-transparent"
          >
            What our readers say
          </span>
          <div className="grid relative box-border gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3">
            {Array(8)
              .fill(null)
              .map((_, idx) => (
                <ReviewCard key={idx} />
              ))}
          </div>
        </div>
        <Teams />
      </div>
    </div>
  );
}
