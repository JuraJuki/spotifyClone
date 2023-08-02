"use client";
import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import { FC } from "react";

interface SearchContentProps {
  songs: Song[];
}
export const SearchContent: FC<SearchContentProps> = (props) => {
  const { songs } = props;

  if (!songs.length)
    return (
      <div className={"flex flex-col gap-y-2 w-full px-6 text-neutral-400"}>
        No songs found.
      </div>
    );

  return (
    <div className={"flex flex-col gap-y-2 w-full px-6"}>
      {songs.map((song) => (
        <div key={song.id} className={"flex items-center gap-x-4 w-full"}>
          <div className={"flex-1"}>
            <MediaItem song={song} onClick={() => {}} />
          </div>
          {/* Todo: Add a like Button here */}
        </div>
      ))}
    </div>
  );
};
