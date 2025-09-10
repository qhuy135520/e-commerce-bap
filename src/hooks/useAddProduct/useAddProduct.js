import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";

import { useUser } from "@/hooks/authentication/useUser";

import { apiCreateProductImages } from "@/services/apiProduct";

import { fetchAllBrand } from "@/stores/brand/brand.thunks";
import { fetchCategory } from "@/stores/category/category.thunks";
import { createProductVendor } from "@/stores/products/products.thunks";

import { selectBrandItems, selectBrandStatus } from "@/stores/brand/brand.selector";
import { selectCategoryItems, selectCategoryStatus } from "@/stores/category/category.selector";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useUser();
  const dispatch = useDispatch();
  const categorys = useSelector(selectCategoryItems);
  const brands = useSelector(selectBrandItems);
  const statusCate = useSelector(selectCategoryStatus);
  const statusBrand = useSelector(selectBrandStatus);
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

  async function handleSubmit(values) {
    const uploadedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const realFile = file.originFileObj || file;

      const { data, error } = await supabase.storage
        .from("ProductImage")
        .upload(`${Date.now()}_${realFile.name}`, realFile);

      if (error) {
        console.error("Upload error:", error);
      } else {
        const { data: urlData } = supabase.storage.from("ProductImage").getPublicUrl(data.path);
        uploadedFiles.push({ imageUrl: urlData.publicUrl, isPrimary: i === primaryIndex });
      }
    }

    const resProduct = await dispatch(
      createProductVendor({ vendorId: user.id, data: { ...values, status: false } })
    ).unwrap();
    const imagesData = uploadedFiles.map((f) => ({
      ...f,
      productId: resProduct.id,
    }));
    await apiCreateProductImages(imagesData);
  }

  useEffect(() => {
    if (statusCate === "idle" || statusBrand === "idle") {
      dispatch(fetchCategory());
      dispatch(fetchAllBrand());
    }
  }, [statusCate, dispatch]);

  return {
    initialValues,
    categorys,
    brands,
    fileList,
    onChange,
    handleSubmit,
    primaryIndex,
    setPrimaryIndex,
    handleOk,
    handleCancel,
    showModal,
    isModalOpen,
    setFileList,
  };
}
