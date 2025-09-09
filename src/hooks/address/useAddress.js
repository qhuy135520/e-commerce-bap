import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from "vn-provinces";

import { useUser } from "@/hooks/authentication/useUser";
import { addressSelector } from "@/stores/rootSelector";
import { addressThunk } from "@/stores/rootThunk";
import { formatFullAddress } from "@/utils/helpers";

export default function useAddress() {
  const dispatch = useDispatch();
  const { t } = useTranslation(["address"]);
  const { user } = useUser();

  const address = useSelector(addressSelector.selectAddresses);
  const addressDefault = address.find((item) => item.isDefault);
  const status = useSelector(addressSelector.selectAddressStatus);
  const isLoading = ["loading", "idle"].includes(status);
  const error = useSelector(addressSelector.selectAddressError);

  const initialValues = {
    name: address?.name ?? "",
    phone: address?.phone ?? "",
    province: address?.province ?? "",
    district: address?.district ?? "",
    ward: address?.ward ?? "",
    detail: address?.detail ?? "",
  };

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(addressThunk.fetchAddress(user.id));
    }
  }, [status, user, dispatch]);

  async function handleAddAddress(newAddress) {
    await dispatch(addressThunk.addAddress(newAddress));
    if (status === "succeeded") toast.success(t("address.toast.success"));
    if (status === "failed") toast.error(t("address.toast.error"));
  }

  async function handleDeleteAddress(address) {
    if (address.isDefault) {
      toast.error(t("address.toast.removeDefaultError"));
      return;
    }

    dispatch(addressThunk.removeAddress({ id: address.id, userId: user.id }));
    if (status === "succeeded") toast.success(t("address.toast.success"));
    if (status === "failed") toast.error(t("address.toast.error"));
  }

  async function handleUpdateDefaultAddress(id) {
    await dispatch(addressThunk.updateDefaultAddress({ id, userId: user.id }));
    if (status === "succeeded") toast.success(t("address.toast.success"));
    if (status === "failed") toast.error(t("address.toast.error"));
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
      name: values.name,
      phone: values.phone,
      fullAddress,
    };

    await handleAddAddress(newAddress);
    if (handler) handler();
    resetForm();
  }
  const handleSetDefaultAddress = async (id) => {
    await handleUpdateDefaultAddress(id);
  };

  return {
    initialValues,
    address,
    addressDefault,
    status,
    isLoading,
    error,
    handleAddAddress,
    handleSubmitAddress,
    handleDeleteAddress,
    handleUpdateDefaultAddress,
    handleSetDefaultAddress,
  };
}
