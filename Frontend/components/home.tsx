import React from "react";
import { ArrowRight, FileText, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { $accessToken } from "@/store/acess-token";

const HomePage = () => {
  const token = $accessToken.get();

  return (
    <main className="pt-20 sm:pt-24 lg:pt-32">
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl">
            Gérez vos CV comme un pro
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-muted-foreground">
            Créez, partagez et suivez vos CVs en toute simplicité avec Jobbi.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={token ? "/templateSelection" : "/auth"}>
              <Button size="lg">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Création de CV</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Créez des CVs professionnels en quelques clics
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Partage facile</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Partagez vos CVs avec des recruteurs en un clic
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
