const techStack = {
    frontend: ["Angular", "TypeScript", "React", "HTML", "CSS"],
    backend: ["Java", "Spring Boot", "Quarkus", "Spring Security", "Maven", "Openapi", "JUnit"],
    database: ["PostgreSQL", "MySQL"],
    tools: ["Git", "Docker", "Kubernetes", "Postman", "Openshift", "AWS", "Azure"]
};

const TechStack = () => {
    return (
        <section id="tech-stack" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Tech <span className="text-primary">Stack</span>
                </h2>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary mb-4 border-b border-primary/30 pb-2">
                            Frontend
                        </h3>
                        {techStack.frontend.map((tech, i) => (
                            <div
                                key={i}
                                className="bg-card p-3 rounded border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                            >
                                <span className="font-medium">{tech}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary mb-4 border-b border-primary/30 pb-2">
                            Backend
                        </h3>
                        {techStack.backend.map((tech, i) => (
                            <div
                                key={i}
                                className="bg-card p-3 rounded border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                            >
                                <span className="font-medium">{tech}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary mb-4 border-b border-primary/30 pb-2">
                            Database
                        </h3>
                        {techStack.database.map((tech, i) => (
                            <div
                                key={i}
                                className="bg-card p-3 rounded border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                            >
                                <span className="font-medium">{tech}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary mb-4 border-b border-primary/30 pb-2">
                            Tools
                        </h3>
                        {techStack.tools.map((tech, i) => (
                            <div
                                key={i}
                                className="bg-card p-3 rounded border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                            >
                                <span className="font-medium">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
