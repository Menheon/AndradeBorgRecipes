import AccountIcon from "@/assets/account.svg?react";
import { TextButton } from "../form-components/TextButton";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "../AppRoutes";

type Props = {
  onNavigateToProfile: () => void;
};

export const AppBarProfileStatus = ({ onNavigateToProfile }: Props) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    onNavigateToProfile();
    navigate(PROFILE);
  };

  return (
    <div className="flex items-center gap-2">
      <TextButton
        onClicked={handleProfileClick}
        size="sm"
        iconNode={<AccountIcon className="size-6" />}
      >
        {texts.profile}
      </TextButton>
    </div>
  );
};

const texts = {
  profile: "Profile",
};
