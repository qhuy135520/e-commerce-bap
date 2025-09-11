import { Loading, UpdateUserForm } from "@/components";

import { useTransactions } from "@/hooks/transactions/useTransactions";

export default function UpdateUserPage() {
  const { transaction, isLoading, error } = useTransactions();
  console.log(transaction);

  return (
    <Loading isLoading={isLoading} error={error}>
      <UpdateUserForm />;
    </Loading>
  );
}
