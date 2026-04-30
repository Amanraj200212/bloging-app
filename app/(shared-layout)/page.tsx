// this  is the shared page. it only write in middle bracket and it doesnot create any routes
import Featured from "@/components/web/homePage/Featured";
import Footer from "@/components/web/Footer";
import Hero from "@/components/web/homePage/Hero";
import Latest from "@/components/web/homePage/Lates";
import Newsletter from "@/components/web/homePage/Newsletter";
import Topics from "@/components/web/homePage/Topics";

export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Featured />

      {/* Topic Section */}
      <Topics />

      {/* Latest Section */}
      <Latest />

      {/* subscribe newletter */}
      <Newsletter />

      {/* Footer conntact things */}
      <Footer />
    </div>
  );
}
