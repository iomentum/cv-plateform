import React from "react";
import Image from "next/image";
import { Props } from "@/utils/templatesType";
import { ColorScheme } from "@/utils/TemplatesColors";

export const ModernCV1 = ({ data, selectedColor }: Props) => {
  const { personalInfo, education, experiences, skills, languages, interests } = data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sans">
      <header className={`mb-8 flex items-center bg-gradient-to-r ${ColorScheme[selectedColor].headerGradient} text-white p-6 rounded-lg`}>
        <div className="mr-6">
          {personalInfo.photo && (
            <Image
              src={personalInfo.photo}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
          <p className="text-xl mt-2 opacity-90">{experiences[0]?.jobTitle}</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <section className={`mb-6 ${ColorScheme[selectedColor].tagBg} p-4 rounded-lg`}>
            <h2 className={`text-xl font-semibold ${ColorScheme[selectedColor].accentText} mb-3 ${ColorScheme[selectedColor].accentBorder} border-b pb-2`}>Informations</h2>
            <ul className="space-y-2 text-sm">
              <li><span className="font-medium">Téléphone:</span> {personalInfo.phoneNumber}</li>
              <li><span className="font-medium">Email:</span> {personalInfo.email}</li>
              <li><span className="font-medium">Adresse:</span> {personalInfo.postalAddress}</li>
              <li><span className="font-medium">Date de naissance:</span> {personalInfo.dateOfBirth}</li>
              <li><span className="font-medium">Permis:</span> {personalInfo.drivingLicenseType}</li>
              <li><span className="font-medium">LinkedIn:</span> <a href={personalInfo.linkedinUrl} className={`${ColorScheme[selectedColor].accentText} hover:underline`}>{personalInfo.linkedinUrl}</a></li>
            </ul>
          </section>

          <section className={`mb-6 ${ColorScheme[selectedColor].tagBg} p-4 rounded-lg`}>
            <h2 className={`text-xl font-semibold ${ColorScheme[selectedColor].accentText} mb-3 ${ColorScheme[selectedColor].accentBorder} border-b pb-2`}>Compétences</h2>
            <ul className="space-y-2">
              {skills.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span className="text-sm mb-1">{item.skill}</span>
                  <div className={`w-full ${ColorScheme[selectedColor].progressBg} rounded-full h-2`}>
                    <div
                      className={`bg-gradient-to-r ${ColorScheme[selectedColor].progressFill} h-2 rounded-full`}
                      style={{ width: `${item.proficiencyLevel * 20}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={`mb-6 ${ColorScheme[selectedColor].tagBg} p-4 rounded-lg`}>
            <h2 className={`text-xl font-semibold ${ColorScheme[selectedColor].accentText} mb-3 ${ColorScheme[selectedColor].accentBorder} border-b pb-2`}>Langues</h2>
            <ul className="space-y-1 text-sm">
              {languages.map((item, index) => (
                <li key={index}>{`${item.language} - ${item.proficiencyLevel}`}</li>
              ))}
            </ul>
          </section>

          <section className={`${ColorScheme[selectedColor].tagBg} p-4 rounded-lg`}>
            <h2 className={`text-xl font-semibold ${ColorScheme[selectedColor].accentText} mb-3 ${ColorScheme[selectedColor].accentBorder} border-b pb-2`}>Centres d'intérêt</h2>
            <ul className="list-disc list-inside text-sm">
              {interests.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="col-span-2">
          <section className="mb-6">
            <h2 className={`text-2xl font-semibold ${ColorScheme[selectedColor].accentText} mb-4 ${ColorScheme[selectedColor].accentBorder} border-b pb-2`}>Expériences professionnelles</h2>
            {experiences.map((experience, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium">{experience.jobTitle}</h3>
                <p className={`${ColorScheme[selectedColor].accentText} font-medium`}>{experience.companyName}</p>
                <p className="text-sm text-gray-600 mb-2">{`${experience.startDate} - ${experience.endDate || 'Présent'}`}</p>
                <ul className="list-disc list-inside text-sm">
                  {experience.technicalSkills.split('\n').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className={`text-2xl font-semibold ${ColorScheme[selectedColor].accentText} mb-4 ${ColorScheme[selectedColor].accentBorder} border-b pb-2`}>Formation</h2>
            {education.map((formation, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-lg font-medium">{formation.degree}</h3>
                <p className={`${ColorScheme[selectedColor].accentText}`}>{formation.institution}</p>
                <p className="text-sm text-gray-600">{formation.yearObtained}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernCV1;