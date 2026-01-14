/**
 * CV Data Types
 */

export interface CVHeader {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    github: string;
    summary?: string;
}

export interface Education {
    institution: string;
    location: string;
    degree: string;
    date: string;
    coursework: string;
}

export interface Project {
    name: string;
    date: string;
    description: string;
}

export interface Skills {
    programming: string;
    design: string;
    tools?: string;
    projects: Project[];
}

export interface Experience {
    company: string;
    role: string;
    date: string;
    location: string;
    description: string;
}

export interface Leadership {
    organization: string;
    role: string;
    date: string;
    location: string;
    description: string;
}

export interface Certificate {
    name: string;
    issuer: string;
    date: string;
    description: string;
}

export interface CVData {
    header: CVHeader;
    education: Education[];
    skills: Skills;
    experience: Experience[];
    leadership: Leadership[];
    certificates: Certificate[];
}

// Section types for dynamic rendering
export type SectionType = 'education' | 'experience' | 'leadership' | 'certificates';
export type ItemType = Education | Experience | Leadership | Certificate | Project;
