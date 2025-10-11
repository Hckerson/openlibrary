import CanDo from "@/components/canDo";
import Review from "@/components/review";
import HeroSection from "@/components/heroSection";
import { Navbar } from "@/components/common/navbar";
import Testimonial from "@/components/testimonial";
import { Footer } from "@/components/common/footer";

export default function HomePage() {
  return (
    <div className="box-border flex w-full flex-col ">
      <Navbar/>
      <HeroSection/>
      <Testimonial/>
      <CanDo/>
      <Review/>
      <Footer/>
    </div>
  );
}