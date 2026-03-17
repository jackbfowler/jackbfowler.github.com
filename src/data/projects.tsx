import React from 'react';
import ZigzagLayout from '../components/ZigzagLayout';

// Glob import for SusAnalysis images
const susAnalyImages = import.meta.glob('../assets/Projects/SusAnalysis/*', { eager: true, as: 'url' });
const getSusAnalyImage = (name: string) => susAnalyImages[`../assets/Projects/SusAnalysis/${name}`];

// Glob import for WFT images
const wftImages = import.meta.glob('../assets/Projects/WFT/*', { eager: true, as: 'url' });
const getWFTImage = (name: string) => wftImages[`../assets/Projects/WFT/${name}`];

// Glob import for 2025Upright images
const uprightImages = import.meta.glob('../assets/Projects/2025Upright/*', { eager: true, as: 'url' });
const getUprightImage = (name: string) => uprightImages[`../assets/Projects/2025Upright/${name}`];

// Glob import for DiMES images
const dimesImages = import.meta.glob('../assets/Projects/DiMES/*', { eager: true, as: 'url' });
const getDiMESImage = (name: string) => dimesImages[`../assets/Projects/DiMES/${name}`];

// Glob import for Formlabs images
const formlabsImages = import.meta.glob('../assets/Projects/Formlabs/*', { eager: true, as: 'url' });
const getFormlabsImage = (name: string) => formlabsImages[`../assets/Projects/Formlabs/${name}`];

// Glob import for 316SS Furnace Adapter images
const mtiImages = import.meta.glob('../assets/Projects/316FurnaceAdapter/*', { eager: true, as: 'url' });
const getMTIImage = (name: string) => mtiImages[`../assets/Projects/316FurnaceAdapter/${name}`];

// Glob import for HPT Anvil images
const hptImages = import.meta.glob('../assets/Projects/HPTAnvil/*', { eager: true, as: 'url' });
const getHPTImage = (name: string) => hptImages[`../assets/Projects/HPTAnvil/${name}`];

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

    {//Formlabs - SLS R&D Internship
        id: '9',
        title: 'Formlabs - SLS R&D Internship',
        description: '',
        tags: ['Additive', 'Material Science', 'Onshape', 'nTop', 'Inspection'],
        imageUrl: getFormlabsImage('FormlabsCover.jpeg') as string,
        slug: 'formlabs-sls-rd-internship',
        content: (
            <div>
                <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.5)', color: '#eab308', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>
                    All content shown is non-controlled, and approved for public display
                </div>

                <p style={{ marginBottom: '1rem', color: 'var(--stone-300)', lineHeight: '1.6', textAlign: 'left' }}>
                    I worked in Boston, MA at Formlabs HQ on R&D for SLS printers, both current and next generation. Below is a broad list of skills I acquired during my time there:
                </p>
                <br /><br />

                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '1.5rem', color: 'var(--stone-300)', lineHeight: '1.6', textAlign: 'left' }}>
                    <li>Greatly improved knowledge of polymer material science, and how it applies to SLS printer parameters and design.</li>
                    <li>Developed and executed characterization procedures to acquire accurate product performance data, comparing metrics to previous generations and competitors.</li>
                    <li>Used Onshape to design parts, inspect printer geometry, and overall familiarize myself with using the enterprise implementation of the software.</li>
                    <li>Used various high-accuracy measurement devices on samples I designed. Technologies included CMM, 3D scanning profilometry, and I even developed a custom inspection routine and software for a low-cost contact image scanner.</li>
                    <li>Used Python with statistics, numerical, and computer vision libraries to process, analyze, and visualize data. This sped up workflows and allowed me to form high-level product takeaways regarding my data.</li>
                    <li>Built a deep understanding of end-use part applications across materials (Nylon 12 variants, TPUs, and engineering photopolymer resins) and manufacturing conditions. I applied first-principle knowledge of mechanical design and material science to understand part applications and use cases.</li>
                    <li>Built skills around thermal FEM models, and understanding how changing process variables impacted final outcomes.</li>
                    <li>Contributed at product-level design reviews, presenting on assigned and self-started projects, further building my skills around presenting data-backed conclusions in a results-driven, IP-controlled, and fast-paced environment.</li>
                </ul>

                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--stone-300)', lineHeight: '1.6', textAlign: 'left' }}>
                    Thank you to the SLS team, summer interns, Boston, and Formlabs for making it a fantastic summer!
                </p>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={getFormlabsImage('FormlabsRedSox.jpg') as string}
                        alt="Formlabs Red Sox Game"
                        style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
            </div>
        ),
    },

    {//2025 Baja SAE Uprights
        id: '3',
        title: '2025 Baja SAE Uprights',
        description: 'Design assist and 5-axis machining of the rear uprights for the 2025 Baja SAE car.',
        tags: ['Baja SAE', 'Fusion360', 'Solidworks', 'Machining', 'Inspection'],
        imageUrl: getUprightImage('UprightCover.jpeg') as string,
        slug: '2025-baja-sae-uprights',
        content: (
            <div>
                <div style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    <p>
                        I assisted the design, and fully 5 axis machined our rear uprights for the 2025 car. This involved assisting the work of the main designer, Hayden Purcell, using my experience to point out opportunities to improve the manufacturability: simplifying CAD geometry to drive toolpaths, cutting down on difficult features, ensuring tool access, and developing GD&T checks to be performed for critical tolerances.
                    </p>
                </div>
                <ZigzagLayout items={[
                    {
                        id: 1,
                        title: 'Design',
                        text: <p>The design was done in Solidworks, with easy collaboration via the Solidworks PDM I setup for the team. I rebuilt the model parametrically, ensuring good geometry and CAD practices.</p>,
                        media: getUprightImage('UprightSW.png') as string,
                    },
                    {
                        id: 2,
                        title: 'CAM',
                        text: <p>I wrote the CAM in Fusion360, with accurate workholding and machine simulation.</p>,
                        media: (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <img src={getUprightImage('UprightCAM1.png') as string} alt="Fusion360 CAM 1" style={{ width: 'calc(50% - 0.5rem)', borderRadius: '8px', objectFit: 'cover' }} />
                                <img src={getUprightImage('UprightCAM2.png') as string} alt="Fusion360 CAM 2" style={{ width: 'calc(50% - 0.5rem)', borderRadius: '8px', objectFit: 'cover' }} />
                            </div>
                        ),
                    },
                    {
                        id: 3,
                        title: 'Machining',
                        text: <p>The part was machined on a UMC500, all in one setup. It was tabbed off as the last operation, which was very satisfying.</p>,
                        media: getUprightImage('UprightPost.jpg') as string,
                    },
                    {
                        id: 4,
                        title: 'Inspection',
                        text: <p>Inspection was then done traditionally on a surface plate, and also with a Creaform HandySCAN Black. It was especially interesting comparing the 10x tighter tolerances held by these versus our previous welded upright.</p>,
                        media: (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <img src={getUprightImage('UprightInspectCNC.png') as string} alt="Inspection CNC" style={{ width: 'calc(50% - 0.5rem)', borderRadius: '8px', objectFit: 'cover' }} />
                                <img src={getUprightImage('UprightInspectWeld.png') as string} alt="Inspection Weld" style={{ width: 'calc(50% - 0.5rem)', borderRadius: '8px', objectFit: 'cover' }} />
                            </div>
                        ),
                    }
                ]} />
            </div>
        ),
    },

    // {//2025 Baja SAE Steering System
    //     id: '8',
    //     title: '2025 Baja SAE Steering System',
    //     description: '',
    //     tags: ['Baja SAE', 'Solidworks', 'ANSYS', 'Machining'],
    //     imageUrl: 'https://via.placeholder.com/400',
    //     slug: '2025-baja-sae-steering-system',
    //     content: React.createElement('div', null,
    //         React.createElement('h2', null, ''),
    //         React.createElement('p', null, '')
    //     ),
    // },

    {//316SS Furnace Exhaust Adapter
        id: '4',
        title: '316SS Furnace Exhaust Adapter',
        description: 'Consulted and fully machined 316SS furnace adapters for a Material Science lab.',
        tags: ['Machining', 'Solidworks', 'Inspection'],
        imageUrl: getMTIImage('MTIFinal.jpeg') as string,
        slug: '316ss-furnace-exhaust-adapter',
        content: (
            <div>
                <div style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    <p>
                        I consulted on and fully machined three 316SS furnace adapters for a Material Science lab.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        I built skills in DFM: providing design guidance around specific machine capabilities and tooling selection, ensuring sufficient and effective workholding, and correctly communicating tolerances and critical features.
                    </p>
                </div>

                <p style={{ marginTop: '1rem', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    The part was programmed conversationally on the Matrix 2, workheld by bored out jaws and machined in two setups. Inspection was done traditionally with a height gauge and surface plate.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                    <video
                        src={getMTIImage('MTIvid.mov') as string}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <img
                        src={getMTIImage('MTISetup.jpeg') as string}
                        alt="Machining Setup"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <img
                        src={getMTIImage('MTIProgress.jpeg') as string}
                        alt="Machining Progress"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <img
                        src={getMTIImage('MTIProgram.jpeg') as string}
                        alt="Programming and Workholding"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
            </div>
        ),
    },

    {//H13 HPT Anvil
        id: '12',
        title: 'H13 HPT Anvil',
        description: 'Machined and heat treated an H13 anvil for High-Pressure Torsion research.',
        tags: ['Machining', 'Inspection', 'Material Science'],
        imageUrl: getHPTImage('HPTFinal.jpeg') as string,
        slug: 'h13-hpt-anvil',
        content: (
            <div>
                <div style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    <p>
                        I machined an anvil used in the <a href="https://en.wikipedia.org/wiki/High-pressure_torsion" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>High-Pressure Torsion (HPT)</a> process, a method to refine grain structure with high pressure and shear force, yielding unique material properties. Manufacturing this part supported Material Science Department research.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        I received the part file, communicated any DFM changes, selected tooling, created machinist drawings, and programmed conversationally on the machine (my first part done this way!).
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                    <img
                        src={getHPTImage('HPTAnvilProgress.jpeg') as string}
                        alt="HPT Anvil in progress"
                        style={{ width: '50%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', objectFit: 'cover' }}
                    />
                    <img
                        src={getHPTImage('HPTAnvilInspect.jpeg') as string}
                        alt="HPT Anvil inspection"
                        style={{ width: '50%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', objectFit: 'cover' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    <p>
                        I then heat treated the H13, following literature from ASM, ensuring understanding of each step, how it impacts the microstructure of the steel, which regions to hit and avoid on the TTT and CCT diagrams, and familiarizing myself with heat treat best practices. The heat treatment was successful and yielded a final hardness of 52 HRC.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <img
                        src={getHPTImage('HPTHot.jpeg') as string}
                        alt="Hot anvil after heat treatment"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <img
                        src={getHPTImage('HPTFurnace.jpeg') as string}
                        alt="Furnace heat treatment"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <img
                        src={getHPTImage('HPTTTT.webp') as string}
                        alt="TTT diagram reference"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
            </div>
        ),
    },

    {//DIII-D Fusion Tokamak - Tungsten DiMES Samples 
        id: '5',
        title: 'Tungsten DiMES Samples for DIII-D Fusion Tokamak',
        description: 'Manufacturing notoriously difficult tungsten samples for fusion plasma research.',
        tags: ['Machining', 'Solidworks', 'NX', 'Additive', 'Material Science'],
        imageUrl: getDiMESImage('DiMESCover.jpg') as string,
        slug: 'diii-d-fusion-tokamak',
        content: (
            <div>
                <div style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--stone-300)' }}>
                    <p>
                        I had the pleasure of helping Aaliyah Zuniga with some of her research around Fusion Plasma Auxiliaries Characterization, specifically looking at additively manufactured tungsten as a material to be used in fusion reactors. I assisted with the manufacturing of the tungsten samples.
                    </p>
                </div>
                <ZigzagLayout items={[
                    {
                        id: 1,
                        title: 'Printing',
                        text: <p>Tungsten samples with specific grain orientations were printed via EBM-PBF. By controlling scan strategy, 001 columnar or 111 equiaxed grains were formed.</p>,
                        media: getDiMESImage('DiMESEBM.jpg') as string,
                    },
                    {
                        id: 2,
                        title: 'Sectioning and EDM',
                        text: <p>Using ESPRIT, I created wire EDM programs to section the printed samples, and then cut the XY cross-section of the final sample.</p>,
                        media: getDiMESImage('DiMESEDM.jpeg') as string,
                    },
                    {
                        id: 3,
                        title: 'Grinding',
                        text: <p>Using a Haas GmbH Multigrind grinding center, I developed fixturing, wrote CAM, and successfully ground the tungsten samples. CAM was written both on machine conversationally, and with NX CAM</p>,
                        media: getDiMESImage('DiMESGrinding.jpg') as string,
                    },
                    {
                        id: 4,
                        text: <p>I machined about a dozen of these samples, maintaining tolerances throughout.</p>,
                        media: getDiMESImage('DiMESInspec.jpg') as string,
                    }
                ]} />
            </div>
        ),
    },

    // {//DMG MORI - Additive R&D Internship
    //     id: '10',
    //     title: 'DMG MORI - Additive R&D Internship',
    //     description: '',
    //     tags: ['Additive', 'NX', 'Inspection', 'Material Science'],
    //     imageUrl: 'https://via.placeholder.com/400',
    //     slug: 'dmg-mori-additive-rd-internship',
    //     content: (
    //         <div>
    //             <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.5)', color: '#eab308', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>
    //                 All content shown is non-controlled, and approved for public display
    //             </div>
    //         </div>
    //     ),
    // },

    // {//FIRST Robotics Competition 
    //     id: '6',
    //     title: 'FIRST Robotics Competition',
    //     description: '',
    //     tags: ['FIRST', 'Onshape', 'Fusion360', 'Additive', 'Robotics'],
    //     imageUrl: 'https://via.placeholder.com/400',
    //     slug: 'first-robotics-competition',
    //     content: React.createElement('div', null,
    //         React.createElement('h2', null, ''),
    //         React.createElement('p', null, '')
    //     ),
    // },
    // {//Robotic Self Balancing cube 
    //     id: '7',
    //     title: 'Robotic Self Balancing cube',
    //     description: '',
    //     tags: ['Robotics', 'Onshape', 'Additive',],
    //     imageUrl: 'https://via.placeholder.com/400',
    //     slug: 'robotic-self-balancing-cube',
    //     content: React.createElement('div', null,
    //         React.createElement('h2', null, ''),
    //         React.createElement('p', null, '')
    //     ),
    // },
    // {//Turbine Flow Meter
    //     id: '11',
    //     title: 'Turbine Flow Meter',
    //     description: '',
    //     tags: ['Machining', 'Fusion360', 'Inspection',],
    //     imageUrl: 'https://via.placeholder.com/400',
    //     slug: 'turbine-flow-meter',
    //     content: React.createElement('div', null,
    //         React.createElement('h2', null, ''),
    //         React.createElement('p', null, '')
    //     ),
    // },
];

// Aquapack, sandvik, E101 final, dynamics robot arm, 

export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    projects.forEach(project => {
        project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
};
