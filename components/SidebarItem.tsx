import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}
export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { icon: Icon, label, active, href } = props;

  return (
    <Link
      href={href}
      className={twMerge(
        `flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-white
        text-neutral-400
        py-1`,
        active && "text-white",
      )}
    >
      <Icon size={26} />
      <p className={"truncate w-full"}>{label}</p>
    </Link>
  );
};
