import { differenceInDays, formatDistance, parseISO } from "date-fns";
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from "vn-provinces";

import { REPLACE_ADDRESS } from "@/constants/regex";

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  typeof value === "number" ? new Intl.NumberFormat("vi", { style: "currency", currency: "vnd" }).format(value) : 0;

export function formatFullAddress({ detail, ward, district, province }) {
  return (
    `${detail ? detail + ", " : ""}` +
    `${ward ? ward + ", " : ""}` +
    `${district ? district + ", " : ""}` +
    `${province || ""}`
  ).replace(REPLACE_ADDRESS, "");
}
export const formatNumberCurrency = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const parseNumberCurrency = (value) => value.replace(/\$\s?|(,*)/g, "");

function normalize(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function matchAddressPart(part, fullName) {
  const n1 = normalize(part);
  const n2 = normalize(fullName);

  return n2.endsWith(n1) || n1.endsWith(n2);
}

export function parseAddress(addressString) {
  const parts = addressString.split(",").map((p) => p.trim());

  const province = getProvinces().find((prov) => parts.some((p) => matchAddressPart(p, prov.name)));

  const district = province
    ? getDistrictsByProvinceCode(province.code).find((dist) => parts.some((p) => matchAddressPart(p, dist.name)))
    : null;

  const ward = district
    ? getWardsByDistrictCode(district.code).find((w) => parts.some((p) => matchAddressPart(p, w.name)))
    : null;

  const excludeNames = [province?.name, district?.name, ward?.name, "Vietnam"].filter(Boolean);

  const detail = parts.filter((p) => !excludeNames.some((ex) => matchAddressPart(p, ex))).join(", ");

  return {
    province: province?.code || "",
    district: district?.code || "",
    ward: ward?.code || "",
    detail,
  };
}

export const convertCartToTemplateParams = (cartItems, customerInfo) => {
  const ordersTable = cartItems
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.productName}</td>
          <td>${item.quantity}</td>
          <td>$${item.productPrice}</td>
          <td>$${item.productPrice * item.quantity}</td>
        </tr>
      `
    )
    .join("");

  const totalCost = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  return {
    order_id: Date.now(),
    orders: `
      <table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse; width:100%;">
        <thead>
          <tr>
            <th>#</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${ordersTable}
        </tbody>
      </table>
    `,
    image_url: cartItems[0]?.productImage || "https://via.placeholder.com/150",
    name: customerInfo.name,
    units: cartItems.reduce((sum, i) => sum + i.quantity, 0),
    price: "",
    cost: `$${totalCost}`,
    email: customerInfo.email,
  };
};
