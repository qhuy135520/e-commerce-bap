import { Button, ConfigProvider, Spin } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { CiLogin } from "react-icons/ci";

import useUpdatePassword, { initialValues } from "@/hooks/authentication/useUpdatePassword";

export default function UpdatePasswordForm() {
  const { handleSubmit, isUpdating, t, updatePasswordSchema } = useUpdatePassword();

  return (
    <Spin spinning={isUpdating}>
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
        <Formik
          initialValues={initialValues}
          validationSchema={updatePasswordSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
        >
          <Form layout="vertical">
            <Form.Item label={t("updatePassword.form.newPasswordLabel")} name="password">
              <Input type="password" name="password" autoComplete="new-password" suffix="🔐" />
            </Form.Item>

            <Form.Item label={t("updatePassword.form.confirmPasswordLabel")} name="confirmPassword">
              <Input type="password" name="confirmPassword" autoComplete="new-password" suffix="🔐" />
            </Form.Item>

            <Button type="primary" htmlType="submit" shape="round" icon={<CiLogin />} size="large">
              {t("updatePassword.form.submit")}
            </Button>
          </Form>
        </Formik>
      </ConfigProvider>
    </Spin>
  );
}
