import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Let's <span className="text-primary">Connect</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        Whether you want to discuss a project, talk tech, or just say hi?. I'd love to hear from you!
                    </p>

                    <div className="bg-card border border-border rounded-lg p-8 mb-12">
                        <div className="grid md:grid-cols-2 gap-6">
                            <a
                                href="mailto:oumaima.zakelijk@gmail.com"
                                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/20">
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">Email</div>
                                    <div className="text-sm text-muted-foreground">oumaima.zakelijk@gmail.com</div>
                                </div>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/oumaima-zerouali-16b189223/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/20">
                                    <Linkedin className="text-primary" size={24} />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">LinkedIn</div>
                                    <div className="text-sm text-muted-foreground">Connect with me</div>
                                </div>
                            </a>

                            <a
                                href="https://github.com/OumaimaZerouali"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/20">
                                    <Github className="text-primary" size={24} />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">GitHub</div>
                                    <div className="text-sm text-muted-foreground">Check out my code</div>
                                </div>
                            </a>

                            <a
                                href="https://twitter.com/oumaima"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/20">
                                    <Twitter className="text-primary" size={24} />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">Twitter</div>
                                    <div className="text-sm text-muted-foreground">Follow the journey</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 hover-glow"
                        onClick={() => window.location.href = 'mailto:oumaima.zakelijk@gmail.com'}
                    >
                        <Mail size={20} className="mr-2" />
                        Send me a message
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
