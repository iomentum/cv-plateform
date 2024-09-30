import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginFormSchemaValues = z.infer<typeof LoginFormSchema>;

export const loginFormDefaultValues: LoginFormSchemaValues = {
  email: "",
  password: "",
};

export const RegisterFormSchema = z.object({
  email: z
    .string()
    .email("Adresse email invalide")
    .min(1, "L'email est requis"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  name: z.string().min(1, "Le nom est requis"),
  surname: z.string().min(1, "Le prénom est requis"),
  city: z.string().min(1, "La ville est requise"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Le numéro de téléphone doit contenir 10 chiffres"),
  domain: z.string().min(1, "Le domaine est requis"),
  profilePicture: z.instanceof(File).optional(),
});

export type RegisterFormSchemaValues = z.infer<typeof RegisterFormSchema>;

export const registerFormDefaultValues: RegisterFormSchemaValues = {
  email: "",
  password: "",
  name: "",
  surname: "",
  city: "",
  phoneNumber: "",
  domain: "",
  profilePicture: undefined,
};
export const cvSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  link: z.string().url(),
});

export const updateProfileFormSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  city: z.string(),
  phoneNumber: z.string(),
  domain: z.string(),
});

export type UpdateProfileFormSchemaValues = z.infer<
  typeof updateProfileFormSchema
>;
