import { MyUserContextProvider } from "@/hooks/useUser";
import { FC, ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}
const UserProvider: FC<UserProviderProps> = (props) => {
  return <MyUserContextProvider>{props.children}</MyUserContextProvider>;
};

export default UserProvider
