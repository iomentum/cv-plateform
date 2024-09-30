"use client";

import HomePage from "@/components/home";

export type Upload = {
  selectedFile: File;
  userId: string;
};

export default function Home() {
  return <HomePage />;
}
