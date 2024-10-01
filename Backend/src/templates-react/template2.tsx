import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  Education,
  Experience,
  Language,
  PersonalInfo,
  Skill,
} from "./template1";

const ColorSchemes = {
  greenGold: {
    headerBg: "#1B5E20",
    headerGradient: ["#1B5E20", "#0A3D0A"],
    accentBorder: "#2E7D32",
    accentText: "#1B5E20",
    accentBg: "#E8F5E9",
    progressFill: "#43A047",
  },
  navyBlue: {
    headerBg: "#1A237E",
    headerGradient: ["#1A237E", "#0D1859"],
    accentBorder: "#303F9F",
    accentText: "#1A237E",
    accentBg: "#E8EAF6",
    progressFill: "#3949AB",
  },
  burgundy: {
    headerBg: "#880E4F",
    headerGradient: ["#880E4F", "#560027"],
    accentBorder: "#AD1457",
    accentText: "#880E4F",
    accentBg: "#FCE4EC",
    progressFill: "#C2185B",
  },
  charcoal: {
    headerBg: "#37474F",
    headerGradient: ["#37474F", "#263238"],
    accentBorder: "#546E7A",
    accentText: "#37474F",
    accentBg: "#ECEFF1",
    progressFill: "#607D8B",
  },
};
type ColorSchemeName = "greenGold" | "navyBlue" | "burgundy" | "charcoal";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 0,
  },
  leftColumn: {
    width: "30%",
    backgroundColor: "#0E4927",
    padding: 20,
    height: "100%",
  },
  rightColumn: {
    width: "70%",
    padding: 30,
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubText: {
    color: "white",
    fontSize: 16,
  },
  leftSection: {
    marginBottom: 25,
  },
  leftSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
    marginBottom: 10,
  },
  leftText: {
    fontSize: 12,
    marginBottom: 5,
    color: "white",
  },
  leftBoldText: {
    fontWeight: "bold",
    color: "white",
  },
  skillBar: {
    height: 6,
    marginTop: 2,
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
  },
  skillFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 3,
  },
  rightSection: {
    marginBottom: 25,
  },
  rightSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E4927",
    borderBottomWidth: 2,
    borderBottomColor: "#0E4927",
    paddingBottom: 5,
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  experienceSubtitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#0E4927",
    marginBottom: 3,
  },
  experienceDate: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 5,
  },
  experienceList: {
    paddingLeft: 15,
  },
  experienceListItem: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 3,
  },
  rightText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#333333",
  },
});

type Template2Props = {
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

const Template2 = ({ data, selectedColor, templateId }: Template2Props) => {
  const { personalInfo, experiences, skills, languages, interests, education } =
    data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{personalInfo.fullName}</Text>
            <Text style={styles.headerSubText}>{experiences[0]?.jobTitle}</Text>
          </View>

          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Informations</Text>
            <Text style={styles.leftText}>
              Adresse: {personalInfo.postalAddress}
            </Text>
            <Text style={styles.leftText}>
              Né(e) le: {personalInfo.dateOfBirth}
            </Text>
            <Text style={styles.leftText}>
              Permis: {personalInfo.drivingLicenseType}
            </Text>
            <Text style={styles.leftText}>
              LinkedIn: {personalInfo.linkedinUrl}
            </Text>
          </View>

          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Compétences</Text>
            {skills.map((item, index) => (
              <View key={index}>
                <Text style={styles.leftText}>{item.skill}</Text>
                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillFill,
                      { width: `${item.proficiencyLevel * 20}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Langues</Text>
            {languages.map((item, index) => (
              <Text key={index} style={styles.leftText}>
                {item.language} - {item.proficiencyLevel}
              </Text>
            ))}
          </View>

          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Centres d'intérêt</Text>
            {interests.map((item, index) => (
              <Text key={index} style={styles.leftText}>
                • {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.rightSection}>
            <Text style={styles.rightSectionTitle}>
              Expériences professionnelles
            </Text>
            {experiences.map((experience, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>
                  {experience.jobTitle}
                </Text>
                <Text style={styles.experienceSubtitle}>
                  {experience.companyName}
                </Text>
                <Text style={styles.experienceDate}>{`${
                  experience.startDate
                } - ${experience.endDate || "Présent"}`}</Text>
                <View style={styles.experienceList}>
                  {experience.technicalSkills.split("\n").map((item, i) => (
                    <Text key={i} style={styles.experienceListItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.rightSectionTitle}>Formation</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.experienceSubtitle}>{edu.institution}</Text>
                <Text style={styles.experienceDate}>{edu.yearObtained}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2;
