/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { Props } from "@/utils/templatesType";
import { ColorScheme } from "@/utils/TemplatesColors";

export const ModernCV2 = ({ data, selectedColor }: Props) => {
  const { personalInfo, education, experiences, skills, languages, interests } =
    data;
  return (
    <div
      className={`max-w-6xl mx-auto p-8 bg-gradient-to-br ${ColorScheme[selectedColor]?.bgGradient} shadow-lg rounded-lg font-sans`}
    >
      <header
        className={`mb-8 flex items-center justify-between bg-gradient-to-r ${ColorScheme[selectedColor]?.bgGradient} text-white p-6 rounded-lg`}
      >
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
            <p className="text-xl mt-2 text-white opacity-90">
              {experiences[0]?.jobTitle}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white opacity-90">{personalInfo.phoneNumber}</p>
          <p className="text-white opacity-90">{personalInfo.email}</p>
        </div>
      </header>

      <div className="flex gap-8">
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold ${ColorScheme[selectedColor]?.bgGradient} mb-4 border-b-2 ${ColorScheme[selectedColor]?.bgGradient} pb-2`}
            >
              Informations
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span
                  className={`font-medium ${ColorScheme[selectedColor]?.bgGradient}`}
                >
                  Adresse:
                </span>
                {personalInfo.postalAddress}
              </li>
              <li>
                <span
                  className={`font-medium ${ColorScheme[selectedColor]?.bgGradient}`}
                >
                  Date de naissance:
                </span>
                {personalInfo.dateOfBirth}
              </li>
              <li>
                <span
                  className={`font-medium ${ColorScheme[selectedColor]?.bgGradient}`}
                >
                  Permis:
                </span>
                {personalInfo.drivingLicenseType}
              </li>
              <li>
                <span
                  className={`font-medium ${ColorScheme[selectedColor]?.bgGradient}`}
                >
                  LinkedIn:
                </span>
                <a
                  href={personalInfo.linkedinUrl}
                  className={`${ColorScheme[selectedColor]?.bgGradient} hover:underline`}
                >
                  {personalInfo.linkedinUrl}
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold ${ColorScheme[selectedColor]?.bgGradient} mb-4 border-b-2 ${ColorScheme[selectedColor]?.bgGradient} pb-2`}
            >
              Compétences
            </h2>
            <ul className="space-y-3">
              {skills.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span className="text-gray-700 mb-1">{item.skill}</span>
                  <div
                    className={`w-full ${ColorScheme[selectedColor]?.bgGradient} rounded-full h-3`}
                  >
                    <div
                      className={`bg-gradient-to-r ${ColorScheme[selectedColor]?.bgGradient} h-3 rounded-full`}
                      style={{ width: `${item.proficiencyLevel * 20}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold ${ColorScheme} mb-4 border-b-2 ${ColorScheme} pb-2`}
            >
              Langues
            </h2>
            <ul className="space-y-1 text-gray-700">
              {languages.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.language}</span>
                  <span className={`${ColorScheme} font-medium`}>
                    {item.proficiencyLevel}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className={`text-2xl font-semibold ${ColorScheme[selectedColor]?.bgGradient} mb-4 border-b-2 ${ColorScheme[selectedColor]?.bgGradient} pb-2`}
            >
              Centres d'intérêt
            </h2>
            <ul className="flex flex-wrap gap-2">
              {interests.map((item, index) => (
                <li
                  key={index}
                  className={`${ColorScheme[selectedColor]?.bgGradient} ${ColorScheme[selectedColor]?.bgGradient} px-3 py-1 rounded-full text-sm`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Colonne de droite */}
        <div className="w-2/3 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2
              className={`text-3xl font-bold ${ColorScheme[selectedColor]?.bgGradient} mb-6 border-b-2 ${ColorScheme[selectedColor]?.bgGradient} pb-2`}
            >
              Expériences professionnelles
            </h2>
            {experiences.map((experience, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">
                  {experience.jobTitle}
                </h3>
                <p className={`${ColorScheme} font-medium`}>
                  {experience.companyName}
                </p>
                <p className="text-gray-600 text-sm mb-2">{`${
                  experience.startDate
                } - ${experience.endDate || "Présent"}`}</p>
                <ul className="list-disc list-inside text-gray-700">
                  {experience.technicalSkills.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2
              className={`text-3xl font-bold ${ColorScheme[selectedColor]?.bgGradient} mb-6 border-b-2 ${ColorScheme[selectedColor]?.bgGradient} pb-2`}
            >
              Formation
            </h2>
            {education.map((formation, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">
                  {formation.degree}
                </h3>
                <p className={ColorScheme[selectedColor]?.bgGradient}>
                  {formation.institution}
                </p>
                <p className="text-gray-600 text-sm">
                  {formation.yearObtained}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernCV2;
