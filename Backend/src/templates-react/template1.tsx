"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define interfaces for our data structures
export interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  postalAddress: string;
  dateOfBirth: string;
  drivingLicenseType: string;
  linkedinUrl: string;
}

export interface Experience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  technicalSkills: string;
}

export interface Skill {
  skill: string;
  proficiencyLevel: number;
}

export interface Language {
  language: string;
  proficiencyLevel: string;
}

export interface Education {
  degree: string;
  institution: string;
  yearObtained: string;
}

type ColorSchemeName = "blue" | "green" | "red" | "purple" | "orange";

// Define the Props type as requested
type Props = {
  data: {
    personalInfo: PersonalInfo;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];
    languages: Language[];
    interests: string[];
  };
  selectedColor: ColorSchemeName;
  templateId: number;
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  boldText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

// Helper function to get color based on selectedColor
const getColor = (selectedColor: ColorSchemeName): string => {
  const colorMap: Record<ColorSchemeName, string> = {
    blue: "#3B82F6",
    green: "#10B981",
    red: "#EF4444",
    purple: "#8B5CF6",
    orange: "#F97316",
  };
  return colorMap[selectedColor];
};

// Create Document Component
const Template1: React.FC<Props> = ({ data, selectedColor, templateId }) => {
  const { personalInfo, experiences, skills, languages, interests, education } =
    data;
  const themeColor = getColor(selectedColor);

  // TODO: Utiliser le bon template en fonction du bon templateId en props

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={[styles.header, { color: themeColor }]}>
            {personalInfo.fullName}
          </Text>
          <Text style={styles.subHeader}>{experiences[0]?.jobTitle}</Text>
          <Text style={styles.text}>{personalInfo.phoneNumber}</Text>
          <Text style={styles.text}>{personalInfo.email}</Text>

          <Text style={[styles.subHeader, { color: themeColor }]}>
            Informations
          </Text>
          <Text style={styles.text}>Adresse: {personalInfo.postalAddress}</Text>
          <Text style={styles.text}>
            Date de naissance: {personalInfo.dateOfBirth}
          </Text>
          <Text style={styles.text}>
            Permis: {personalInfo.drivingLicenseType}
          </Text>
          <Text style={styles.text}>LinkedIn: {personalInfo.linkedinUrl}</Text>

          <Text style={[styles.subHeader, { color: themeColor }]}>
            Compétences
          </Text>
          {skills.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.skill} - Niveau: {item.proficiencyLevel * 20}%
            </Text>
          ))}

          <Text style={[styles.subHeader, { color: themeColor }]}>Langues</Text>
          {languages.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.language} - {item.proficiencyLevel}
            </Text>
          ))}

          <Text style={[styles.subHeader, { color: themeColor }]}>
            Centres d&apos;intérêt
          </Text>
          <Text style={styles.text}>{interests.join(", ")}</Text>

          <Text style={[styles.subHeader, { color: themeColor }]}>
            Expériences professionnelles
          </Text>
          {experiences.map((experience, index) => (
            <View key={index}>
              <Text style={[styles.boldText, { color: themeColor }]}>
                {experience.jobTitle}
              </Text>
              <Text style={styles.text}>{experience.companyName}</Text>
              <Text style={styles.text}>{`${experience.startDate} - ${
                experience.endDate || "Présent"
              }`}</Text>
              <Text style={styles.text}>{experience.technicalSkills}</Text>
            </View>
          ))}

          <Text style={[styles.subHeader, { color: themeColor }]}>
            Formation
          </Text>
          {education.map((formation, index) => (
            <View key={index}>
              <Text style={[styles.boldText, { color: themeColor }]}>
                {formation.degree}
              </Text>
              <Text style={styles.text}>{formation.institution}</Text>
              <Text style={styles.text}>{formation.yearObtained}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Template1;
