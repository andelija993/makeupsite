import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { getMedia } from "@/lib/media";

export default function Home() {
  const media = getMedia();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Gallery items={media} />
        <Booking />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
