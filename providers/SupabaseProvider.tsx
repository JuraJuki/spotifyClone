"use client";

import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { FC, ReactNode, useState } from "react";

interface SupabaseProviderProps {
  children: ReactNode;
}

const SupabaseProvider: FC<SupabaseProviderProps> = (props) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>(),
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {props.children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
