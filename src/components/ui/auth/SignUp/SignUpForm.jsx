import { Button, ConfigProvider, Flex, Spin } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { CiLogin } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";

import { NavlinkStyled } from "@/components";

import { initialValues, useSignup } from "@/hooks/authentication/useSignup";

export default function SignUpForm() {
  const { isPendingSignup, handleSubmit, t, signupSchema } = useSignup();

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
      <Spin spinning={isPendingSignup}>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
        >
          <Form layout="vertical">
            <>
              <Form.Item label={t("signup.form.emailLabel")} name="email">
                <Input
                  size="large"
                  name="email"
                  placeholder={t("signup.form.emailPlaceholder")}
                  suffix="@"
                  autoComplete="email"
                />
              </Form.Item>

              <Form.Item label={t("signup.form.nameLabel")} name="name">
                <Input
                  size="large"
                  name="name"
                  placeholder={t("signup.form.namePlaceholder")}
                  suffix={<BiSolidUserDetail />}
                />
              </Form.Item>

              <Form.Item label={t("signup.form.birthdateLabel")} name="birthdate">
                <Input type="date" size="large" name="birthdate" placeholder={t("signup.form.birthdatePlaceholder")} />
              </Form.Item>

              <Form.Item label={t("signup.form.passwordLabel")} name="password">
                <Input
                  type="password"
                  size="large"
                  name="password"
                  placeholder={t("signup.form.passwordPlaceholder")}
                  suffix="🔒"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item label={t("signup.form.confirmPasswordLabel")} name="confirmPassword">
                <Input
                  type="password"
                  size="large"
                  name="confirmPassword"
                  placeholder={t("signup.form.confirmPasswordPlaceholder")}
                  suffix="🔒"
                  autoComplete="confirmPassword"
                />
              </Form.Item>

              <Flex justify="space-between" align="center">
                <Button type="primary" htmlType="submit" shape="round" icon={<CiLogin />} size="large">
                  {t("signup.form.submit")}
                </Button>
                <NavlinkStyled to="/login">{t("signup.form.alreadyAccount")}</NavlinkStyled>
              </Flex>
            </>
          </Form>
        </Formik>
      </Spin>
    </ConfigProvider>
  );
}
