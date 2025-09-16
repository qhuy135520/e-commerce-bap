import { geocodeAddress } from "@/services/apiAddress";
import { vendorSelector } from "@/stores/rootSelector";
import { vendorThunk } from "@/stores/rootThunk";
import { simplifyAddress } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useSearchMapVendor() {
  const dispatch = useDispatch();
  const status = useSelector(vendorSelector.selectVendorStatus);
  const vendors = useSelector(vendorSelector.selectVendor);
  const error = useSelector(vendorSelector.selectVendorError);
  const [vendorsWithCoords, setVendorsWithCoords] = useState([]);
  const [coordsLoading, setCoordsLoading] = useState(false);

  useEffect(() => {
    dispatch(vendorThunk.fetchAllVendor());
  }, []);

  useEffect(() => {
    if (vendors && vendors.length > 0) {
      setCoordsLoading(true);

      async function fetchCoords() {
        try {
          const data = await Promise.all(
            vendors.map(async (v) => {
              if (!v.addresses || v.addresses.length === 0) return { ...v, addressesWithCoords: [] };

              const addressesWithCoords = await Promise.all(
                v.addresses.map(async (addr) => {
                  const coords = await geocodeAddress(addr.fullAddress);
                  return { ...addr, ...coords };
                })
              );

              return { ...v, addressesWithCoords };
            })
          );

          setVendorsWithCoords(data);
          setCoordsLoading(false);
        } catch (error) {
          throw error;
        }
      }

      fetchCoords();
    }
  }, [vendors]);

  const isLoading = ["loading", "idle"].includes(status) || coordsLoading;

  return { vendors, vendorsWithCoords, status, isLoading, error };
}
