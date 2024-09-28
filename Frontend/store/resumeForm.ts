import {
  Education,
  Experience,
  Language,
  PersonalInfo,
  Skill,
} from "@/utils/templatesType";
import { atom } from "nanostores";

export type FormData = {
  personalInfo: PersonalInfo;
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
  languages: Language[];
  interests: string[];
};

const initialFormData: FormData = {
  personalInfo: {
    fullName: "",
    photo: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    postalAddress: "",
    drivingLicenseType: "",
    linkedinUrl: "",
  },
  education: [],
  experiences: [],
  skills: [],
  languages: [],
  interests: [],
};

export const $formData = atom<FormData>(initialFormData);

export const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
  $formData.set({
    ...$formData.get(),
    personalInfo: {
      ...$formData.get().personalInfo,
      ...updates,
    },
  });
};

export const updateEducation = (education: Education[]) => {
  $formData.set({
    ...$formData.get(),
    education,
  });
};

export const updateExperiences = (experiences: Experience[]) => {
  $formData.set({
    ...$formData.get(),
    experiences,
  });
};

export const updateSkills = (skills: Skill[]) => {
  $formData.set({
    ...$formData.get(),
    skills,
  });
};

export const updateLanguages = (languages: Language[]) => {
  $formData.set({
    ...$formData.get(),
    languages,
  });
};

export const updateInterests = (interests: string[]) => {
  $formData.set({
    ...$formData.get(),
    interests,
  });
};
