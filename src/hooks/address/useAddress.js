import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addressThunk } from "@/stores/rootThunk";
import { addressSlice } from "@/stores/rootReducer";
import { addressSelector } from "@/stores/rootSelector";
import { useUser } from "@/hooks/authentication/useUser";

export default function useAddress() {
  const dispatch = useDispatch();
  const { user } = useUser();

  const address = useSelector(addressSelector.selectAddresses);
  const status = useSelector(addressSelector.selectAddressStatus);
  const error = useSelector(addressSelector.selectAddressError);

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(addressThunk.fetchAddress(user.id));
    }
  }, [status, user, dispatch]);

  return { address, status, error };
}
