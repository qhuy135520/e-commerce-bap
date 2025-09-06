import { Button, ConfigProvider, Flex } from "antd";

import { DividerTitle } from "@/components";

import useForgotPassword from "@/hooks/authentication/useForgotPassword";

export default function DividerForgotPassword() {
  const { t, handleNavigate } = useForgotPassword();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "var(--color-grey-500)",
          fontSize: "1.4rem",
          colorSplit: "var(--color-grey-400)",
        },
      }}
    >
      <DividerTitle title={t("forgotPassword.title")} />
      <Flex vertical>
        <Button color="primary" variant="outlined" size="large" onClick={handleNavigate}>
          {t("forgotPassword.resetButton")}
        </Button>
      </Flex>
    </ConfigProvider>
  );
}
