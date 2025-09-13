import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Checkbox, Select, Slider, Button, Rate } from "antd";
import { getDistanceFromLatLonInKm } from "@/utils/helpers";

const { Option } = Select;

// Container full-width
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

export default function VendorFilter({ vendors, onFilter, currentPosition }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("all");
  const [hasAddress, setHasAddress] = useState(false);
  const [minProducts, setMinProducts] = useState(0);
  const [minSales, setMinSales] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [radius, setRadius] = useState(0);

  const handleFilter = () => {
    let filtered = [...vendors];

    if (name.trim()) filtered = filtered.filter((v) => v.vendorName.toLowerCase().includes(name.toLowerCase()));
    if (status !== "all") filtered = filtered.filter((v) => v.status === status);
    if (hasAddress) filtered = filtered.filter((v) => v.addresses?.length > 0);
    if (minProducts > 0) filtered = filtered.filter((v) => v.totalProducts >= minProducts);
    if (minSales > 0) filtered = filtered.filter((v) => v.totalSales >= minSales);
    if (minRating > 0) filtered = filtered.filter((v) => v.avgRating >= minRating);

    if (radius > 0 && currentPosition) {
      filtered = filtered.filter((v) => {
        return v.addressesWithCoords?.some((addr) => {
          if (!addr.lat || !addr.lon) return false;
          const distance = getDistanceFromLatLonInKm(currentPosition.lat, currentPosition.lng, addr.lat, addr.lon);
          return distance <= radius;
        });
      });
    }

    onFilter(filtered);
  };

  const handleReset = () => {
    setName("");
    setStatus("all");
    setHasAddress(false);
    setMinProducts(0);
    setMinSales(0);
    setMinRating(0);
    setRadius(0);
    onFilter(vendors);
  };

  return (
    <FilterWrapper>
      <FieldsGrid>
        <Field>
          <label>Name</label>
          <StyledInput placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field>
          <label>Radius (km): {radius}</label>
          <StyledInput
            type="number"
            min={0}
            max={500}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </Field>
        <Field>
          <label>Status</label>
          <StyledSelect value={status} onChange={setStatus}>
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </StyledSelect>
        </Field>

        <Field style={{ alignSelf: "center" }}>
          <StyledCheckbox checked={hasAddress} onChange={(e) => setHasAddress(e.target.checked)}>
            Has Address
          </StyledCheckbox>
        </Field>

        <Field>
          <label>Min Products: {minProducts}</label>
          <StyledSlider min={0} max={100} value={minProducts} onChange={setMinProducts} />
        </Field>

        <Field>
          <label>Min Sales: {minSales}</label>
          <StyledSlider min={0} max={100} value={minSales} onChange={setMinSales} />
        </Field>

        <Field>
          <label>Min Rating</label>
          <Rate allowHalf value={minRating} onChange={setMinRating} />
        </Field>
      </FieldsGrid>

      <ButtonGroup>
        <Button type="primary" onClick={handleFilter}>
          Apply
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </ButtonGroup>
    </FilterWrapper>
  );
}
