import React from "react";
import { Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { OrderStyled as OS } from "@/components/ui/order";

export default function OrderEditAddressForm({ address, setIsEditing, validateSchema, t, onSubmit }) {
  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <Formik initialValues={address} validationSchema={validateSchema} onSubmit={onSubmit} enableReinitialize>
      <Form>
        <OS.FormGroup>
          <OS.Label>{t("order.recipientName")}</OS.Label>
          <Field name="name">{({ field }) => <OS.InputField {...field} />}</Field>
          <ErrorMessage name="name" component={OS.ErrorText} />
        </OS.FormGroup>

        <OS.FormGroup>
          <OS.Label>{t("order.phone")}</OS.Label>
          <Field name="phone">{({ field }) => <OS.InputField {...field} />}</Field>
          <ErrorMessage name="phone" component={OS.ErrorText} />
        </OS.FormGroup>

        <OS.FormGroup>
          <OS.Label>{t("order.addressDetail")}</OS.Label>
          <Field name="detail">{({ field }) => <OS.TextArea rows={2} {...field} />}</Field>
          <ErrorMessage name="detail" component={OS.ErrorText} />
        </OS.FormGroup>

        <OS.ButtonGroup>
          <Button onClick={handleCancel}>{t("order.cancel")}</Button>
          <Button type="primary" htmlType="submit">
            {t("order.save")}
          </Button>
        </OS.ButtonGroup>
      </Form>
    </Formik>
  );
}
