import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { getAlbums, getFeatured } from "@/lib/media";

export default function Home() {
  const albums = getAlbums();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Gallery featured={getFeatured(albums)} />
        <Booking />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
