import React from "react";
import { Select } from "antd";
import { getProvinces } from "vn-provinces";
import { useTranslation } from "react-i18next";

import { AddressFormStyled as AFS } from "@/components/common";

export default function ProvinceSelect({ value, onChange, error }) {
  const provinces = getProvinces() || [];
  const { t } = useTranslation(["common"]);

  return (
    <AFS.FormGroup>
      <AFS.Label>{t("form.province")}</AFS.Label>
      <Select
        value={value || undefined}
        placeholder={t("form.provincePlaceholder")}
        onChange={(val) => onChange?.(val)}
        options={provinces.map((p) => ({ label: p.name, value: p.code }))}
        showSearch
        optionFilterProp="label"
      />
      {error && <AFS.ErrorText>{error}</AFS.ErrorText>}
    </AFS.FormGroup>
  );
}
