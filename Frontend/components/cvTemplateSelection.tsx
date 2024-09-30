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
  const templatesModern1 = [
    { id: 1, selectedColor: "grayScale", image: bender },
    { id: 2, selectedColor: "blueShades", image: bender },
    { id: 3, selectedColor: "earthTones", image: bender },
    { id: 4, selectedColor: "mintFresh", image: bender },
    { id: 5, selectedColor: "purpleHaze", image: bender },
    { id: 6, selectedColor: "sunsetOrange", image: bender },
    { id: 7, selectedColor: "oceanBreeze", image: bender },
    { id: 8, selectedColor: "roseGold", image: bender },
  ]
  const templatesModern2 = [
    { id: 9, selectedColor: "purple-rose", image: bender },
    { id: 10, selectedColor: "blue-teal", image: bender },
    { id: 11, selectedColor: "orange-yellow", image: bender },
    { id: 12, selectedColor: "green-lime", image: bender },
  ];

  const templatesModern3 = [
    { id: 13, selectedColor: "greenGold", image: bender },
    { id: 14, selectedColor: "navyBlue", image: bender },
    { id: 15, selectedColor: "burgundy", image: bender },
    { id: 16, selectedColor: "charcoal", image: bender },
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
        Modernes et minimalistes
      </h2>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {templatesModern1.map((template) => (
            <div
              key={template.id}
              className={`
              bg-white rounded-lg overflow-hidden shadow-md 
              transition-all duration-300 cursor-pointer
              ${selectedTemplate?.id === template.id
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
      </div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Colorés et créatifs
      </h2>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {templatesModern2.map((template) => (
            <div
              key={template.id}
              className={`
              bg-white rounded-lg overflow-hidden shadow-md 
              transition-all duration-300 cursor-pointer
              ${selectedTemplate?.id === template.id
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
      </div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Professionels et élégants
      </h2>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {templatesModern3.map((template) => (
            <div
              key={template.id}
              className={`
              bg-white rounded-lg overflow-hidden shadow-md 
              transition-all duration-300 cursor-pointer
              ${selectedTemplate?.id === template.id
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
  );
};

export default CVTemplateShowcase;
