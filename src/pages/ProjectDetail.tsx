import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    return (
        <div className="container section" style={{ paddingTop: '100px' }}>
            <Link to="/projects" style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '2rem',
                color: 'var(--stone-400)',
                fontSize: '0.9rem'
            }}>
                ← Back to Projects
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{project.title}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                        {project.tags.map(tag => (
                            <span key={tag} style={{
                                fontSize: '0.8rem',
                                padding: '0.25rem 0.75rem',
                                backgroundColor: 'var(--stone-800)',
                                color: 'var(--stone-300)',
                                borderRadius: '20px'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        backgroundImage: `url(${project.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}></div>
                </header>

                <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--stone-300)' }}>
                    {project.content}
                </div>
            </article>
        </div>
    );
};

export default ProjectDetail;
