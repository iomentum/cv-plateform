/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  $accessToken,
  $isAuthenticated,
  setAccessToken,
} from "@/store/acess-token";
import LoadingWheel from "./loadingWheel";
import { useRouter } from "next/navigation";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useStore($isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }

    const unsubscribe = $accessToken.listen((value) => {
      if (value) {
        sessionStorage.setItem("accessToken", value);
      } else {
        sessionStorage.removeItem("accessToken");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isMounted) {
      const isPrivateRoute = ["/", "/profile", "/templateSelection"].includes(
        window.location.pathname
      );

      if (!isAuthenticated && isPrivateRoute) {
        router.push("/auth");
      }
    }
  }, [isAuthenticated, isMounted]);

  if (!isMounted) {
    return <LoadingWheel />;
  }

  return <>{children}</>;
};
