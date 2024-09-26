import axios from "axios";

interface UploadData {
  selectedFile: File;
  userId: string;
}

export const uploadResume = async (data: UploadData) => {
  const formData = new FormData();
  formData.append("pdf", data.selectedFile);

  try {
    const response = await axios.post<UploadResponse>(
      `/users/${data.userId}/pdfs`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Téléchargement réussi:", response);
    return response.data;
  } catch (error: any) {
    console.error(
      "Échec du téléchargement:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

interface UploadResponse {
  // Définissez ici la structure de la réponse de votre API
  message: string;
  fileUrl?: string;
}
