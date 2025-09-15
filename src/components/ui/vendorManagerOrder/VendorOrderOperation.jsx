import { useDispatch, useSelector } from "react-redux";

import { VendorManagerOrderTableStyled as VMOTS } from "@/components";

import { ordersSelector } from "@/stores/rootSelector";
import { ordersSlice } from "@/stores/rootReducer";

export default function VendorOrderOperation({ options }) {
  const dispatch = useDispatch();
  const currentFilter = useSelector(ordersSelector.selectFilterStatus);

  const handleClick = (filterValue) => {
    if (filterValue !== currentFilter) {
      dispatch(ordersSlice.setStatusFilter(filterValue));
    }
  };

  return (
    <VMOTS.ButtonFilterGroup>
      {options.map((option) => (
        <VMOTS.ButtonFilter
          key={option.value}
          onClick={() => handleClick(option.value)}
          type={option.value === currentFilter ? "primary" : "default"}
        >
          {option.label}
        </VMOTS.ButtonFilter>
      ))}
    </VMOTS.ButtonFilterGroup>
  );
}
