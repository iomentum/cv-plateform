import bender from "@/assets/bender.jpg";

export const mockData = {
  personalInfo: {
    fullName: "Marie Dupont",
    photo: bender,
    phoneNumber: "06 12 34 56 78",
    email: "marie.dupont@email.com",
    postalAddress: "123 Rue de Paris, 75001 Paris",
    dateOfBirth: "15/05/1990",
    drivingLicenseType: "B",
    linkedinUrl: "https://www.linkedin.com/in/mariedupont",
  },
  education: [
    {
      degree: "Master en Marketing Digital",
      institution: "Université de Paris",
      yearObtained: "2015",
    },
    {
      degree: "Licence en Communication",
      institution: "Université de Lyon",
      yearObtained: "2013",
    },
  ],
  experiences: [
    {
      jobTitle: "Chef de Projet Marketing",
      companyName: "TechCorp",
      startDate: "Jan 2020",
      endDate: "Présent",
      technicalSkills:
        "Gestion de campagnes SEA/SEO\nAnalyse de données\nGestion d'équipe",
    },
    {
      jobTitle: "Chargée de Communication Digitale",
      companyName: "MediaGroup",
      startDate: "Jun 2015",
      endDate: "Dec 2019",
      technicalSkills:
        "Création de contenu\nGestion des réseaux sociaux\nAnalyse des performances",
    },
  ],
  skills: [
    { skill: "Marketing Digital", proficiencyLevel: 5 },
    { skill: "Gestion de Projet", proficiencyLevel: 4 },
    { skill: "Analyse de Données", proficiencyLevel: 4 },
    { skill: "Rédaction Web", proficiencyLevel: 5 },
  ],
  languages: [
    { language: "Français", proficiencyLevel: "Langue maternelle" },
    { language: "Anglais", proficiencyLevel: "Courant" },
    { language: "Espagnol", proficiencyLevel: "Intermédiaire" },
  ],
  interests: ["Photographie", "Voyages", "Cuisine du monde"],
};
