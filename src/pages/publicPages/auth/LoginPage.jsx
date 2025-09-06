import { DividerForgotPassword, DividerTitle, HeadingStyled, LoginForm, SocialAuth } from "@/components";

import { useLogin } from "@/hooks/authentication/useLogin";

export default function LoginPage() {
  const { t } = useLogin();
  return (
    <>
      <HeadingStyled as="h1">{t("login.title")}</HeadingStyled>
      <DividerTitle title={t("login.socialTitle")} />
      <SocialAuth type={t("login.title")} />
      <LoginForm />
      <DividerForgotPassword />
    </>
  );
}
