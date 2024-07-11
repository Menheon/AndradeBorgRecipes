import DeleteIcon from "@/assets/delete.svg?react";
import AddIcon from "@/assets/add.svg?react";
import EditIcon from "@/assets/edit.svg?react";

type IconName = "delete" | "add" | "edit";

const iconMap: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  delete: DeleteIcon,
  add: AddIcon,
  edit: EditIcon,
};

type Props = {
  onClick: () => void;
  icon: IconName;
};

export const IconButton = ({ onClick, icon }: Props) => {
  const IconNode = iconMap[icon];
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
      <IconNode />
    </button>
  );
};
