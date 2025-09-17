import { useEffect } from "react";

import { DividerForgotPassword, DividerTitle, HeadingStyled, Loading, SignUpForm, SocialAuth } from "@/components";

import { useSignup } from "@/hooks/authentication/useSignup";

export default function SignUpPage() {
  const { t, navigate, isChecking, setIsChecking, role } = useSignup();

  useEffect(() => {
    if (!role) {
      navigate("/role-signup");
    } else {
      setIsChecking(false);
    }
  }, [role, navigate, setIsChecking]);

  return (
    <Loading isLoading={isChecking}>
      <HeadingStyled as="h1">
        {t("signup.title", { ns: "auth" })} ({t(`roles.${role}`, { ns: "common" })})
      </HeadingStyled>
      <DividerTitle title={t("signup.socialTitle")} />
      <SignUpForm />
      <DividerForgotPassword />
    </Loading>
  );
}
