import DeleteIcon from "@/assets/delete.svg?react";

type Props = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="
        rounded-full
        p-1
        text-brown-600
        transition
        hover:text-brown-500
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brown-600"
    >
      <DeleteIcon />
    </button>
  );
};
