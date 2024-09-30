import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { GenerateResumeFormSchema } from "./personalInfoForm";

const EducationExperienceForm = () => {
  const form = useFormContext<GenerateResumeFormSchema>();

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  return (
    <Form {...form}>
      <div className="space-y-8">
        <h3 className="text-lg font-semibold mb-4">Formation</h3>
        {educationFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <FormField
                control={form.control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diplôme obtenu</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Diplôme obtenu" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Établissement</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Établissement" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name={`education.${index}.yearObtained`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Année d&apos;obtention</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Année d'obtention" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                onClick={() => removeEducation(index)}
                variant="ghost"
                size="icon"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendEducation({ degree: "", institution: "", yearObtained: "" })
          }
        >
          Ajouter une formation
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Expériences professionnelles
        </h3>

        {experienceFields.map((experience, index) => (
          <div key={experience.id} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <FormField
                control={form.control}
                name={`experiences.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du poste</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Titre du poste" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.companyName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l&apos;entreprise</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom de l'entreprise" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Date de début" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Date de fin" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`experiences.${index}.technicalSkills`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Compétences techniques et professionnelles
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Compétences techniques et professionnelles"
                      className="mb-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => removeExperience(index)}
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendExperience({
              jobTitle: "",
              companyName: "",
              startDate: "",
              endDate: "",
              technicalSkills: "",
            })
          }
        >
          Ajouter une expérience
        </Button>
      </div>
    </Form>
  );
};

export default EducationExperienceForm;
