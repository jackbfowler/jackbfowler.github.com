import React from 'react';
import ZigzagLayout from '../components/ZigzagLayout';

// Glob import for SusAnalysis images
const susAnalyImages = import.meta.glob('../assets/Projects/SusAnalysis/*', { eager: true, as: 'url' });
const getSusAnalyImage = (name: string) => susAnalyImages[`../assets/Projects/SusAnalysis/${name}`];

// Glob import for WFT images
const wftImages = import.meta.glob('../assets/Projects/WFT/*', { eager: true, as: 'url' });
const getWFTImage = (name: string) => wftImages[`../assets/Projects/WFT/${name}`];

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
    {//Suspension Analysis Tool
        id: '1',
        title: 'Suspension Analysis Tool',
        description: 'A geometry analysis tool for kinematic design.',
        tags: ['Baja SAE', 'MATLAB', 'Solidworks'],
        imageUrl: getSusAnalyImage('SusAnaly.jpg') as string,
        slug: 'Suspension-Analysis',
        content: React.createElement('div', null,
            React.createElement('h2', null, 'Overview'),
            React.createElement('p', null,
                'A suspension and steering geometry analysis tool built for our Baja SAE car. Inspired by usage of software like Lotus Shark and Adams Car, but made to fill a gap in our use case. ' +
                'It allowed me to improve knowledge of fundamental analysis, and have much more thorough and intuitive analysis of geometry changes to key target metrics.'
            ),
            React.createElement('br'),
            React.createElement('ul', { style: { listStyleType: 'disc', paddingLeft: '20px', marginBottom: '1rem' } },
                React.createElement('li', null, 'Assumptions: Quasistatic, zero-deformation tire and links'),
                React.createElement('li', null, 'Solving: Simple vector algebra approach, instantly solves with low compute'),
                React.createElement('li', null, 'Produces: Key corner kinematic metrics for double a-arm, LCA/UCA shock mounted suspension'),
            ),
            React.createElement('br'),
            React.createElement('h3', null, 'How It Works'),
            React.createElement('br'),
            React.createElement('p', null,
                'A kinematic model of our car is built in Solidworks, driven by an inverse model from ride height, wheel base, and other top level variables. ' +
                'This allows for good fundamental design, but it is slow and clunky, requiring you to jump through many Solidworks hoops.'
            ),
            React.createElement('img', {
                src: getSusAnalyImage('1.jpg') as string,
                alt: 'Solidworks Model',
                style: { width: '75%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('br'),
            React.createElement('p', null,
                'A Solidworks Macro was created to export selected hardpoint coordinates as a .csv in just a few clicks.'
            ),
            React.createElement('img', {
                src: getSusAnalyImage('2.jpg') as string,
                alt: 'Solidworks Macro',
                style: { width: '50%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('br'),
            React.createElement('p', null,
                'I then developed a MATLAB script that parses the exported geometry and solves the forward kinematics from shock and steering travel. ' +
                'It uses closed-form vector algebra to explicitly solve the motion using trig and circle sphere intersections, which is great with MATLAB matrix operations. ' +
                'Handles singularities and strange geometry edges cases natively.'
            ),
            React.createElement('img', {
                src: getSusAnalyImage('3.jpg') as string,
                alt: 'MATLAB Solver',
                style: { width: '50%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),
            React.createElement('br'),
            React.createElement('p', null,
                'I included an interactive visualizer, allowing you to easily visualize and correlate motion to kinematic graphs. ' +
                'Below is an example of 2021 kinematic data fed into the tool.'
            ),
            React.createElement('video', {
                src: getSusAnalyImage('4.mov') as string,
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
                src: getSusAnalyImage('5.jpg') as string,
                alt: 'Output graphs',
                style: { width: '100%', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem' }
            }),

        ),
    },
    {//Wheel Force Transducer
        id: '2',
        title: 'Wheel Force Transducer',
        description: 'A mobile application for productivity.',
        tags: ['Baja SAE', 'MATLAB'],
        imageUrl: getWFTImage('WFT.jpg') as string,
        slug: 'WFT',
        content: (
            <div>
                <div style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    <p>
                        I led the acquisition, planning, integration, and testing of a Wheel Force Transducer (WFT) for our Baja SAE team.
                        Historically, we have calculated our component load cases analytically, making assumptions about accelerations, mass inertia, etc.
                        <br /><br />
                        The WFT is a device that captures 6DOF (F<sub>x</sub>, F<sub>y</sub>, F<sub>z</sub>, M<sub>x</sub>, M<sub>y</sub>, M<sub>z</sub>) loads acting on a wheel hub with an array of strain gauge bridges.
                        From the resolved forces, we can correlate our previous design assumptions, and better inform future component design and analysis.
                    </p>
                </div>
                <ZigzagLayout items={[
                    {
                        id: 1,
                        title: 'Setup',
                        text: <p>Michigan Scientific provided us with the LW9.5 WFT,  in Baja SAE. They also provided the CT3 user interface box, the outlet for data collection. Thank you!</p>,
                        media: getWFTImage('WFTspread_srgb.jpeg') as string,
                        caption: ''
                    },
                    {
                        id: 2,
                        title: '',
                        text: <p>Prioritizing ease of setup and minimizing failure points, we used the provided CT3 interface connected to an onboard laptop computer, to recieve and log the data. In future work, our electronics team hopes to integrate the CAN logging into our from-scratch DAQ system via MDF4.  </p>,
                        media: getWFTImage('WFTWiring.jpg') as string,
                        caption: ''
                    },
                    {
                        id: 3,
                        title: 'Testing',
                        text: <p>I selected testing scenarios that isolate certain competition conditions: hard hits, jumps, cornering, braking, acceleration. A mock endurance race was also conducted, which combines these and captures thier interactions and occurance rate. </p>,
                        media: getWFTImage('WFTTesting.MOV') as string,
                        caption: ''
                    },
                ]} />
                <div style={{ marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--stone-100)' }}>Analysis</h3>
                    <video
                        src={getWFTImage('WFTVideo.MOV') as string}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
                <p>I undertook the analysis of the WFT data in MATLAB. The provided hardware deals with the rotating coordinate frame and cleaning the analog signal, but does not filter the output load data.
                    Beginning with the SAE J211 Channel Frequency Class recommedations, a zero-phase butterworth low-pass filter was applied, to isolate out noise and vibration while preserving peaks.
                    Based on the PSD, I raised the cutoff from the standard, which was logical, as it is based on human body response, and we want to preserve a bit more of the high frequency data for quick transient impulse forces.
                    <br /><br />
                    I built the above MATLAB software to visualize the forces alongside the video we sychronously captured. This made it easy to extract load cases from certain instances, for use in analysis.
                    The team is making great use of this data to inform our design.
                </p>
                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={getWFTImage('WFTGroup.jpg') as string}
                        alt="WFT Group"
                        style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>

            </div>
        ),
    },
    {//2025 Baja SAE Steering System
        id: '3',
        title: '2025 Baja SAE Steering System',
        description: '',
        tags: ['Baja SAE', 'Solidworks', 'ANSYS', 'Machining'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//316SS Furnace Exhaust Adapter
        id: '4',
        title: '316SS Furnace Exhaust Adapter',
        description: '',
        tags: ['Machining', 'Solidworks'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//DIII-D Fusion Tokomak - Tungstun DiMES Samples 
        id: '5',
        title: 'DIII-D Fusion Tokomak - Tungstun DiMES Samples',
        description: '',
        tags: ['Machining', 'Solidworks', 'NX', 'Additive',],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//FIRST Robotics Competition 
        id: '6',
        title: 'FIRST Robotics Competition',
        description: '',
        tags: ['FIRST', 'Onshape', 'Fusion360', 'Additive', 'Robotics'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//Robotic Self Balancing cube 
        id: '7',
        title: 'Robotic Self Balancing cube',
        description: '',
        tags: ['Robotics', 'Onshape', 'Additive',],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//2025 Baja SAE Uprights
        id: '8',
        title: '2025 Baja SAE Uprights',
        description: '',
        tags: ['Baja SAE', 'Fusion360', 'Solidworks', 'Machining'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//Formlabs - SLS R&D Internship
        id: '9',
        title: 'Formlabs - SLS R&D Internship',
        description: '',
        tags: ['Additive', 'Onshape', 'nTop', 'Inspection'],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//DMG MORI - Additive R&D Internship
        id: '10',
        title: 'DMG MORI - Additive R&D Internship',
        description: '',
        tags: ['Additive', 'NX', 'Inspection',],
        imageUrl: 'https://via.placeholder.com/400',
        slug: 'beta-app',
        content: React.createElement('div', null,
            React.createElement('h2', null, ''),
            React.createElement('p', null, '')
        ),
    },
    {//Turbine Flow Meter
        id: '11',
        title: 'Turbine Flow Meter',
        description: '',
        tags: ['Machining', 'Fusion360', 'Inspection',],
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
