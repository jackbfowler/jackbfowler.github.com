import React from 'react';
import './ProjectFilter.css';

interface ProjectFilterProps {
    tags: string[];
    selectedTag: string | null;
    onSelectTag: (tag: string | null) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ tags, selectedTag, onSelectTag }) => {
    return (
        <div className="project-filter">
            <button
                className={`filter-btn ${selectedTag === null ? 'active' : ''}`}
                onClick={() => onSelectTag(null)}
            >
                All
            </button>
            {tags.map(tag => (
                <button
                    key={tag}
                    className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => onSelectTag(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default ProjectFilter;
