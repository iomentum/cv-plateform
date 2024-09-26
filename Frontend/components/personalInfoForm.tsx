import React from "react";
import { Button } from "@/components/ui/button";
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

export const PersonalInfoForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logique de soumission du formulaire
    console.log("Formulaire soumis");
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
            <Input id="nom" placeholder="Value" />
          </div>
          <div>
            <Label htmlFor="photo">Photo</Label>
            <Input id="photo" placeholder="Sélectionner une photo" />
          </div>
          <div>
            <Label htmlFor="telephone">Numéro de téléphone</Label>
            <Input id="telephone" placeholder="Value" />
          </div>
          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input id="email" placeholder="Value" />
          </div>
          <div>
            <Label htmlFor="naissance">Date de naissance</Label>
            <Input id="naissance" placeholder="Value" />
          </div>
          <div>
            <Label htmlFor="adresse">Adresse postale</Label>
            <Input id="adresse" placeholder="Value" />
          </div>
          <div>
            <Label htmlFor="permis">Type de permis obtenu (optionnel)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="permis A,B,C" />
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
            <Input id="linkedin" placeholder="Value" />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="presentation">
            Paragraphe présentant vos objectifs et compétences clés
          </Label>
          <Textarea id="presentation" placeholder="Value" className="h-24" />
        </div>

        <EducationExperienceForm />

        <SkillsLanguagesInterestsForm />
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="px-8">
          Générer le CV
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
