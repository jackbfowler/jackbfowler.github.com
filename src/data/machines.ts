import EOS_M290 from '../assets/Machines/EOS_M290.png';
import HAAS_VF3 from '../assets/Machines/HAAS_VF3.png';
import MAZAK_INTEGREX from '../assets/Machines/MAZAK_INTEGREX.png';
import HAASGMBH_MULTIGRINDCA from '../assets/Machines/HAASGMBH_MULTIGRINDCA.png';
import HAAS_UMC500 from '../assets/Machines/HAAS_UMC500.png';
import DMGMORI_LT30 from '../assets/Machines/DMGMORI_LT30.png';
import ZEISS_CMM from '../assets/Machines/ZEISS_DURAMAXCMM.png';
import ZEISS_OINSPECTCMM from '../assets/Machines/ZEISS_OINSPECTCMM.png';
import MITS_FA10S from '../assets/Machines/MITS_FA10S.png';
import INSTRON_34FM from '../assets/Machines/INSTRON_34FM.png';
import LABSCUBED_CUBEONE from '../assets/Machines/LABSCUBED_CUBEONE.png';
import FORMLABS_FUSE1PLUS from '../assets/Machines/FORMLABS_FUSE1+.png';
import FORMLABS_FORM4 from '../assets/Machines/FORMLABS_FORM4.png';
import BAMBU_H2D from '../assets/Machines/BAMBU_H2D.png';


export interface Machine {
    id: number;
    name: string;
    image: string;
    description: string;
}

export const machines: Machine[] = [
    {
        id: 1,
        name: "EOS M290",
        image: EOS_M290,
        description: "Metal LPBF 3D Printer"
    },
    {
        id: 2,
        name: "Haas VF3",
        image: HAAS_VF3,
        description: "3-Axis CNC Mill"
    },
    {
        id: 3,
        name: "Mazak Integrex i-100ST",
        image: MAZAK_INTEGREX,
        description: "Multitasking Mill-Turn CNC"
    },
    {
        id: 4,
        name: "A.Haas Multigrind CA",
        image: HAASGMBH_MULTIGRINDCA,
        description: "5-Axis CNC Grinder"
    },
    {
        id: 5,
        name: "HAAS UMC500",
        image: HAAS_UMC500,
        description: "5-Axis CNC Mill"
    },
    {
        id: 6,
        name: "DMG Mori LT30",
        image: DMGMORI_LT30,
        description: "LPBF Metal 3D Printer"
    },
    {
        id: 7,
        name: "ZEISS Duramax CMM",
        image: ZEISS_CMM,
        description: "Probe Coordinate Measuring Machine"
    },
    {
        id: 8,
        name: "ZEISS O-Inspect CMM",
        image: ZEISS_OINSPECTCMM,
        description: "Optical Coordinate Measuring Machine"
    },
    {
        id: 9,
        name: "Mitsubishi FA10S EDM",
        image: MITS_FA10S,
        description: "Wire EDM"
    },
    {
        id: 10,
        name: "Instron 34FM UTM",
        image: INSTRON_34FM,
        description: "Universal Testing Machine"
    },
    {
        id: 11,
        name: "LabScubed CubeOne",
        image: LABSCUBED_CUBEONE,
        description: "Automated Tensile Tester"
    },
    {
        id: 12,
        name: "Formlabs Fuse 1+",
        image: FORMLABS_FUSE1PLUS,
        description: "SLS Polymer 3D Printer"
    },
    {
        id: 13,
        name: "Formlabs Form 4",
        image: FORMLABS_FORM4,
        description: "MSLA Polymer 3D Printer"
    },
    {
        id: 14,
        name: "Bambu H2D",
        image: BAMBU_H2D,
        description: "FDM Polymer 3D Printer"
    },
];
