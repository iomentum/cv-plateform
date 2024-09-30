"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "react-query";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  LoginFormSchema,
  LoginFormSchemaValues,
  loginFormDefaultValues,
} from "@/utils/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/api/auth";
import { toast } from "./ui/use-toast";
import { setAccessToken } from "@/store/acess-token";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  const form = useForm<LoginFormSchemaValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const { mutate } = useMutation(login, {
    onSuccess: (result) => {
      setAccessToken(result.data.accessToken);
      router.push("/templateSelection");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Connexion impossible",
        description:
          "Veuillez vérifier vos informations et réessayer. Si vous continuez à rencontrer des difficultés, veuillez contacter le support technique.",
      });
    },
  });

  const onSubmit = async (data: LoginFormSchemaValues) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-white">Se connecter</h1>
      <p className="text-black">
        Renseigner vos information afin de vous connecter
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nom@exemple.com"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mot de passe"
                    className="bg-background"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Se connecter</Button>
        </form>
      </Form>
      <a href="TKT">Impossible de se connecter ?</a>
    </div>
  );
};
