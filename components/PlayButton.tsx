import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className={`
      transition
      opacity-0
      rounded-full
      flex
      items-center
      bg-green-500
      p-4
      right-0
      absolute
      drop-shadow-md
      -translate-x-5
      translate-y-20
      group-hover:opacity-100
      group-hover:translate-y-2
      hover:scale-110`}
    >
      <FaPlay />
    </button>
  );
};

export default PlayButton;
