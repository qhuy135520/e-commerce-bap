import { useEffect } from "react";

import {
  Loading,
  ProductsBanner,
  ProductsCategories,
  ProductsFeatureInLogo,
  ProductsList,
  ProductsPromo,
  ProductsRandom,
  ProductsSlider,
} from "@/components";

import useProducts from "@/hooks/products/useProducts";
import { useUser } from "@/hooks/authentication/useUser";
import { useLogout } from "@/hooks/authentication/useLogout";
import toast from "react-hot-toast";

export default function HomePage() {
  const { error, fetchDataProducts, vendorId, isLoading } = useProducts();
  const { user } = useUser();
  const { logout } = useLogout();

  useEffect(() => {
    if (user?.id) {
      if (user.status === "inactive") {
        logout();
        toast.error("Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.");
      }
    }
    fetchDataProducts();
  }, [vendorId, user]);

  return (
    <Loading isLoading={isLoading} error={error}>
      <ProductsBanner />
      <ProductsFeatureInLogo />
      <ProductsPromo />
      <ProductsCategories />
      <ProductsSlider />
      <ProductsList />
      <ProductsRandom />
    </Loading>
  );
}
