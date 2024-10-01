"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import cv1 from "@/assets/cv1.png";
import cv2 from "@/assets/cv2.png";
import cv3 from "@/assets/cv3.png";
import cv4 from "@/assets/cv4.png";
import { $selectedTemplate } from "@/store/selectedTemplate";

type TemplateId = 1 | 2 | 3 | 4;

const imageMap: Record<TemplateId, StaticImageData> = {
  1: cv1,
  2: cv2,
  3: cv3,
  4: cv4,
};

const GeneratedCv: React.FC = () => {
  const selectedTemplateId = $selectedTemplate.get()?.id;

  const isValidTemplateId = (id: number | undefined): id is TemplateId =>
    id !== undefined && id in imageMap;

  const selectedImage = isValidTemplateId(selectedTemplateId)
    ? imageMap[selectedTemplateId]
    : cv1;
  const handleClick = () => console.log(selectedTemplateId);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full h-full">
        <Image
          onClick={handleClick}
          src={selectedImage}
          alt="Selected CV Template"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
};

export default GeneratedCv;
