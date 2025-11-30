import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import './ProjectCard.css';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Link to={`/projects/${project.slug}`} className="project-card">
            <div className="project-card-image" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
            <div className="project-card-overlay">
                <h3 className="project-card-title">{project.title}</h3>
                <div className="project-card-tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-card-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
