"use client";

import { getMyProfile } from "@/api/user";
import Profile from "@/components/profile";
import { useEffect } from "react";
import { profileStore, setUser } from "@/store/profile";

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

  useEffect(() => {
    getMyProfile(userId)
      .then((userData) => (setUser(userData.data), console.log(userData)))
      .catch((error) => console.error("Failed to get user:", error));
  }, [user, userId]);

  return <Profile data={user} cvList={cvList} />;
};
export default ProfilePage;
