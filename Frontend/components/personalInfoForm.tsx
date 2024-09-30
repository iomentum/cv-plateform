import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EducationExperienceForm from "./educationExperiencePart";
import SkillsLanguagesInterestsForm from "./Skills";
import { PrintButton } from "./printbutton";
import { useStore } from "@nanostores/react";
import { $formData, updatePersonalInfo } from "@/store/resumeForm";
import { $selectedTemplate } from "@/store/selectedTemplate";

export const PersonalInfoForm: React.FC = () => {
  const formData = useStore($formData);
  const selectedTemplate = useStore($selectedTemplate);

  console.log(selectedTemplate);
  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    updatePersonalInfo({ [id]: value });
  };

  const handlePermisChange = (value: string) => {
    updatePersonalInfo({ drivingLicenseType: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Formulaire soumis", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Dites nous en plus sur vous !</h2>

      <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
          Informations personnelles
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nom">Nom Complet</Label>
            <Input
              id="name"
              onChange={handlePersonalInfoChange}
              placeholder="Votre nom complet"
            />
          </div>
          <div>
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              onChange={handlePersonalInfoChange}
              accept="image/*"
            />
          </div>
          <div>
            <Label htmlFor="telephone">Numéro de téléphone</Label>
            <Input
              id="telephone"
              onChange={handlePersonalInfoChange}
              placeholder="Votre numéro de téléphone"
            />
          </div>
          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              onChange={handlePersonalInfoChange}
              placeholder="Votre adresse e-mail"
            />
          </div>
          <div>
            <Label htmlFor="naissance">Date de naissance</Label>
            <Input
              id="naissance"
              type="date"
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div>
            <Label htmlFor="adresse">Adresse postale</Label>
            <Input
              id="adresse"
              onChange={handlePersonalInfoChange}
              placeholder="Votre adresse postale"
            />
          </div>
          <div>
            <Label htmlFor="permis">Type de permis obtenu (optionnel)</Label>
            <Select onValueChange={handlePermisChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type de permis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Permis A</SelectItem>
                <SelectItem value="b">Permis B</SelectItem>
                <SelectItem value="c">Permis C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="linkedin">
              Lien vers le profil LinkedIn (optionnel)
            </Label>
            <Input
              id="linkedin"
              onChange={handlePersonalInfoChange}
              placeholder="URL de votre profil LinkedIn"
            />
          </div>
        </div>

        <EducationExperienceForm />

        <SkillsLanguagesInterestsForm />
      </div>
      <div className="flex justify-center">
        <PrintButton
          values={{
            data: formData,
            selectedColor: selectedTemplate && selectedTemplate.selectedColor,
            templateId: selectedTemplate?.id ?? 1
          }}
        />
      </div>
    </form>
  );
};

export default PersonalInfoForm;
