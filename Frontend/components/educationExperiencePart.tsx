/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const EducationExperienceForm = () => {
  const [formations, setFormations] = useState([{}]);
  const [experiences, setExperiences] = useState([{}]);

  const addFormation = () => {
    setFormations([...formations, {}]);
  };

  const addExperience = () => {
    setExperiences([...experiences, {}]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Formations</h2>
        {formations.map((formation, index) => (
          <div key={index} className="mb-4 space-y-2">
            <div>
              <Label
                htmlFor={`diplome-${index}`}
                className="text-sm font-normal"
              >
                Diplôme obtenu
              </Label>
              <Input
                id={`diplome-${index}`}
                placeholder="Value"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor={`etablissement-${index}`}
                  className="text-sm font-normal"
                >
                  Établissement
                </Label>
                <Input
                  id={`etablissement-${index}`}
                  placeholder="Value"
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor={`annee-${index}`}
                  className="text-sm font-normal"
                >
                  Année d'obtention
                </Label>
                <Input
                  id={`annee-${index}`}
                  placeholder="Value"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={addFormation}
          variant="outline"
          className="mt-2 text-sm"
        >
          + Ajouter une formation
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
          Expériences professionnelles
        </h2>
        {experiences.map((experience, index) => (
          <div key={index} className="mb-4 space-y-2">
            <div>
              <Label htmlFor={`poste-${index}`} className="text-sm font-normal">
                Titre du poste
              </Label>
              <Input
                id={`poste-${index}`}
                placeholder="Value"
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor={`entreprise-${index}`}
                className="text-sm font-normal"
              >
                Nom de l'entreprise
              </Label>
              <Input
                id={`entreprise-${index}`}
                placeholder="Value"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <Label
                  htmlFor={`debut-${index}`}
                  className="text-sm font-normal"
                >
                  Date de début
                </Label>
                <Input
                  id={`debut-${index}`}
                  placeholder="Sept 2023"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-grow">
                  <Label
                    htmlFor={`fin-${index}`}
                    className="text-sm font-normal"
                  >
                    Date de fin
                  </Label>
                  <Input
                    id={`fin-${index}`}
                    placeholder="Dec 2024"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id={`en-cours-${index}`} />
                  <Label
                    htmlFor={`en-cours-${index}`}
                    className="text-sm font-normal"
                  >
                    En cours
                  </Label>
                </div>
              </div>
            </div>
            <div>
              <Label
                htmlFor={`competences-${index}`}
                className="text-sm font-normal"
              >
                Liste de compétences techniques et professionnelles
              </Label>
              <Textarea
                id={`competences-${index}`}
                placeholder="Value"
                className="mt-1"
              />
            </div>
          </div>
        ))}
        <Button
          onClick={addExperience}
          variant="outline"
          className="mt-2 text-sm"
        >
          + Ajouter un poste
        </Button>
      </div>
    </div>
  );
};

export default EducationExperienceForm;
