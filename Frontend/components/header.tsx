/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { $accessToken, logout } from "@/store/acess-token";

export const Header = () => {
  const token = $accessToken.get();
  const pathname = usePathname();
  const hideCreateButton = ["/templateSelection", "/form"].includes(pathname);

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b shadow-sm">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center  cursor-pointer ">
            <Link href="/" passHref legacyBehavior>
              <Image
                src="/logo.svg"
                alt="Jobbi Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          {!hideCreateButton && (
            <Link
              href={token ? "/templateSelection" : "/auth"}
              passHref
              legacyBehavior
            >
              <Button variant="ghost" className="mx-4">
                Créer votre CV
              </Button>
            </Link>
          )}
          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link href="/profile" passHref legacyBehavior>
                  <Button variant="outline">Profil</Button>
                </Link>
                <Link href="/" passHref legacyBehavior>
                  <Button onClick={logout}>Déconnexion</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth" passHref legacyBehavior>
                  <Button variant="outline" asChild>
                    <a>Connexion</a>
                  </Button>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Button asChild>
                    <a>S'inscrire</a>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
