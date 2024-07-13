import AccountIcon from "@/assets/account.svg?react";
import CrownIcon from "@/assets/crown.svg?react";
import { TextButton } from "../form-components/TextButton";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "../AppRoutes";
import { useAuth } from "@/store/AuthProvider";

type Props = {
  onNavigateToProfile: () => void;
};

export const AppBarProfileStatus = ({ onNavigateToProfile }: Props) => {
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();

  const handleProfileClick = () => {
    onNavigateToProfile();
    navigate(PROFILE);
  };

  return (
    <div className="flex items-center">
      <TextButton
        onClicked={handleProfileClick}
        size="sm"
        iconNode={
          currentUser?.photoURL ? (
            <div className="relative">
              {isAdmin && (
                <CrownIcon className="absolute -right-3 -top-3 size-5 rotate-45" />
              )}
              <img
                src={currentUser.photoURL}
                alt="profile-pic"
                className="ml-0.5 size-7 rounded-full border-2 border-brown-600"
              />
            </div>
          ) : (
            <AccountIcon className="ml-0.5 size-7" />
          )
        }
      >
        {currentUser ? currentUser.displayName?.split(" ")[0] : texts.signIn}
      </TextButton>
    </div>
  );
};

const texts = {
  signIn: "Sign In",
};
