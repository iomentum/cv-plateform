"use client";

import { uploadResume } from "@/api/upload";

import HomePage from "@/components/home";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useMutation } from "react-query";

export type Upload = {
  selectedFile: File;
  userId: string;
};

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const userId = "1";
  const data = { selectedFile, userId };
  const { mutate } = useMutation(uploadResume, {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading the file. Please try again.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Upload successful",
        description: "Your resume has been uploaded successfully!",
      });
    },
  });

  // const onSubmit = async (data: Upload) => {
  //   mutate(data);
  //   console.log("data");
  // };
  return (
    <main>
      <div className="flex justify-center items-center min-h-screen ">
        <HomePage />
      </div>
    </main>
  );
}
