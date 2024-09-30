"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import bender from "@/assets/bender.jpg";
import { useRouter } from "next/navigation";
import {
  $selectedTemplate,
  SelectedTemplate,
  setSelectedTemplate,
} from "@/store/selectedTemplate";
import { useStore } from "@nanostores/react";

export const CVTemplateShowcase = () => {
  const router = useRouter();
  const selectedTemplate = useStore($selectedTemplate);
  const templates = [
    { id: 1, selectedColor: "purple-rose", image: bender },
    { id: 2, selectedColor: "blue-teal", image: bender },
    { id: 3, selectedColor: "orange-yellow", image: bender },
    { id: 4, selectedColor: "green-lime", image: bender },
  ];

  const handleCardClick = (template: SelectedTemplate) => {
    setSelectedTemplate(template);
  };

  const handleSelection = () => {
    if (selectedTemplate?.id) {
      console.log(`Template ${selectedTemplate.id} sélectionné`);
      router.push("/form");
    } else {
      alert("Veuillez sélectionner un template");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Professionnel et élégant
      </h2>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
              bg-white rounded-lg overflow-hidden shadow-md 
              transition-all duration-300 cursor-pointer
              ${
                selectedTemplate?.id === template.id
                  ? "ring-4 ring-blue-500 shadow-xl scale-105"
                  : "hover:shadow-xl hover:scale-102"
              }
            `}
              onClick={() => handleCardClick(template)}
            >
              <Image
                src={template.image}
                alt={`Template ${template.selectedColor}`}
                width={150}
                height={200}
                layout="responsive"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleSelection}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
          disabled={!selectedTemplate}
        >
          {selectedTemplate
            ? "Sélectionner ce template"
            : "Veuillez choisir un template"}
        </Button>
      </div>
    </div>
  );
};

export default CVTemplateShowcase;
