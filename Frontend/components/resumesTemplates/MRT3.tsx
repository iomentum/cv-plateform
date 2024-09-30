import React from "react";
import Image from "next/image";
import { ModernCV3Props } from "@/utils/templatesType";
import { ColorScheme3 } from "@/utils/TemplatesColors";

export const ModernCV3 = ({ data, selectedColor }: ModernCV3Props) => {
  const { personalInfo, education, experiences, skills, languages, interests } = data;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg font-sans">
      <header className={`mb-8 flex items-center justify-between bg-gradient-to-r ${ColorScheme3[selectedColor]?.headerBg} text-white p-6 rounded-lg`}>
        <div className="flex items-center">
          {personalInfo.photo && (
            <Image
              src={personalInfo.photo}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover border-4 border-white mr-6"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
            <p className="text-xl mt-2 text-gray-300">{experiences[0]?.jobTitle}</p>
          </div>
        </div>
        <div className="text-right">
          <p>{personalInfo.phoneNumber}</p>
          <p>{personalInfo.email}</p>
        </div>
      </header>

      <div className="flex gap-8">
        <div className={`w-1/3 bg-white p-6 rounded-lg shadow-md ${ColorScheme3[selectedColor]?.accentBorder} border-l-4`}>
          <section className="mb-6">
            <h2 className={`text-2xl font-semibold ${ColorScheme3[selectedColor]?.accentText} mb-4 border-b-2 border-gray-200 pb-2`}>Informations</h2>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">Adresse:</span> {personalInfo.postalAddress}</li>
              <li><span className="font-medium">Date de naissance:</span> {personalInfo.dateOfBirth}</li>
              <li><span className="font-medium">Permis:</span> {personalInfo.drivingLicenseType}</li>
              <li><span className="font-medium">LinkedIn:</span> <a href={personalInfo.linkedinUrl} className={`${ColorScheme3[selectedColor]?.accentText} hover:underline`}>{personalInfo.linkedinUrl}</a></li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className={`text-2xl font-semibold ${ColorScheme3[selectedColor]?.accentText} mb-4 border-b-2 border-gray-200 pb-2`}>Compétences</h2>
            <ul className="space-y-3">
              {skills.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span className="text-gray-700 mb-1">{item.skill}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${ColorScheme3[selectedColor]?.progressFill} h-2 rounded-full`}
                      style={{ width: `${item.proficiencyLevel * 20}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className={`text-2xl font-semibold ${ColorScheme3[selectedColor]?.accentText} mb-4 border-b-2 border-gray-200 pb-2`}>Langues</h2>
            <ul className="space-y-1 text-gray-700">
              {languages.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.language}</span>
                  <span className="font-medium">{item.proficiencyLevel}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold ${ColorScheme3[selectedColor]?.accentText} mb-4 border-b-2 border-gray-200 pb-2`}>Centres d'intérêt</h2>
            <ul className="list-disc list-inside text-gray-700">
              {interests.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="w-2/3 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className={`text-3xl font-bold ${ColorScheme3[selectedColor]?.accentText} mb-6 border-b-2 border-gray-200 pb-2`}>Expériences professionnelles</h2>
            {experiences.map((experience, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">{experience.jobTitle}</h3>
                <p className={`${ColorScheme3[selectedColor]?.accentText} font-medium`}>{experience.companyName}</p>
                <p className="text-gray-600 text-sm mb-2">{`${experience.startDate} - ${experience.endDate || 'Présent'}`}</p>
                <ul className="list-disc list-inside text-gray-700">
                  {experience.technicalSkills.split('\n').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className={`text-3xl font-bold ${ColorScheme3[selectedColor]?.accentText} mb-6 border-b-2 border-gray-200 pb-2`}>Formation</h2>
            {education.map((formation, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">{formation.degree}</h3>
                <p className={ColorScheme3[selectedColor]?.accentText}>{formation.institution}</p>
                <p className="text-gray-600 text-sm">{formation.yearObtained}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernCV3;