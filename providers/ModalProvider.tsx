"use client";
import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal/UploadModal";
import { ProductWithPrice } from "@/types";
import { FC, useEffect, useState } from "react";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const { products } = props;
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
      <SubscribeModal products={products} />
    </>
  );
};
