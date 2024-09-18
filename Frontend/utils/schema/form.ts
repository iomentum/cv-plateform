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
