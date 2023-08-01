"use client";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal/UploadModal";
import { FC, useEffect, useState } from "react";

export const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // NextJs uses SSR, we must make sure that the component is rendereded before we use modals
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};
