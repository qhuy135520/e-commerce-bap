import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { Button, ConfigProvider, Flex, Spin } from "antd";
import { CiLogin } from "react-icons/ci";

import { NavlinkStyled } from "@/components";

import { initialValues, useLogin } from "@/hooks/authentication/useLogin";

export default function LoginForm() {
  const { handleSubmit, isPendingLogin, t, loginSchema } = useLogin();

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: "1.8rem",
            labelColor: "var(--color-grey-600)",
          },
          Input: {
            colorTextPlaceholder: "var(--color-grey-400)",
            colorBgContainer: "var(--color-grey-100)",
            colorText: "var(--color-grey-800)",
          },
        },
      }}
    >
      <Spin spinning={isPendingLogin}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, { resetForm });
          }}
        >
          <Form layout="vertical" autoCapitalize="off">
            <>
              <Form.Item label={t("login.form.emailLabel")} name="email">
                <Input
                  size="large"
                  name="email"
                  placeholder={t("login.form.emailPlaceholder")}
                  suffix="@"
                  autoComplete="email"
                />
              </Form.Item>
              <Form.Item label={t("login.form.passwordLabel")} name="password">
                <Input
                  type="password"
                  size="large"
                  name="password"
                  placeholder={t("login.form.passwordPlaceholder")}
                  suffix="🔒"
                  autoComplete="current-password"
                />
              </Form.Item>
              <Flex justify="space-between" align="center">
                <Button type="primary" htmlType="submit" shape="round" icon={<CiLogin />} size="large">
                  {t("login.form.submit")}
                </Button>
                <NavlinkStyled to="/signup">{t("login.form.noAccount")}</NavlinkStyled>
              </Flex>
            </>
          </Form>
        </Formik>
      </Spin>
    </ConfigProvider>
  );
}
