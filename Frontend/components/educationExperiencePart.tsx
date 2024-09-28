/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@nanostores/react";
import {
  $formData,
  updateEducation,
  updateExperiences,
} from "@/store/resumeForm";
import { Education, Experience } from "@/utils/templatesType";
import { X } from "lucide-react";

export const EducationExperienceForm = () => {
  const { education, experiences } = useStore($formData);

  // Fonctions pour l'éducation
  const handleAddEducation = () => {
    updateEducation([
      ...education,
      { degree: "", institution: "", yearObtained: "" },
    ]);
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducation = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    updateEducation(newEducation);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    updateEducation(newEducation);
  };

  // Fonctions pour les expériences
  const handleAddExperience = () => {
    updateExperiences([
      ...experiences,
      {
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        technicalSkills: "",
      },
    ]);
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const newExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    updateExperiences(newExperiences);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    updateExperiences(newExperiences);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Formation</h3>
        {education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <Input
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                placeholder="Diplôme obtenu"
              />
              <Input
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                placeholder="Établissement"
              />
            </div>
            <div className="flex items-center justify-between">
              <Input
                value={edu.yearObtained}
                onChange={(e) =>
                  handleEducationChange(index, "yearObtained", e.target.value)
                }
                placeholder="Année d'obtention"
                className="w-1/2"
              />
              <Button
                onClick={() => handleRemoveEducation(index)}
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={handleAddEducation}>Ajouter une formation</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Expériences professionnelles
        </h3>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <Input
                value={exp.jobTitle}
                onChange={(e) =>
                  handleExperienceChange(index, "jobTitle", e.target.value)
                }
                placeholder="Titre du poste"
              />
              <Input
                value={exp.companyName}
                onChange={(e) =>
                  handleExperienceChange(index, "companyName", e.target.value)
                }
                placeholder="Nom de l'entreprise"
              />
              <Input
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                placeholder="Date de début"
              />
              <Input
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                placeholder="Date de fin"
              />
            </div>
            <Textarea
              value={exp.technicalSkills}
              onChange={(e) =>
                handleExperienceChange(index, "technicalSkills", e.target.value)
              }
              placeholder="Compétences techniques et professionnelles"
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button
                onClick={() => handleRemoveExperience(index)}
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={handleAddExperience}>Ajouter une expérience</Button>
      </div>
    </div>
  );
};

export default EducationExperienceForm;
