export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
  achievements?: string[];
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
  achievements?: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skills;
  projects: Project[];
}