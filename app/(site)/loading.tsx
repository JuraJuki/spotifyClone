"use client";

import Box from "@/components/Box";
import { FC } from "react";
import { BounceLoader } from "react-spinners";

export const Loading: FC = () => {
  return (
    <Box className={"h-full flex items-center justify-center"}>
      <BounceLoader color="#22c55f" size={40} />
    </Box>
  );
};

export default Loading;
