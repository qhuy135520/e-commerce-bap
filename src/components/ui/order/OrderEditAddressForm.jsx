import React from "react";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";

import { ProvinceSelect, DistrictSelect, WardSelect, OrderStyled as OS } from "@/components";

import useAddress from "@/hooks/address/useAddress";

export default function OrderEditAddressForm({ onCancel, validateSchema }) {
  const { t } = useTranslation(["order"]);
  const { initialValues, handleSubmitAddress } = useAddress();

  return (
    <>
      <OS.HeadingEditAddress as="h3">Thêm Địa Chỉ</OS.HeadingEditAddress>

      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values, formikHelpers) => handleSubmitAddress(values, formikHelpers, onCancel)}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <OS.FormGroup>
              <OS.Label>{t("order.recipientName")}</OS.Label>
              <Field name="name">{({ field }) => <OS.InputField {...field} />}</Field>
              {touched.name && errors.name && <OS.ErrorText>{errors.name}</OS.ErrorText>}
            </OS.FormGroup>

            <OS.FormGroup>
              <OS.Label>{t("order.phone")}</OS.Label>
              <Field name="phone">{({ field }) => <OS.InputField {...field} />}</Field>
              {touched.phone && errors.phone && <OS.ErrorText>{errors.phone}</OS.ErrorText>}
            </OS.FormGroup>

            <ProvinceSelect
              t={t}
              value={values.province}
              onChange={(val) => {
                setFieldValue("province", val);
                setFieldValue("district", "");
                setFieldValue("ward", "");
              }}
              error={touched.province && errors.province}
            />

            <DistrictSelect
              t={t}
              provinceCode={values.province}
              value={values.district}
              onChange={(val) => {
                setFieldValue("district", val);
                setFieldValue("ward", "");
              }}
              error={touched.district && errors.district}
            />

            <WardSelect
              t={t}
              districtCode={values.district}
              value={values.ward}
              onChange={(val) => setFieldValue("ward", val)}
              error={touched.ward && errors.ward}
            />

            <OS.FormGroup>
              <OS.Label>{t("order.addressDetail")}</OS.Label>
              <Field name="detail">
                {({ field }) => (
                  <OS.InputField {...field} placeholder={t("order.addressDetail") || "Số nhà, tên đường..."} />
                )}
              </Field>
              {touched.detail && errors.detail && <OS.ErrorText>{errors.detail}</OS.ErrorText>}
            </OS.FormGroup>

            <OS.ButtonGroup>
              <Button onClick={onCancel}>{t("order.cancel")}</Button>
              <Button type="primary" htmlType="submit">
                {t("order.save")}
              </Button>
            </OS.ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
}
