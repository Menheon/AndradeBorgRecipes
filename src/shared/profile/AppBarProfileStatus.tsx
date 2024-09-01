import AccountIcon from "@/assets/account.svg?react";
import CrownIcon from "@/assets/crown.svg?react";
import { TextButton } from "../form-components/TextButton";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "../AppRoutes";
import { useAuth } from "@/store/AuthProvider";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onNavigateToProfile: () => void;
};

export const AppBarProfileStatus = ({ onNavigateToProfile }: Props) => {
  const navigate = useNavigate();
  const { storedUserData, googleUserData } = useAuth();

  const handleProfileClick = () => {
    onNavigateToProfile();
    navigate(PROFILE);
  };

  const { t, i18n } = useTranslation();
  const appBarTranslations = useMemo(
    () => translations[i18n.language as PlatformSupportedLanguages].navigation,
    [i18n.language],
  );

  return (
    <div className="flex items-center">
      <TextButton
        onClicked={handleProfileClick}
        size="sm"
        iconNode={
          googleUserData?.photoURL ? (
            <div className="relative">
              {storedUserData?.isAdmin && (
                <CrownIcon className="absolute -right-3 -top-3 size-5 rotate-45" />
              )}
              <img
                src={googleUserData.photoURL}
                alt="profile-pic"
                className="ml-0.5 size-7 rounded-full border-2 border-brown-600"
              />
            </div>
          ) : (
            <AccountIcon className="ml-0.5 size-7" />
          )
        }
      >
        {googleUserData
          ? googleUserData.displayName?.split(" ")[0]
          : t(appBarTranslations.signIn)}
      </TextButton>
    </div>
  );
};
