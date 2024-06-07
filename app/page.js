import Hero from "./components/Hero";
import Features from "./components/Features";
import Plans from "./components/Plans";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <Plans />
            <About />
            <Contact />
        </main>
    );
}
