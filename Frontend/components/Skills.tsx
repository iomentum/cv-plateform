/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { useFieldArray, useFormContext } from "react-hook-form";
import { GenerateResumeFormSchema } from "./personalInfoForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const SkillsLanguagesInterestsForm = () => {
  const form = useFormContext<GenerateResumeFormSchema>();

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const {
    fields: languagesFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const {
    fields: interestsFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({
    control: form.control,
    name: "interests",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Compétences</h3>

        {skillsFields.map((skill, index) => (
          <div key={skill.id} className="flex items-center space-x-2 mb-2">
            <FormField
              control={form.control}
              name={`skills.${index}.skill`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compétence</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Compétence" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`skills.${index}.proficiencyLevel`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Niveau (1-5)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              onClick={() => removeSkill(index)}
              variant="ghost"
              size="icon"
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => appendSkill({ skill: "", proficiencyLevel: 1 })}
        >
          Ajouter une compétence
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Langues</h3>

        {languagesFields.map((language, index) => (
          <div key={language.id} className="flex items-center space-x-2 mb-2">
            <FormField
              control={form.control}
              name={`languages.${index}.language`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Langue</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Langue" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`languages.${index}.proficiencyLevel`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de maîtrise</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Niveau (1-5)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              onClick={() => removeLanguage(index)}
              variant="ghost"
              size="icon"
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => appendLanguage({ language: "", proficiencyLevel: 0 })}
        >
          Ajouter une langue
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Centres d'intérêt</h3>

        {interestsFields.map((interest, index) => (
          <div key={interest.id} className="flex items-center space-x-2 mb-2">
            <FormField
              control={form.control}
              name={`interests.${index}.interest`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centre d'intérêt</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre centre d'intérêt" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              onClick={() => removeInterest(index)}
              variant="ghost"
              size="icon"
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="button" onClick={() => appendInterest({ interest: "" })}>
          Ajouter un centre d'intérêt
        </Button>
      </div>
    </div>
  );
};

export default SkillsLanguagesInterestsForm;
