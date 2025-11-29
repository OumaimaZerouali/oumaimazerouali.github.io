import { Code2, Mic, Coffee } from "lucide-react";

const About = () => {
    return (
        <section id="about" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        About <span className="text-primary">Me</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-card p-6 rounded-lg border border-border hover-glow text-center">
                            <Code2 className="mx-auto mb-4 text-primary" size={40} />
                            <h3 className="text-xl font-semibold mb-2">Developer</h3>
                            <p className="text-muted-foreground">Building robust applications with Angular, Java & Spring Boot</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border hover-glow text-center">
                            <Mic className="mx-auto mb-4 text-primary" size={40} />
                            <h3 className="text-xl font-semibold mb-2">Podcaster</h3>
                            <p className="text-muted-foreground">Co-hosting JCast, discussing tech trends & developer experiences</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg border border-border hover-glow text-center">
                            <Coffee className="mx-auto mb-4 text-primary" size={40} />
                            <h3 className="text-xl font-semibold mb-2">Problem Solver</h3>
                            <p className="text-muted-foreground">Crafting elegant solutions to complex challenges</p>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg border border-border">
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                            I'm a passionate full-stack developer with expertise in building scalable web applications.
                            My toolkit includes <span className="text-primary font-semibold">Angular or React</span> for dynamic frontends,
                            <span className="text-primary font-semibold"> Java and Spring Boot</span> for
                            robust backend systems.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Beyond coding, I'm the co-host of <span className="text-primary font-semibold">JCast</span>,
                            a podcast where we dive deep into the world of technology, share developer stories, and explore the
                            intersection of code and creativity. I believe in building not just great software, but also a great community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
