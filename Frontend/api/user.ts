import axiosClient from "@/utils/axios";
import { CV, User } from "@/utils/schema/types";

// Get user profile
export const getMyProfile = (userId: number) =>
  axiosClient().get<User>(`/users/${userId}`);

// Update user profile
export const updateMyProfile = (data: Partial<User>, userId: number) => {
  return axiosClient().put(`/users/${userId}`, data);
};

export const getUserResumes = (userId: number) =>
  axiosClient().get<CV[]>(`/users/${userId}/resumes`);

export const addUserResume = (userId: number, resumeFile: File) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);

  return axiosClient().post<CV>(`/users/${userId}/resumes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
