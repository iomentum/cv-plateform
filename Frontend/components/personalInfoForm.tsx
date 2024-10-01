"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EducationExperienceForm from "./educationExperiencePart";
import SkillsLanguagesInterestsForm from "./Skills";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { generateResume } from "@/api/upload";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const zodSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    postalAddress: z.string().optional(),
    dateOfBirth: z.string().optional(),
    drivingLicenseType: z.string().optional(),
    linkedinUrl: z.string().optional(),
  }),
  education: z.array(
    z.object({
      degree: z.string().min(1, "Le diplôme est requis").optional(),
      institution: z.string().min(1, "L'établissement est requis").optional(),
      yearObtained: z
        .string()
        .min(1, "L'année d'obtention est requise")
        .optional(),
    })
  ),
  interests: z.array(z.object({ interest: z.string() })),
  experiences: z.array(
    z.object({
      jobTitle: z.string().min(1, "Le titre du poste est requis").optional(),
      companyName: z
        .string()
        .min(1, "Le nom de l'entreprise est requis")
        .optional(),
      startDate: z.string().min(1, "La date de début est requise").optional(),
      endDate: z.string().min(1, "La date de fin est requise").optional(),
      technicalSkills: z
        .string()
        .min(1, "Les compétences techniques sont requises")
        .optional(),
    })
  ),
  skills: z.array(
    z.object({
      skill: z.string().optional(),
      proficiencyLevel: z.coerce.number().optional(),
    })
  ),
  languages: z.array(
    z.object({
      language: z.string().optional(),
      proficiencyLevel: z.coerce.number().optional(),
    })
  ),
});

export type GenerateResumeFormSchema = z.infer<typeof zodSchema>;

export const PersonalInfoForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<GenerateResumeFormSchema>({
    resolver: zodResolver(zodSchema),
  });

  const { mutate } = useMutation(generateResume, {
    onSuccess: async (response) => {
      window.open(URL.createObjectURL(response.data));
    },
    // onError: () => {
    //   toast({
    //     variant: "destructive",
    //     title: "Connexion impossible",
    //     description:
    //       "Veuillez vérifier vos informations et réessayer. Si vous continuez à rencontrer des difficultés, veuillez contacter le support technique.",
    //   });
    // },
  });

  const handleSubmit = (formData: GenerateResumeFormSchema) => {
    // mutate({
    //   data: {
    //     ...formData,
    //     interests: formData.interests.map((obj) => obj.interest),
    //   },
    //   selectedColor: "purple-rose", // FIXME: unmock
    //   templateId: 1, // FIXME: unmock
    // });
    router.push("/generatedCV");
  };

  console.error(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-center mt-10">
          Dites nous en plus sur vous !
        </h2>

        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
            Informations personnelles
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="personalInfo.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Complet</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre nom complet" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <div> */}
            {/* TODO: Plug les photos */}
            {/* <Label htmlFor="photo">Photo</Label>
              <Input id="photo" accept="image/*" />
            </div> */}

            <FormField
              control={form.control}
              name="personalInfo.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre numéro de téléphone" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse e-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre adresse e-mail" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalInfo.dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre date de naissance" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalInfo.postalAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse postale</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre Adresse postale" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.drivingLicenseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permis de conduire</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type de permis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Permis A (moto)</SelectItem>
                        <SelectItem value="A1">
                          Permis A1 (petite moto)
                        </SelectItem>
                        <SelectItem value="A2">
                          Permis A2 (moto intermédiaire)
                        </SelectItem>
                        <SelectItem value="B">Permis B (voiture)</SelectItem>
                        <SelectItem value="BVA">
                          Permis BVA (voiture automatique)
                        </SelectItem>
                        <SelectItem value="C">
                          Permis C (poids lourd)
                        </SelectItem>
                        <SelectItem value="C1">
                          Permis C1 (poids lourd léger)
                        </SelectItem>
                        <SelectItem value="D">
                          Permis D (transport de personnes)
                        </SelectItem>
                        <SelectItem value="D1">
                          Permis D1 (transport de personnes léger)
                        </SelectItem>
                        <SelectItem value="BE">
                          Permis BE (voiture avec remorque)
                        </SelectItem>
                        <SelectItem value="C1E">
                          Permis C1E (poids lourd léger avec remorque)
                        </SelectItem>
                        <SelectItem value="CE">
                          Permis CE (poids lourd avec remorque)
                        </SelectItem>
                        <SelectItem value="D1E">
                          Permis D1E (transport de personnes léger avec
                          remorque)
                        </SelectItem>
                        <SelectItem value="DE">
                          Permis DE (transport de personnes avec remorque)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalInfo.linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lien vers le profil LinkedIn (optionnel)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="URL de votre profil LinkedIn"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <EducationExperienceForm />

          <SkillsLanguagesInterestsForm />
        </div>

        <div className="flex justify-center">
          <Button type="submit">Générez le CV</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
