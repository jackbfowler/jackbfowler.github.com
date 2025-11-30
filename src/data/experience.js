import NCSUMAE from '../assets/Logos/NCSUMAE.png';
import BAJASAE from '../assets/Logos/BAJASAE.png';
import CAMAL from '../assets/Logos/CAMAL.png';
import DMGMORI from '../assets/Logos/DMGMORI.png';
import FORMLABS from '../assets/Logos/FORMLABS.png';
import NCSSM from '../assets/Logos/NCSSM.png';
import VALENCE from '../assets/Logos/VALENCE.png';

export const experienceData = [
    {
        id: 0,
        company: "NCSSM",
        role: "High School Student",
        startDate: "2018-08-01",
        endDate: "2020-05-01",
        semesterStart: -1.25, // Starts 2 semesters before end
        semesterEnd: 0.75, // Ends 0.25 below NC State start (1.0)
        description: "North Carolina School of Science and Mathematics.",
        logo: NCSSM,
        color: "#3f5f90ff", // RGB(63, 95, 144)
        track: 0 // Same track as NC State
    },
    {
        id: 1,
        company: "N.C. State University",
        role: "Mechanical Engineering Student",
        startDate: "2020-08-01",
        endDate: "Present",
        semesterStart: 1,
        semesterEnd: 8,
        description: "Pursuing B.S. in Mechanical Engineering. Dean's List.",
        logo: NCSUMAE,
        color: "#BB271A",
        track: 0 // Reverted to 0
    },
    {
        id: 2,
        company: "Pack Motorports Baja SAE",
        role: "Suspension and Steering Lead",
        startDate: "2020-08-01",
        endDate: "Present",
        semesterStart: 1,
        semesterEnd: 8,
        description: "Led the design and manufacturing of the suspension system for the 2024 competition vehicle. Managed a team of 5 junior engineers.",
        logo: BAJASAE,
        color: "#BB271A",
        track: 1 // Reverted to 1
    },
    {
        id: 3,
        company: "Center for Additive Manufacturing and Logistics",
        role: "Undergraduate Researcher",
        startDate: "2021-01-01",
        endDate: "Present",
        semesterStart: 2,
        semesterEnd: 8,
        description: "Assisted in the development of soft robotics actuators. Published findings in undergraduate research symposium.",
        logo: CAMAL,
        color: "#D2353E",
        track: 2 // Reverted to 2
    },
    {
        id: 4,
        company: "DMG MORI",
        role: "Additive Application Engineering Intern",
        startDate: "2021-05-01",
        endDate: "2021-08-01",
        semesterStart: 3,
        semesterEnd: 4,
        description: "Designed and validated battery pack components. Conducted thermal analysis and optimized cooling systems.",
        logo: DMGMORI,
        color: "#221F20",
        logoBg: "#ffffff",
        track: 3 // Reverted to 3
    },
    {
        id: 5,
        company: "Formlabs",
        role: "R&D Intern - SLS",
        startDate: "2022-05-01",
        endDate: "2022-08-01",
        semesterStart: 6,
        semesterEnd: 7,
        description: "Assisted in the development of soft robotics actuators. Published findings in undergraduate research symposium.",
        logo: FORMLABS,
        color: "#2A60C1",
        track: 3 // Reverted to 3
    },
    {
        id: 6,
        company: "Valence Robotics",
        role: "Captain",
        startDate: "2018-08-01",
        endDate: "2020-05-01",
        semesterStart: -1.25,
        semesterEnd: 0,
        description: ".",
        logo: VALENCE,
        color: "#c9843dff", // RGB(229, 136, 67)
        track: 1
    }
];
