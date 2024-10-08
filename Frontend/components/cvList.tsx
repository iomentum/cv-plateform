import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { $accessToken } from "@/store/acess-token";
import { API_URL } from "@/utils/axios";

interface CV {
  id: string;
  title: string;
  createdAt: string;
  link: string;
}

interface CVListProps {
  cvs: CV[] | undefined;
  title?: string;
}
const CVList = ({ cvs, title = "Mes CV" }: CVListProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {cvs &&
            cvs.map((cv) => (
              <Card key={cv.id} className="w-[250px] flex-shrink-0">
                <CardHeader>
                  <CardTitle className="truncate">{cv.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Créé le : {new Date(cv.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link
                      target="_blank"
                      href={`${API_URL}/resumes/${
                        cv.id
                      }?token=${$accessToken.get()}`}
                    >
                      Voir le CV
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CVList;
