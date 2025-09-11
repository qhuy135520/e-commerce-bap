import React from "react";

export default function ChangeStatus({ selectOrder }) {
  return (
    <div>
      Bạn có muốn thay đổi trạng thái đơn hàng <b>{selectOrder.orderid.substring(0, 5)}</b>?
    </div>
  );
}
