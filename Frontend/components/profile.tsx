"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CVList from "./cvList";
import { CV, User } from "@/utils/schema/types";
import { profileStore, setIsEditing } from "@/store/profile";
import { useStore } from "@nanostores/react";
import { useMutation, useQueryClient } from "react-query";
import { updateMyProfile } from "@/api/user";
import { toast } from "./ui/use-toast";
import { logout } from "@/store/acess-token";
import ProfileForm from "./profileForm";

interface ProfileProps {
  data: User;
  cvList: CV[];
}

const Profile = ({ data, cvList }: ProfileProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const profile = useStore(profileStore);

  const { mutate } = useMutation(
    (data: Partial<User>) => updateMyProfile(data, profile.userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
        toast({
          title: "Votre profil a été mis à jour",
          description: "Vos informations ont été mises à jour avec succès.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Echec de la mise à jour de votre profil",
          description:
            "Veuillez réessayer plus tard. Si le problème persiste, contactez le support.",
        });
      },
    }
  );

  const handleLogout = () => {
    console.log("Déconnexion");
    logout();
    localStorage.removeItem("jobbiAccessToken");
    router.push("/");
  };

  const handleSave = () => {
    mutate(profile.user);
  };

  return (
    <main className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="mt-4 text-2xl font-bold">
            {data.name} {data.surname}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.isEditing ? (
            <ProfileForm profile={data} />
          ) : (
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Domaine:</strong> {data.domain}
              </p>
              <p>
                <strong>Ville:</strong> {data.city}
              </p>
              <p>
                <strong>Téléphone:</strong> {data.phoneNumber}
              </p>
              <div className="mt-6 flex gap-2">
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Modifier le profil
                </Button>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  className="flex-1"
                >
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Déconnexion
          </Button>
        </CardFooter>
      </Card>

      <CVList cvs={cvList} />
    </main>
  );
};

export default Profile;
