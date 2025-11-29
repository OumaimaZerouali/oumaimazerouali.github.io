import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center animate-fade-in">
                    <div className="inline-block mb-6">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
              Full-Stack Developer
            </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Hi, I'm <span className="text-primary glow-text">Oumaima</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                        Full-stack developer & co-host of <span className="text-primary font-semibold">JCast</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 hover-glow"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View My Work
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-primary/30 hover:bg-primary/10 hover:border-primary font-semibold px-8"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get In Touch
                        </Button>
                    </div>

                    <div className="mt-16 animate-bounce">
                        <ArrowDown className="mx-auto text-primary" size={32} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
