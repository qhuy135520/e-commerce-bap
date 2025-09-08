import React from "react";
import { Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Styled from "@/pages/privatePages/order/Order.styled";

export default function OrderEditAddressForm({ address, setIsEditing, validateSchema, t, onSubmit }) {
  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <Formik initialValues={address} validationSchema={validateSchema} onSubmit={onSubmit} enableReinitialize>
      <Form>
        <Styled.FormGroup>
          <Styled.Label>{t("order.recipientName")}</Styled.Label>
          <Field name="name">{({ field }) => <Styled.InputField {...field} />}</Field>
          <ErrorMessage name="name" component={Styled.ErrorText} />
        </Styled.FormGroup>

        <Styled.FormGroup>
          <Styled.Label>{t("order.phone")}</Styled.Label>
          <Field name="phone">{({ field }) => <Styled.InputField {...field} />}</Field>
          <ErrorMessage name="phone" component={Styled.ErrorText} />
        </Styled.FormGroup>

        <Styled.FormGroup>
          <Styled.Label>{t("order.addressDetail")}</Styled.Label>
          <Field name="detail">{({ field }) => <Styled.TextArea rows={2} {...field} />}</Field>
          <ErrorMessage name="detail" component={Styled.ErrorText} />
        </Styled.FormGroup>

        <Styled.ButtonGroup>
          <Button onClick={handleCancel}>{t("order.cancel")}</Button>
          <Button type="primary" htmlType="submit">
            {t("order.save")}
          </Button>
        </Styled.ButtonGroup>
      </Form>
    </Formik>
  );
}
