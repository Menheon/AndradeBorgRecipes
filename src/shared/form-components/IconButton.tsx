import DeleteIcon from "@/assets/delete.svg?react";
import AddIcon from "@/assets/add.svg?react";
import EditIcon from "@/assets/edit.svg?react";
import ChevronLeftIcon from "@/assets/chevron-left.svg?react";
import CloseIcon from "@/assets/close.svg?react";

type IconName = "delete" | "add" | "edit" | "chevron-left" | "close";

const iconMap: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  delete: DeleteIcon,
  add: AddIcon,
  edit: EditIcon,
  "chevron-left": ChevronLeftIcon,
  close: CloseIcon,
};

type Props = {
  onClick: () => void;
  icon: IconName;
  size?: "sm" | "md" | "lg";
};

export const IconButton = ({ onClick, icon, size = "md" }: Props) => {
  const IconNode = iconMap[icon];

  const getSize = () => {
    let className = "";
    switch (size) {
      case "sm":
        className = "size-4";
        break;
      case "md":
        className = "size-6";
        break;
      case "lg":
        className = "size-8";
        break;
    }
    return className;
  };

  return (
    <button
      onClick={onClick}
      className="
        focus-visible:base-outline
        rounded-full
        p-1
        text-brown-600
        transition
        hover:text-brown-500"
    >
      <IconNode className={getSize()} />
    </button>
  );
};
