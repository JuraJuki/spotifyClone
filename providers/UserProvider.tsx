import { MyUserContextProvider } from "@/hooks/useUser";
import { FC, ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: FC<UserProviderProps> = (props) => {
  return <MyUserContextProvider>{props.children}</MyUserContextProvider>;
};
