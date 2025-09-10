import React from "react";
import { Select } from "antd";
import { getDistrictsByProvinceCode } from "vn-provinces";
import { useTranslation } from "react-i18next";

import { AddressFormStyled as AFS } from "@/components/common";

export default function DistrictSelect({ provinceCode, value, onChange, error, disabled }) {
  const districts = provinceCode ? getDistrictsByProvinceCode(provinceCode) || [] : [];
  const { t } = useTranslation(["common"]);

  return (
    <AFS.FormGroup>
      <AFS.Label>{t("form.district")}</AFS.Label>
      <Select
        value={value || undefined}
        placeholder={t("form.districtPlaceholder")}
        onChange={onChange}
        options={districts.map((d) => ({ label: d.name, value: d.code }))}
        showSearch
        filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
        disabled={disabled || !provinceCode}
      />
      {error && <AFS.ErrorText>{error}</AFS.ErrorText>}
    </AFS.FormGroup>
  );
}
