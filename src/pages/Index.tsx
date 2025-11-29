import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Podcast from "@/components/Podcast";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <Hero />
            <About />
            <TechStack />
            <Podcast />
            <Contact />
            <Footer />
        </div>
    );
};

export default Index;
