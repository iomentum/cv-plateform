import { StaticImageData } from "next/image";
import { ColorScheme1, ColorScheme2, ColorScheme3,  } from "./TemplatesColors";

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
export type ColorSchemeName1 = keyof typeof ColorScheme1;
export type ColorSchemeName2 = keyof typeof ColorScheme2;
export type ColorSchemeName3 = keyof typeof ColorScheme3;

export type ModernCV1Props = {
  data: {
    personalInfo: PersonalInfo;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];
    languages: Language[];
    interests: string[];
  };

  selectedColor: ColorSchemeName1 ;
};

export type ModernCV2Props = {
  data: {
    personalInfo: PersonalInfo;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];
    languages: Language[];
    interests: string[];
  };
  selectedColor: ColorSchemeName2;
};
export type ModernCV3Props = {
  data: {
    personalInfo: PersonalInfo;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];
    languages: Language[];
    interests: string[];
  };
  selectedColor: ColorSchemeName3;
};
