"use client";
import PlayButton from "@/components/PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { FC } from "react";

interface SongItemProps {
  song: Song;
  onClick: (songId: string) => void;
}
const SongItem: FC<SongItemProps> = (props) => {
  const { song, onClick } = props;
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      className={`
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        gap-x-4
        overflow-hidden
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3`}
    >
      <div
        className={
          "relative aspect-square w-full h-full rounded-md overflow-hidden"
        }
      >
        <Image
          className={"object-cover"}
          src={imagePath || "/images/liked.png"}
          fill={true}
          alt="Like image"
        />
      </div>
      <div className={"flex flex-col items-start w-full pt-4 gap-y-1"}>
        <p className={"font-semibold truncate w-full"}>{song.title}</p>
        <p className={"text-neutral-400 text-sm pb-4 w-full truncate"}>
          By {song.author}
        </p>
      </div>
      <PlayButton />
    </div>
  );
};

export default SongItem;
