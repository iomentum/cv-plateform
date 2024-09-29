/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  $formData,
  updateInterests,
  updateLanguages,
  updateSkills,
} from "@/store/resumeForm";
import { useStore } from "@nanostores/react";

const SkillsLanguagesInterestsForm = () => {
  const { skills, languages, interests } = useStore($formData);

  const handleAddSkill = () => {
    updateSkills([...skills, { skill: "", proficiencyLevel: 1 }]);
  };

  const handleSkillChange = (
    index: number,
    field: "skill" | "proficiencyLevel",
    value: string | number
  ) => {
    const newSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    updateSkills(newSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    updateSkills(newSkills);
  };

  const handleAddLanguage = () => {
    updateLanguages([...languages, { language: "", proficiencyLevel: "" }]);
  };

  const handleLanguageChange = (
    index: number,
    field: "language" | "proficiencyLevel",
    value: string
  ) => {
    const newLanguages = languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    updateLanguages(newLanguages);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    updateLanguages(newLanguages);
  };

  const handleAddInterest = () => {
    updateInterests([...interests, ""]);
  };

  const handleInterestChange = (index: number, value: string) => {
    const newInterests = interests.map((interest, i) =>
      i === index ? value : interest
    );
    updateInterests(newInterests);
  };

  const handleRemoveInterest = (index: number) => {
    const newInterests = interests.filter((_, i) => i !== index);
    updateInterests(newInterests);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Compétences</h3>
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              value={skill.skill}
              onChange={(e) =>
                handleSkillChange(index, "skill", e.target.value)
              }
              placeholder="Compétence"
            />
            <Input
              type="number"
              min="1"
              max="5"
              value={skill.proficiencyLevel}
              onChange={(e) =>
                handleSkillChange(
                  index,
                  "proficiencyLevel",
                  parseInt(e.target.value)
                )
              }
              placeholder="Niveau (1-5)"
            />
            <Button
              onClick={() => handleRemoveSkill(index)}
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddSkill}>Ajouter une compétence</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Langues</h3>
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              value={lang.language}
              onChange={(e) =>
                handleLanguageChange(index, "language", e.target.value)
              }
              placeholder="Langue"
            />
            <Input
              value={lang.proficiencyLevel}
              onChange={(e) =>
                handleLanguageChange(index, "proficiencyLevel", e.target.value)
              }
              placeholder="Niveau de maîtrise"
            />
            <Button
              onClick={() => handleRemoveLanguage(index)}
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddLanguage}>Ajouter une langue</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Centres d'intérêt</h3>
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              value={interest}
              onChange={(e) => handleInterestChange(index, e.target.value)}
              placeholder="Centre d'intérêt"
            />
            <Button
              onClick={() => handleRemoveInterest(index)}
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddInterest}>Ajouter un centre d'intérêt</Button>
      </div>
    </div>
  );
};

export default SkillsLanguagesInterestsForm;
