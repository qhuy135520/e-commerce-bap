import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/authentication/useUser";

import { createProductWithImages } from "@/services/apiProduct";
import { brandSelector, categorySelector } from "@/stores/rootSelector";
import { brandThunk, categoryThunk } from "@/stores/rootThunk";

export function useAddProduct() {
  const initialValues = {
    name: "",
    categoryId: "",
    brandId: "",
    price: 0,
    stock: 0,
    description: "",
    param: "",
  };

  const validationSchema = useMemo(() =>
    Yup.object({
      name: Yup.string()
        .required("Tên sản phẩm không được để trống")
        .min(3, "Tên sản phẩm phải có ít nhất 3 ký tự")
        .max(100, "Tên sản phẩm không vượt quá 100 ký tự"),

      categoryId: Yup.string().required("Vui lòng chọn danh mục"),

      brandId: Yup.string().required("Vui lòng chọn nhãn hiệu"),

      price: Yup.number()
        .typeError("Giá phải là số")
        .required("Giá không được để trống")
        .min(1000, "Giá phải lớn hơn hoặc bằng 1,000 VNĐ"),

      stock: Yup.number()
        .typeError("Số lượng phải là số")
        .required("Số lượng không được để trống")
        .min(1, "Số lượng phải lớn hơn hoặc bằng 1"),

      description: Yup.string().required("Mô tả không được để trống").min(10, "Mô tả phải có ít nhất 10 ký tự"),

      param: Yup.string().required("Thông số không được để trống").min(5, "Thông số phải có ít nhất 5 ký tự"),
    })
  );

  const { user } = useUser();
  const dispatch = useDispatch();
  const categorys = useSelector(categorySelector.selectCategoryItems);
  const statusCate = useSelector(categorySelector.selectCategoryStatus);
  const brands = useSelector(brandSelector.selectBrandItems);
  const statusBrand = useSelector(brandSelector.selectBrandStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  async function handleSubmit(values, { resetForm }) {
    if (fileList.length === 0) {
      toast.error("Vui lòng tải lên ít nhất 1 ảnh sản phẩm");
      return;
    }
    if (primaryIndex === null) {
      toast.error("Vui lòng chọn ảnh chính");
      return;
    }

    try {
      await createProductWithImages({
        vendorId: user.id,
        values,
        fileList,
        primaryIndex,
      });
      resetForm();
      setFileList([]);
      setPrimaryIndex(null);
      toast.success("Gửi xét duyệt sản phẩm thành công!");
      handleCancel();
    } catch (error) {
      toast.error("Có lỗi khi gửi xét duyệt sản phẩm");
      throw error;
    }
  }

  useEffect(() => {
    if (statusCate === "idle" || statusBrand === "idle") {
      dispatch(categoryThunk.fetchCategory());
      dispatch(brandThunk.fetchAllBrand());
    }
  }, [statusCate, statusBrand, dispatch]);

  return {
    initialValues,
    validationSchema,
    categorys,
    brands,
    fileList,
    isModalOpen,
    primaryIndex,
    onChange,
    handleOk,
    handleCancel,
    showModal,
    handleSubmit,
    setPrimaryIndex,
  };
}
