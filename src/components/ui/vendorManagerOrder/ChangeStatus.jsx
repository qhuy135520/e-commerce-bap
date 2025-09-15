import { Button } from "antd";
import React from "react";

import { VendorManagerOrderTableStyled as VMOTS } from "@/components";

export default function ChangeStatus({ selectOrder, updateOrderStatus }) {
  return (
    <div>
      Bạn có muốn thay đổi trạng thái đơn hàng <b>{selectOrder.orderid.substring(0, 5)}</b> thành?
      <VMOTS.ButtonGroupStatus>
        <Button danger onClick={() => updateOrderStatus(selectOrder, "canceled")}>
          Hủy đơn
        </Button>
        <Button type="primary" onClick={() => updateOrderStatus(selectOrder, "shipped")}>
          Đã chuẩn bị xong
        </Button>
      </VMOTS.ButtonGroupStatus>
    </div>
  );
}
