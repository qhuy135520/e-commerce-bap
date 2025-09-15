import { VendorUpdateAddressForm, VendorUpdateInfoForm, VendorUpdateInfoHeader } from "@/components";
import React from "react";

export default function VendorUpdateInfo() {
  return (
    <>
      <VendorUpdateInfoHeader />
      <VendorUpdateInfoForm />
      <VendorUpdateAddressForm />
    </>
  );
}
