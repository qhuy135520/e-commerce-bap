import { useUser } from "@/hooks/authentication/useUser";
import { productsSelector } from "@/stores/rootSelector";
import { productsThunk } from "@/stores/rootThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useVendorManager() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const products = useSelector(productsSelector.selectProductsVendor);
  useEffect(() => {
    if (user?.id) {
      dispatch(productsThunk.fetchProductsByVendor(user.id));
    }
  }, [dispatch, user]);

  return { products };
}
