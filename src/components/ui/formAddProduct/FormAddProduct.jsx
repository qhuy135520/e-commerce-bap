import React from "react";
import ImgCrop from "antd-img-crop";
import { Formik } from "formik";
import { Form, Select, Input } from "formik-antd";
import { Button, ConfigProvider, Upload } from "antd";

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
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: "1.5rem",
            labelColor: "var(--color-grey-600)",
          },
        },
      }}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form layout="vertical">
            <Form.Item label="Tên sản phẩm" name="name">
              <Input name="name" placeholder="Nhập tên sản phẩm..." />
            </Form.Item>

            <Form.Item name="categoryId" label="Danh mục">
              <Select
                name="categoryId"
                placeholder="Chọn danh mục"
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

            <Form.Item name="brandId" label="Nhãn hiệu">
              <Select name="brandId" placeholder="Chọn nhãn hiệu">
                {brands
                  .filter((b) => b.categoryId === values.categoryId)
                  .map((b) => (
                    <Select.Option key={b.id} value={b.id}>
                      {b.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item label="Giá" name="price">
              <Input type="number" name="price" placeholder="Nhập giá..." />
            </Form.Item>

            <Form.Item label="Số lượng" name="stock">
              <Input type="number" name="stock" placeholder="Nhập số lượng..." />
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <Input name="description" placeholder="Nhập mô tả..." />
            </Form.Item>

            <Form.Item label="Thông số" name="param">
              <Input type="text" name="param" placeholder="Nhập thông số..." />
            </Form.Item>

            <Form.Item name="image" label="Thêm ảnh sản phẩm">
              <ImgCrop rotationSlider>
                <Upload listType="picture-card" fileList={fileList} onChange={onChange} beforeUpload={() => false}>
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
              {fileList.length > 0 && (
                <FAPS.ChooseImage>
                  <span>Chọn ảnh chính:</span>
                  {fileList.map((file, idx) => (
                    <FAPS.OptionImage key={file.uid}>
                      <Input type="radio" checked={primaryIndex === idx} onChange={() => setPrimaryIndex(idx)} />
                      {file.name}
                    </FAPS.OptionImage>
                  ))}
                </FAPS.ChooseImage>
              )}
            </Form.Item>

            <FAPS.PositonButton>
              <Button type="primary" htmlType="submit">
                Gửi xét duyệt
              </Button>
            </FAPS.PositonButton>
          </Form>
        )}
      </Formik>
    </ConfigProvider>
  );
}
