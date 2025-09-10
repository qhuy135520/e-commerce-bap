import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/authentication/useUser";

import { brandSelector, categorySelector } from "@/stores/rootSelector";
import { brandThunk, categoryThunk } from "@/stores/rootThunk";
import { createProductVendor, updateProductVendor } from "@/stores/products/products.thunks";
import { selectStatus } from "@/stores/products/products.selectors";

export function useEditProduct(productEdit = {}) {
  const { user } = useUser();
  const { id: productEditId, images, ...data } = productEdit;
  const isEditSession = Boolean(productEditId);
  const dispatch = useDispatch();

  const categorys = useSelector(categorySelector.selectCategoryItems);
  const statusCate = useSelector(categorySelector.selectCategoryStatus);
  const brands = useSelector(brandSelector.selectBrandItems);
  const statusBrand = useSelector(brandSelector.selectBrandStatus);
  const status = useSelector(selectStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(null);

  const initialValues = {
    name: productEdit.name || "",
    categoryId: productEdit.categoryid || "",
    brandId: productEdit.brandid || "",
    price: productEdit.price || 0,
    stock: productEdit.stock || 0,
    description: productEdit.description || "",
    param: productEdit.param || "",
  };

  useEffect(() => {
    if (productEdit?.images?.length > 0) {
      const newFileList = productEdit.images.map((img, index) => ({
        uid: img.id || index,
        name: img.name || `image-${index}`,
        status: "done",
        url: img.imageUrl,
      }));
      setFileList(newFileList);

      const primaryIdx = productEdit.images.findIndex((img) => img.isPrimary);
      setPrimaryIndex(primaryIdx !== -1 ? primaryIdx : null);
    } else {
      setFileList([]);
      setPrimaryIndex(null);
    }
  }, [productEdit]);

  const validationSchema = useMemo(
    () =>
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
      }),
    []
  );

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

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
      if (isEditSession) {
        await dispatch(
          updateProductVendor({
            vendorId: user.id,
            productId: productEditId,
            dataUpdate: { ...values },
          })
        ).unwrap();
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await dispatch(
          createProductVendor({
            vendorId: user.id,
            data: { ...values, images: fileList, primaryIndex },
          })
        ).unwrap();
        toast.success("Gửi xét duyệt sản phẩm thành công!");
      }

      resetForm();
      setFileList([]);
      setPrimaryIndex(null);
      handleCancel();
    } catch (error) {
      toast.error("Có lỗi khi xử lý sản phẩm");
      console.error(error);
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
    primaryIndex,
    isModalOpen,
    isEditSession,
    status,
    onChange,
    handleOk,
    handleCancel,
    showModal,
    handleSubmit,
    setPrimaryIndex,
    setIsModalOpen,
  };
}
