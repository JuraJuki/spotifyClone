"use client";
import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import { FC } from "react";

interface MediaItemProps {
  song: Song;
  onClick: (songId: string) => void;
}
const MediaItem: FC<MediaItemProps> = (props) => {
  const { song, onClick } = props;
  const player = usePlayer();

  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) return onClick(song.id);

    return player.setId(song.id);
  };

  return (
    <div
      className={
        "flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/59 w-full py-2 rounded-md"
      }
      onClick={handleClick}
    >
      <div
        className={
          "relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden"
        }
      >
        <Image
          src={imageUrl || "/images/liked.png"}
          alt="song image"
          fill
          className={"object-cover"}
        />
      </div>
      <div className={"flex flex-col gap-y-1 overflow-hidden"}>
        <p className={"text-white truncate"}>{song.title}</p>
        <p className={"text-neutral-400 text-sm truncate"}>{song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
