import React, { useReducer } from "react";
import styled from "styled-components";
import { Input, Checkbox, Select, Slider, Button, Rate } from "antd";
import { useTranslation } from "react-i18next";

import { getDistanceFromLatLonInKm } from "@/utils/helpers";

const { Option } = Select;

const FilterWrapper = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 16px;
`;

const FieldsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Field = styled.div`
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledInput = styled(Input)`
  border-radius: 8px;
`;

const StyledSelect = styled(Select)`
  border-radius: 8px;
`;

const StyledCheckbox = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    font-size: 14px;
    color: #374151;
  }
`;

const StyledSlider = styled(Slider)`
  .ant-slider-track {
    background-color: #3b82f6;
  }
  .ant-slider-handle {
    border-color: #3b82f6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;

  button {
    flex: 1 1 120px;
  }
`;

const initialState = {
  name: "",
  status: "active",
  hasAddress: false,
  minProducts: 0,
  minSales: 0,
  minRating: 0,
  radiusFilter: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function VendorFilter({ vendors, onFilter, currentPosition, radius, setRadius }) {
  const { t } = useTranslation(["searchmap"]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { name, hasAddress, minProducts, minSales, minRating, radiusFilter } = state;

  const handleFilter = () => {
    let filtered = [...vendors];

    if (name.trim()) filtered = filtered.filter((v) => v.vendorName.toLowerCase().includes(name.toLowerCase()));
    if (hasAddress) filtered = filtered.filter((v) => v.addresses?.length > 0);
    if (minProducts > 0) filtered = filtered.filter((v) => v.totalProducts >= minProducts);
    if (minSales > 0) filtered = filtered.filter((v) => v.totalSales >= minSales);
    if (minRating > 0) filtered = filtered.filter((v) => v.avgRating >= minRating);
    if (radiusFilter > 0 && currentPosition) {
      filtered = filtered.filter((v) => {
        return v.addressesWithCoords?.some((addr) => {
          if (!addr.lat || !addr.lon) return false;
          const distance = getDistanceFromLatLonInKm(currentPosition.lat, currentPosition.lng, addr.lat, addr.lon);
          return distance <= radiusFilter;
        });
      });
      setRadius(radiusFilter);
    }

    onFilter(filtered);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setRadius(0);
    onFilter(vendors);
  };

  return (
    <FilterWrapper>
      <FieldsGrid>
        <Field>
          <label>{t("filter.name")}</label>
          <StyledInput
            placeholder={t("filter.namePlaceholder")}
            value={name}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
          />
        </Field>

        <Field>
          <label>
            {t("filter.radius")}: {radius}
          </label>
          <StyledInput
            type="number"
            min={0}
            max={500}
            value={radiusFilter}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "radiusFilter", value: Number(e.target.value) })}
          />
        </Field>

        <Field style={{ alignSelf: "center" }}>
          <StyledCheckbox
            checked={hasAddress}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "hasAddress", value: e.target.checked })}
          >
            {t("filter.hasAddress")}
          </StyledCheckbox>
        </Field>

        <Field>
          <label>
            {t("filter.minProducts")}: {minProducts}
          </label>
          <StyledSlider
            min={0}
            max={100}
            value={minProducts}
            onChange={(val) => dispatch({ type: "SET_FIELD", field: "minProducts", value: val })}
          />
        </Field>

        <Field>
          <label>
            {t("filter.minSales")}: {minSales}
          </label>
          <StyledSlider
            min={0}
            max={100}
            value={minSales}
            onChange={(val) => dispatch({ type: "SET_FIELD", field: "minSales", value: val })}
          />
        </Field>

        <Field>
          <label>{t("filter.minRating")}</label>
          <Rate
            allowHalf
            value={minRating}
            onChange={(val) => dispatch({ type: "SET_FIELD", field: "minRating", value: val })}
          />
        </Field>
      </FieldsGrid>

      <ButtonGroup>
        <Button type="primary" onClick={handleFilter}>
          {t("filter.apply")}
        </Button>
        <Button onClick={handleReset}>{t("filter.reset")}</Button>
      </ButtonGroup>
    </FilterWrapper>
  );
}
