import React from 'react';
import SusAnaly from '../assets/Projects/SusAnalysis/SusAnaly.jpg';
import SusAnaly1 from '../assets/Projects/SusAnalysis/1.jpg';
import SusAnaly2 from '../assets/Projects/SusAnalysis/2.jpg';
import SusAnaly4 from '../assets/Projects/SusAnalysis/4.mov';
import SusAnaly3 from '../assets/Projects/SusAnalysis/3.jpg';
import SusAnaly5 from '../assets/Projects/SusAnalysis/5.jpg';

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
        title: 'Suspension Analysis',
        description: 'A geometry analysis tool for kinematic design.',
        tags: ['Baja SAE', 'MATLAB', 'Solidworks'],
        imageUrl: SusAnaly,
        slug: 'suspension-steering-analysis',
        content: React.createElement('div', null,
            React.createElement('h2', null, 'Overview'),
            React.createElement('p', null,
                'A suspension and steering geometry analysis tool built for our Baja SAE car. Inspired by usage of software like Lotus Shark and Adams Car, but made to fill a gap in our use case. ' +
                'It has allowed much more thorough and intuitive analysis of geometry changes to key target metrics.'
            ),
            React.createElement('br'),
            React.createElement('h3', null, 'How It Works'),
            React.createElement('br'),
            React.createElement('p', null,
                'A kinematic model of our car is built in Solidworks, driven by an inverse model from ride height, wheel base, and other top level variables. ' +
                'This allows for analysis, but it is slow and clunky, requiring you to jump through Solidworks hoops.'
            ),
            React.createElement('img', {
                src: SusAnaly1,
                alt: 'Solidworks Model',
                style: { width: '75%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('br'),
            React.createElement('p', null,
                'A Solidworks Macro was created to export selected hardpoint coordinates as a .csv in just a few clicks.'
            ),
            React.createElement('img', {
                src: SusAnaly2,
                alt: 'Solidworks Macro',
                style: { width: '50%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('br'),
            React.createElement('p', null,
                'I then developed a MATLAB script that parses the exported geometry and solves the forward kinematics from shock and steering travel. ' +
                'It uses closed-form vector algebra to explicitly solve the motion using trig and circle sphere intersections, which is great with MATLAB matrix operations. '
            ),
            React.createElement('img', {
                src: SusAnaly3,
                alt: 'MATLAB Solver',
                style: { width: '50%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('br'),
            React.createElement('p', null,
                'I included an interactive visualizer, allowing you to easily visualize and correlate motion to kinematic graphs. ' +
                'Below is an example of 2021 kinematic data fed into the tool.'
            ),
            React.createElement('video', {
                src: SusAnaly4,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                style: { width: '100%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('p', null,
                'Kinematic metrics are plotted through bump, droop, and steer as 3D surfaces (which is more cool than useful). A 2D visualizer that changes with the interactive figure is easier to analyze (above). ' +
                'This provides a complete picture of the suspension and steering behavior.'
            ),
            React.createElement('img', {
                src: SusAnaly5,
                alt: 'Output graphs',
                style: { width: '100%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),

        ),
    },
    {
        id: '2',
        title: 'Wheel Force Transducer',
        description: 'A mobile application for productivity.',
        tags: ['Baja SAE', 'MATLAB'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
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
