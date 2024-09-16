import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-white">Se connecter</h1>
      <p className="text-gray-200">
        Renseigner vos information afin de vous connecter
      </p>
      <Input placeholder="Email" />
      <Input placeholder="Mot de passe" />
      <Button>Se connecter</Button>
      <a href="TKT">Impossible de se connecter ?</a>
    </div>
  );
};
