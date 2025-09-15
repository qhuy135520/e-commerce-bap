import React from "react";
import { Button, Spin } from "antd";
import { Formik, Form, Field } from "formik";

import { ProvinceSelect, DistrictSelect, WardSelect, OrderStyled as OS } from "@/components";

import useAddress from "@/hooks/address/useAddress";
import { useGeolocation } from "@/hooks/useGeolocation/useGeolocation";
import { parseAddress } from "@/utils/helpers";
import useOrder from "@/hooks/order/useOrder";

export default function OrderEditAddressForm({ onCancel, address = {} }) {
  const { initialValues, handleSubmitAddress, user } = useAddress(address);
  const { isLoading: isLoadingGeolocation, error, getPosition } = useGeolocation();
  const { validateSchema, t } = useOrder();

  return (
    <>
      <OS.HeadingEditAddress as="h3">{t("order.addAddressTitle")}</OS.HeadingEditAddress>

      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values, formikHelpers) => handleSubmitAddress(values, formikHelpers, onCancel)}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {user.role === "customer" && (
              <OS.FormGroup>
                <OS.Label>{t("order.recipientName")}</OS.Label>
                <Field name="name">{({ field }) => <OS.InputField {...field} />}</Field>
                {touched.name && errors.name && <OS.ErrorText>{errors.name}</OS.ErrorText>}
              </OS.FormGroup>
            )}

            <OS.FormGroup>
              <OS.Label>{t("order.phone")}</OS.Label>
              <Field name="phone">{({ field }) => <OS.InputField {...field} />}</Field>
              {touched.phone && errors.phone && <OS.ErrorText>{errors.phone}</OS.ErrorText>}
            </OS.FormGroup>

            <OS.FormGroup>
              <Button
                type="dashed"
                onClick={async () => {
                  const addr = await getPosition();
                  if (addr) {
                    const parsed = parseAddress(addr);
                    setFieldValue("province", parsed.province);
                    setFieldValue("district", parsed.district);
                    setFieldValue("ward", parsed.ward);
                    setFieldValue("detail", parsed.detail);
                  }
                }}
              >
                {isLoadingGeolocation ? <Spin size="small" /> : t("order.useMyLocation")}
              </Button>

              {error && <OS.ErrorText>{error.message}</OS.ErrorText>}
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
