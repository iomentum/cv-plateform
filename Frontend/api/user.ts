import axiosClient from "@/utils/axios";
import { User } from "@/utils/schema/types";

// Get user profile
export const getMyProfile = (userId: number) =>
  axiosClient().get<User>(`/users/${userId}`);

// Update user profile
export const updateMyProfile = (data: Partial<User>, userId: number) => {
  return axiosClient().put(`/users/${userId}`, data);
};
