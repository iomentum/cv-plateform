"use client";

import { getMyProfile, getUserResumes } from "@/api/user";
import Profile from "@/components/profile";
import { profileStore, setUser } from "@/store/profile";
import { useQuery } from "react-query";

const cvList = [
  {
    id: "1",
    title: "CV Développeur Web",
    createdAt: "2023-01-15",
    link: "https://example.com/cv1.pdf",
  },
  {
    id: "2",
    title: "CV Ingénieur Logiciel",
    createdAt: "2023-03-20",
    link: "https://example.com/cv2.pdf",
  },
];

const ProfilePage = () => {
  const userId = profileStore.get().userId;
  const user = profileStore.get().user;

  const {
    data: resumes,
    isLoading,
    isError,
  } = useQuery(["userResumes", userId], () => getUserResumes(userId), {
    enabled: !!userId,
  });

  const {
    data: userData,
    isLoading: isLoad,
    isError: isErr,
    error,
  } = useQuery(["userProfile", userId], () => getMyProfile(userId), {
    enabled: !!userId,
    onSuccess: (data) => {
      setUser(data.data);
      console.log(data);
    },
    onError: (error) => {
      console.error("Failed to get user:", error);
    },
  });

  return <Profile data={userData?.data} cvList={resumes?.data} />;
};
export default ProfilePage;
