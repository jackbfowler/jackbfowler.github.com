import React, { useState, useMemo } from 'react';
import { projects, getAllTags } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectFilter from '../components/ProjectFilter';

const Projects: React.FC = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const tags = useMemo(() => getAllTags(), []);

    const filteredProjects = useMemo(() => {
        if (!selectedTag) return projects;
        return projects.filter(project => project.tags.includes(selectedTag));
    }, [selectedTag]);

    return (
        <div className="container section" style={{ paddingTop: '100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Projects</h2>
                <p style={{ color: 'var(--stone-400)', maxWidth: '600px', margin: '0 auto' }}>
                    A collection of my work, experiments, and open source contributions.
                </p>
            </div>

            <ProjectFilter
                tags={tags}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--stone-500)' }}>
                    No projects found with tag "{selectedTag}".
                </div>
            )}
        </div>
    );
};

export default Projects;
