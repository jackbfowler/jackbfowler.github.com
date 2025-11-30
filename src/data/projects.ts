import React from 'react';

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    slug: string;
    content: React.ReactNode;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Project Alpha',
        description: 'A revolutionary AI project.',
        tags: ['AI', 'Python', 'React'],
        imageUrl: 'https://via.placeholder.com/400', // Placeholder for now
        slug: 'project-alpha',
        content: React.createElement('div', null,
            React.createElement('h2', null, 'Project Alpha Details'),
            React.createElement('p', null, 'This is a detailed description of Project Alpha. It involves complex algorithms and a sleek UI.')
        ),
    },
    {
        id: '2',
        title: 'Beta App',
        description: 'A mobile application for productivity.',
        tags: ['Mobile', 'React Native', 'Productivity'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, 'Beta App Deep Dive'),
            React.createElement('p', null, 'Beta App helps you stay organized. Here is how we built it...')
        ),
    },
    {
        id: '3',
        title: 'Gamma Web',
        description: 'A responsive web platform.',
        tags: ['Web', 'TypeScript', 'Design'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'gamma-web',
        content: React.createElement('div', null,
            React.createElement('h2', null, 'Gamma Web Platform'),
            React.createElement('p', null, 'Exploring the architecture of Gamma Web...')
        ),
    },
];

export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    projects.forEach(project => {
        project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
};
