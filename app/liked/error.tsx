"use client";

import Box from "@/components/Box";
import { FC } from "react";

export const Error: FC = () => {
  return (
    <Box className={"h-full flex items-center justify-center"}>
      <div className={"text-neutral-400"}>Something went wrong!</div>
    </Box>
  );
};

export default Error;
