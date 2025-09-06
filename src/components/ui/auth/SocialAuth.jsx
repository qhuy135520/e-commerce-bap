import { Flex } from "antd";
import { Button } from "antd";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import { DividerTitle } from "@/components";

import { useLogin } from "@/hooks/authentication/useLogin";

export default function SocialAuth({ type }) {
  const { loginWithGoogle, t } = useLogin();

  return (
    <>
      <Flex vertical gap={15}>
        <Button type="primary" danger size="large" icon={<FaGoogle />} onClick={loginWithGoogle}>
          {type} {t("social.google")}
        </Button>
        <Button type="primary" size="large" icon={<FaFacebook />}>
          {type} {t("social.facebook")}
        </Button>
      </Flex>
      <DividerTitle title={t("social.orEmail")} />
    </>
  );
}
