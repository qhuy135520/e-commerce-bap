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

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function simplifyAddress(fullAddress) {
  if (!fullAddress) return "";
  const parts = fullAddress.split(",").map((p) => p.trim());
  const provinceKeywords = ["Thành phố", "Tỉnh", "City", "Province"];
  let provinceIndex = parts.findIndex((p) => provinceKeywords.some((k) => p.includes(k)));
  if (provinceIndex === -1) provinceIndex = parts.length - 1;
  return parts.slice(0, provinceIndex + 1).join(", ");
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
export function convertOrderToEmailPayload({ results, customerInfo }) {
  debugger;
  const allDetails = results.flatMap((r) => r.newOrderDetails);

  const subtotal = allDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const orders = allDetails.map((item) => ({
    image_url: item.product?.productImage[0]?.imageUrl || "https://via.placeholder.com/150",
    name: item.product.name,
    units: item.quantity,
    price: formatCurrency(item.price),
  }));

  return {
    order_id: results.map((r) => r.order.id).join(", "),
    orders,
    cost: {
      shipping: "Free Shipping",
      total: formatCurrency(total),
    },
    email: customerInfo.email,
  };
}
