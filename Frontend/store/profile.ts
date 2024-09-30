import { CV, User } from "@/utils/schema/types";
import { persistentAtom } from "@nanostores/persistent";

export type Profile = {
  isEditing: boolean;
  userId: number;
  user: User;
  cvList: CV[];
};

const initialProfile: Profile = {
  isEditing: false,
  userId: 0,
  user: {
    email: "user@example.com",
    name: "Dupont",
    surname: "Jean",
    city: "Paris",
    phoneNumber: "0123456789",
    domain: "https://example.com",
  },
  cvList: [
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
  ],
};

export const profileStore = persistentAtom<Profile>("profile", initialProfile, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Fonctions utilitaires pour interagir avec le store
export const setIsEditing = (isEditing: boolean) => {
  profileStore.set({ ...profileStore.get(), isEditing });
};

export const toggleIsEditing = () => {
  const currentProfile = profileStore.get();
  profileStore.set({ ...currentProfile, isEditing: !currentProfile.isEditing });
};

export const resetProfile = () => {
  profileStore.set(initialProfile);
};

export const setUserId = (userId: number) => {
  profileStore.set({ ...profileStore.get(), userId });
};

export const setUser = (user: User) => {
  profileStore.set({ ...profileStore.get(), user });
};
