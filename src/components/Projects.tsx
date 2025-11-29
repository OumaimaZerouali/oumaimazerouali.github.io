import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with Angular frontend and Spring Boot backend, featuring real-time inventory management and secure payment processing.",
        tech: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
        github: "#",
        demo: "#"
    },
    {
        title: "Task Management System",
        description: "Collaborative task management application with real-time updates, user authentication, and advanced filtering capabilities.",
        tech: ["Angular", "Java", "MySQL", "WebSocket"],
        github: "#",
        demo: "#"
    },
    {
        title: "API Gateway Service",
        description: "Microservices architecture with centralized API gateway, implementing authentication, rate limiting, and service discovery.",
        tech: ["Spring Boot", "Spring Cloud", "Redis", "Kubernetes"],
        github: "#",
        demo: "#"
    },
    {
        title: "Data Analytics Dashboard",
        description: "Interactive dashboard for visualizing complex datasets with real-time charts, customizable reports, and export functionality.",
        tech: ["Angular", "Spring Boot", "MongoDB", "Chart.js"],
        github: "#",
        demo: "#"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Featured <span className="text-primary">Projects</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border rounded-lg overflow-hidden hover-glow group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/30"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                                    >
                                        <Github size={16} className="mr-2" />
                                        Code
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                    >
                                        <ExternalLink size={16} className="mr-2" />
                                        Demo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
