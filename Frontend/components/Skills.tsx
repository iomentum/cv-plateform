/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const SkillsLanguagesInterestsForm = () => {
  const [skills, setSkills] = useState([{}, {}]);
  const [languages, setLanguages] = useState([{}, {}]);
  const [interests, setInterests] = useState([{}, {}]);

  const addSkill = () => setSkills([...skills, {}]);
  const addLanguage = () => setLanguages([...languages, {}]);
  const addInterest = () => setInterests([...interests, {}]);

  const removeItem = (index: number, items: any, setItems: any) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
          Compétences
        </h2>
        {skills.map((skill, index) => (
          <div key={index} className="mb-2 grid grid-cols-2 gap-4 items-center">
            <div>
              <Label
                htmlFor={`competence-${index}`}
                className="text-sm font-normal"
              >
                {index === 0 ? "Compétence" : `Compétence ${index + 1}`}
              </Label>
              <Input
                id={`competence-${index}`}
                placeholder="Value"
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <Label
                  htmlFor={`niveau-${index}`}
                  className="text-sm font-normal"
                >
                  {index === 0
                    ? "Niveau de maîtrise"
                    : `Niveau de maîtrise ${index + 1}`}
                </Label>
                <Input
                  id={`niveau-${index}`}
                  placeholder={index === 0 ? "1/5" : "5/5"}
                  className="mt-1"
                />
              </div>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index, skills, setSkills)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button onClick={addSkill} variant="outline" className="mt-2 text-sm">
          + Ajouter une compétence
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Langues</h2>
        {languages.map((language, index) => (
          <div key={index} className="mb-2 grid grid-cols-2 gap-4 items-center">
            <div>
              <Label
                htmlFor={`langue-${index}`}
                className="text-sm font-normal"
              >
                {index === 0 ? "Langue" : `Langue ${index + 1}`}
              </Label>
              <Input
                id={`langue-${index}`}
                placeholder={index === 0 ? "Français" : "Français"}
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <Label
                  htmlFor={`niveau-langue-${index}`}
                  className="text-sm font-normal"
                >
                  {index === 0
                    ? "Niveau de maîtrise"
                    : `Niveau de maîtrise ${index + 1}`}
                </Label>
                <Input
                  id={`niveau-langue-${index}`}
                  placeholder={index === 0 ? "Maternelle" : "Maternelle"}
                  className="mt-1"
                />
              </div>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index, languages, setLanguages)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          onClick={addLanguage}
          variant="outline"
          className="mt-2 text-sm"
        >
          + Ajouter une langue
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
          Centres d'intérêt (Optionnel)
        </h2>
        {interests.map((interest, index) => (
          <div key={index} className="mb-2 grid grid-cols-2 gap-4 items-center">
            <Input placeholder="Value" className="mt-1" />
            <div className="flex justify-end">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index, interests, setInterests)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          onClick={addInterest}
          variant="outline"
          className="mt-2 text-sm"
        >
          + Ajouter un centre d'intérêt
        </Button>
      </div>
    </div>
  );
};

export default SkillsLanguagesInterestsForm;
