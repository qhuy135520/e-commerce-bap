import { Spin, Typography } from "antd";

import { ForgotPasswordForm } from "@/components";

import useForgotPassword from "@/hooks/authentication/useForgotPassword";

const { Title, Text } = Typography;

export default function ForgotPasswordPage() {
  const { handleSubmit, emailRecovery, isResetting, t, forgotPasswordSchema } = useForgotPassword();

  return (
    <Spin spinning={isResetting}>
      {!emailRecovery ? (
        <ForgotPasswordForm handleSubmit={handleSubmit} t={t} forgotPasswordSchema={forgotPasswordSchema} />
      ) : (
        <>
          <Title level={4} type="success">
            {t("forgotPassword.emailCheck")}
            <Text level={5} keyboard>
              {emailRecovery}
            </Text>
            {t("forgotPassword.recoveryPass")}
          </Title>
        </>
      )}
    </Spin>
  );
}
