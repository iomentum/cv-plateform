import { StaticImageData } from "next/image";
import { ColorScheme } from "./TemplatesColors";

export type PersonalInfo = {
  fullName: string;
  photo: string | StaticImageData;
  phoneNumber: string;
  email: string;
  postalAddress: string;
  dateOfBirth: string;
  drivingLicenseType: string;
  linkedinUrl: string;
};

export type Education = {
  degree: string;
  institution: string;
  yearObtained: string;
};

export type Experience = {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  technicalSkills: string;
};

export type Skill = {
  skill: string;
  proficiencyLevel: number;
};

export type Language = {
  language: string;
  proficiencyLevel: string;
};
export type ColorSchemeName = keyof typeof ColorScheme;

export type Props = {
  data: {
    personalInfo: PersonalInfo;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];
    languages: Language[];
    interests: string[];
  };

  selectedColor: ColorSchemeName;
};

type ColorScheme = {
  bgGradient: string;
  headerGradient: string;
  accentText: string;
  accentBorder: string;
  progressBg: string;
  progressFill: string;
  tagBg: string;
  tagText: string;
};

export type ColorSchemes = {
  [K in ColorSchemeName]: ColorScheme;
};
