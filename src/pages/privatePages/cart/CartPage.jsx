import { useEffect, useRef } from "react";

import { CartHeader, CartTable } from "@/components";
import useCart from "@/hooks/cart/useCart";

export default function CartPage() {
  const submitRef = useRef(null);

  useEffect(() => {
    const handleUnload = () => {
      if (submitRef.current) {
        submitRef.current();
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      if (submitRef.current) {
        submitRef.current();
      }
    };
  }, []);

  const { cart, handleBackToHome } = useCart();

  return (
    <>
      <CartHeader itemCount={cart.length} onBackToShop={handleBackToHome} />
      <CartTable onMountSubmitRef={submitRef} />
    </>
  );
}
