import { useEffect, useRef } from "react";

import { CartHeader, CartTable } from "@/components";

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

  return (
    <>
      <CartHeader />
      <CartTable onMountSubmitRef={submitRef} />
    </>
  );
}
