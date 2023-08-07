import { useAuthModal } from "@/hooks/useAuthModal";
import usePlayer from "@/hooks/usePlayer";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  return (id: string) => {
    if (!user) return authModal.onOpen();
    if (!subscription) return subscribeModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
};

export default useOnPlay;
