import { vendorSelector } from "@/stores/rootSelector";
import { vendorThunk } from "@/stores/rootThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useSearchMapVendor() {
  const dispatch = useDispatch();
  const status = useSelector(vendorSelector.selectVendorStatus);
  const isLoading = ["loading", "idle"].includes(status);
  const vendors = useSelector(vendorSelector.selectVendor);
  const error = useSelector(vendorSelector.selectVendorError);
  console.log(vendors);

  useEffect(() => {
    if (status === "idle") {
      dispatch(vendorThunk.fetchAllVendor());
    }
  }, [status]);

  return { vendors, status, isLoading, error };
}
