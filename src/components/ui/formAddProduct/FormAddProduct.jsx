import React from "react";
import ImgCrop from "antd-img-crop";
import { Formik } from "formik";
import { Form, Select, Input } from "formik-antd";
import { Button, ConfigProvider, Upload } from "antd";
import { useTranslation } from "react-i18next";

import { FormAddProductStyled as FAPS } from "@/components";

export default function FormAddProduct({
  initialValues,
  validationSchema,
  categorys,
  brands,
  fileList,
  primaryIndex,
  onChange,
  handleSubmit,
  setPrimaryIndex,
}) {
  const { t } = useTranslation(["vendor"]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: "1.5rem",
            labelColor: "var(--color-grey-600)",
          },
          Select: {
            optionSelectedBg: "var(--color-grey-300)",
            optionSelectedColor: "var(--color-grey-700)",
            optionActiveBg: "var(--color-grey-400)",
          },
        },
        token: {
          colorTextPlaceholder: "#999999",
        },
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form layout="vertical">
            <Form.Item label={t("productTable.form.name")} name="name">
              <Input name="name" placeholder={t("productTable.form.namePlaceholder")} />
            </Form.Item>

            <Form.Item label={t("productTable.form.category")} name="categoryId">
              <Select
                name="categoryId"
                placeholder={t("productTable.form.categoryPlaceholder")}
                onChange={(value) => {
                  setFieldValue("categoryId", value);
                  setFieldValue("brandId", "");
                }}
              >
                {categorys.map((c) => (
                  <Select.Option key={c.id} value={c.id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label={t("productTable.form.brand")} name="brandId">
              <Select name="brandId" placeholder={t("productTable.form.brandPlaceholder")}>
                {brands
                  .filter((b) => b.categoryId === values.categoryId)
                  .map((b) => (
                    <Select.Option key={b.id} value={b.id}>
                      {b.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item label={t("productTable.form.price")} name="price">
              <Input type="number" name="price" placeholder={t("productTable.form.pricePlaceholder")} />
            </Form.Item>

            <Form.Item label={t("productTable.form.stock")} name="stock">
              <Input type="number" name="stock" placeholder={t("productTable.form.stockPlaceholder")} />
            </Form.Item>

            <Form.Item label={t("productTable.form.description")} name="description">
              <Input name="description" placeholder={t("productTable.form.descriptionPlaceholder")} />
            </Form.Item>

            <Form.Item label={t("productTable.form.param")} name="param">
              <Input type="text" name="param" placeholder={t("productTable.form.paramPlaceholder")} />
            </Form.Item>

            <Form.Item label={t("productTable.form.images")} name="image">
              <ImgCrop rotationSlider>
                <Upload listType="picture-card" fileList={fileList} onChange={onChange} beforeUpload={() => false}>
                  {fileList.length < 5 && t("productTable.form.upload")}
                </Upload>
              </ImgCrop>

              {fileList.length > 0 && (
                <FAPS.ChooseImage>
                  <span>{t("productTable.form.choosePrimary")}:</span>
                  {fileList.map((file, idx) => (
                    <FAPS.OptionImage key={file.uid}>
                      <Input type="radio" checked={primaryIndex === idx} onChange={() => setPrimaryIndex(idx)} />
                      {`ẢNH THỨ ${idx + 1}`}
                    </FAPS.OptionImage>
                  ))}
                </FAPS.ChooseImage>
              )}
            </Form.Item>

            <FAPS.PositonButton>
              <Button type="primary" htmlType="submit">
                {t("productTable.form.submit")}
              </Button>
            </FAPS.PositonButton>
          </Form>
        )}
      </Formik>
    </ConfigProvider>
  );
}
