import { useAuthModal } from "@/hooks/useAuthModal";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  return (id: string) => {
    if (!user) return authModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
};

export default useOnPlay;
