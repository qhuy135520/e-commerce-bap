import React from "react";
import { Select } from "antd";
import { getWardsByDistrictCode } from "vn-provinces";
import { useTranslation } from "react-i18next";

import { AddressFormStyled as AFS } from "@/components/common";

export default function WardSelect({ districtCode, value, onChange, disabled, error }) {
  const wards = districtCode ? getWardsByDistrictCode(districtCode) || [] : [];
  const { t } = useTranslation(["common"]);
  return (
    <AFS.FormGroup>
      <AFS.Label>{t("form.ward")}</AFS.Label>
      <Select
        value={value || undefined}
        placeholder={t("form.wardPlaceholder")}
        onChange={(val) => onChange?.(val)}
        disabled={disabled || !districtCode}
        options={wards.map((ward) => ({ label: ward.name, value: ward.code }))}
        showSearch
        optionFilterProp="label"
      />
      {error && <AFS.ErrorText>{error}</AFS.ErrorText>}
    </AFS.FormGroup>
  );
}
