import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from "vn-provinces";

import { useUser } from "@/hooks/authentication/useUser";
import { addressSelector } from "@/stores/rootSelector";
import { addressThunk } from "@/stores/rootThunk";
import { formatFullAddress } from "@/utils/helpers";

export default function useAddress(addressEdit = {}) {
  const dispatch = useDispatch();
  const { t } = useTranslation(["address"]);
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const isEditting = Boolean(addressEdit.id);

  const address = useSelector(addressSelector.selectAddresses)
    ?.slice()
    ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));

  const addressDefault = address.find((item) => item.isDefault);
  const status = useSelector(addressSelector.selectAddressStatus);
  const isLoading = ["loading", "idle"].includes(status);
  const error = useSelector(addressSelector.selectAddressError);

  const initialValues = {
    name: addressEdit?.name ?? "",
    phone: addressEdit?.phone ?? "",
    province: addressEdit?.province ?? "",
    district: addressEdit?.district ?? "",
    ward: addressEdit?.ward ?? "",
    detail: addressEdit?.detail ?? "",
  };

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(addressThunk.fetchAddress(user.id));
    }
  }, [status, user, dispatch]);

  async function handleAddAddress(newAddress) {
    await dispatch(addressThunk.addAddress(newAddress));
    handleStatusAddress();
  }

  async function handleUpdateAddress(newAddress) {
    await dispatch(addressThunk.updateAddress(newAddress));
    handleStatusAddress();
  }

  async function handleStatusAddress() {
    if (status === "succeeded") {
      toast.success(t("address.toast.success"));
    } else if (status === "failed") {
      toast.error(t("address.toast.error"));
    }
  }

  async function handleDeleteAddress(address) {
    if (address.isDefault) {
      toast.error(t("address.toast.removeDefaultError"));
      return;
    }

    dispatch(addressThunk.removeAddress({ id: address.id, userId: user.id }));
    handleStatusAddress();
  }

  async function handleSubmitAddress(values, { resetForm }, handler) {
    const provinceInput = getProvinces().find((province) => province.code === values.province)?.name || "";
    const districtInput = values.province
      ? getDistrictsByProvinceCode(values.province).find((district) => district.code === values.district)?.name || ""
      : "";
    const wardInput = values.district
      ? getWardsByDistrictCode(values.district).find((w) => w.code === values.ward)?.name || ""
      : "";

    const fullAddress = formatFullAddress({
      detail: values.detail,
      ward: wardInput,
      district: districtInput,
      province: provinceInput,
    });

    const newAddress = {
      userId: user.id,
      name: values.name || "",
      phone: values.phone,
      fullAddress,
    };
    if (!isEditting) {
      await handleAddAddress(newAddress);
    } else {
      await handleUpdateAddress({ ...newAddress, id: addressEdit.id });
    }
    if (handler) handler();
    resetForm();
  }

  async function handleSetDefaultAddress(id, onCancel) {
    dispatch(addressThunk.updateDefaultAddress({ id, userId: user.id }));
    onCancel();
    handleStatusAddress();
  }

  function handleOpenModal(addr) {
    setEditingAddress(addr);
    setOpenModal(true);
  }

  return {
    user,
    initialValues,
    openModal,
    setOpenModal,
    editingAddress,
    setEditingAddress,
    address,
    addressDefault,
    status,
    isLoading,
    error,
    handleAddAddress,
    handleSubmitAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    handleOpenModal,
  };
}
