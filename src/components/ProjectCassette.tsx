import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProjectCassette.css';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectCassette = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Create a tripled buffer for infinite scrolling
    const extendedProjects = [...projects, ...projects, ...projects];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Auto-scroll logic
        const scrollInterval = setInterval(() => {
            if (!scrollContainer) return;

            const cardWidth = scrollContainer.querySelector('.project-cassette-slide')?.clientWidth || 0;
            const gap = 24; // 1.5rem gap (approx 24px)
            const scrollAmount = cardWidth + gap;
            
            // Current scroll position
            const currentScroll = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth / 3; // Approx width of one set

            // If we are in the last third, jump back to the first third instantly
            if (currentScroll >= maxScroll * 2) {
                scrollContainer.scrollTo({
                    left: currentScroll - maxScroll,
                    behavior: 'auto' // Instant jump
                });
                // Small delay to allow jump to render before scrolling again
                setTimeout(() => {
                    scrollContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }, 50);
            } else {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, 2000);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="project-cassette-section">
            <Link to="/projects" style={{ textDecoration: 'none' }}>
                <h2 className="project-cassette-title">Projects</h2>
            </Link>
            <div className="project-cassette-wrapper">
                <div className="project-cassette-scroll" ref={scrollRef}>
                    {extendedProjects.map((project, index) => (
                        <div key={`${project.id}-${index}`} className="project-cassette-slide">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
                <div className="project-cassette-edge project-cassette-edge-left"></div>
                <div className="project-cassette-edge project-cassette-edge-right"></div>
            </div>
        </div>
    );
};

export default ProjectCassette;
