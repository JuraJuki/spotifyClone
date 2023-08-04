"use client";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { FC } from "react";

interface PageContentProps {
  songs: Song[];
}
export const PageContent: FC<PageContentProps> = (props) => {
  const onPlay = useOnPlay(props.songs);

  if (props.songs.length === 0)
    return <div className={"mt-4 text-neutral-400"}>No songs available</div>;

  return (
    <div
      className={`
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8`}
    >
      {props.songs.map((song) => (
        <SongItem key={song.id} onClick={onPlay} song={song} />
      ))}
    </div>
  );
};
