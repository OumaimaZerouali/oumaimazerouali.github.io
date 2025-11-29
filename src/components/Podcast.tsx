import {Play, Headphones, Link} from "lucide-react";
import { Button } from "./ui/button";

const episodes = [
    {
        title: "Java, Soft Skills & Mensenkennis",
        date: "Episode 6 • September 2025",
        description: "In deze aflevering starten we vanuit Java als onze vertrouwde basis, maar ontdekken we dat soft skills minstens zo bepalend zijn voor succes.\n" +
            "We hebben het over de eerste keer dat Java je écht pakt, de sprong van solo-code naar teamwork, en de momenten waarop communicatie belangrijker wordt dan techniek.",
        duration: "49 min",
        link: "https://jcast.dev/episodes/s01e06-softskills-with-bjorn/"
    },
    {
        title: "(Audio)Books vs Podcasts",
        date: "Episode 5 • August 2025",
        description: "📚🎧 Boeken of podcasts? Lezen of luisteren?\n" +
            "In deze aflevering duiken Oumaima, Viktor en Maarten in hun eigen luister- en leesgewoontes. Riskeer je liever een paper cut met een papieren boek, of dompel je je liever onder in een warme stem via een podcast?",
        duration: "26 min",
        link: "https://jcast.dev/episodes/s01e05-podcast-vs-audiobooks/"
    },
    {
        title: "Pixel Perfect? Een blik op UX/UI met Risa Somers",
        date: "Episode 4 • July 2025",
        description: "Vandaag duiken we in de wereld van design: van scherpe hoeken tot smooth animaties, en van wireframes tot real-life frustraties tussen developers en designers.",
        duration: "32 min",
        link: "https://jcast.dev/episodes/s01e04-pixel-perfect-with-risa/"
    }
];

const Podcast = () => {
    return (
        <section id="podcast" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <h2 className="text-4xl md:text-5xl font-bold">
                                <span className="text-primary">JCast</span>
                            </h2>
                        </div>
                        <p className="text-xl text-muted-foreground">
                            The podcast about development, soft skills and nerd life.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {episodes.map((episode, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-lg p-6 hover-glow group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-colors">
                                            <Play className="text-primary" size={24} />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                                    {episode.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {episode.date}
                                                </p>
                                            </div>
                                            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
                        {episode.duration}
                      </span>
                                        </div>
                                        <p className="text-muted-foreground mb-4">
                                            {episode.description}
                                        </p>
                                        <a
                                            href={episode.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button
                                                size="sm"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                            >
                                                <Play size={16} className="mr-2" />
                                                Listen Now
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href="https://jcast.dev/episodes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-primary/30 hover:bg-primary/10 hover:border-primary font-semibold"
                            >
                                View All Episodes
                            </Button>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Podcast;
