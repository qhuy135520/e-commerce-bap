import { DepositFrom, DepositHeader } from "@/components";
import { useDeposit } from "@/hooks/deposit/useDeposit";

export default function DepositPage() {
  const { handleBackToHome } = useDeposit();
  return (
    <>
      <DepositHeader onBackToHome={handleBackToHome} />
      <DepositFrom />
    </>
  );
}
