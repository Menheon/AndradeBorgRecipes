import DeleteIcon from "@/assets/delete.svg?react";
import AddIcon from "@/assets/add.svg?react";
import EditIcon from "@/assets/edit.svg?react";
import ChevronLeft from "@/assets/chevron-left.svg?react";

type IconName = "delete" | "add" | "edit" | "chevron-left";

const iconMap: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  delete: DeleteIcon,
  add: AddIcon,
  edit: EditIcon,
  "chevron-left": ChevronLeft,
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
        rounded-full
        p-1
        text-brown-600
        transition
        hover:text-brown-500
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brown-600"
    >
      <IconNode className={getSize()} />
    </button>
  );
};
