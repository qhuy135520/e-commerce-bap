import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { VendorManagerOrderTableStyled as VMOTS } from "@/components";

export default function ChangeStatus({ selectOrder, updateOrderStatus }) {
  const { t } = useTranslation(["vendor"]);

  return (
    <div>
      {t("modalStatus.confirmChange")} <b>{selectOrder.orderid.substring(0, 5)}</b> {t("modalStatus.toStatus")}?
      <VMOTS.ButtonGroupStatus>
        <Button danger onClick={() => updateOrderStatus(selectOrder, "canceled")}>
          {t("modalStatus.cancelOrder")}
        </Button>
        <Button type="primary" onClick={() => updateOrderStatus(selectOrder, "shipped")}>
          {t("modalStatus.prepared")}
        </Button>
      </VMOTS.ButtonGroupStatus>
    </div>
  );
}
