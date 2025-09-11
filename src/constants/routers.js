export const AUTH_ROUTER_PATH = {
  LOGIN: { KEY: "LOGIN", PATH: "/login" },
  ROLE_SIGN_UP: { KEY: "ROLE_SIGN_UP", PATH: "/role-signup" },
  SIGN_UP: { KEY: "SIGN_UP", PATH: "/signup" },
  FORGOT_PASSWORD: { KEY: "FORGOT_PASSWORD", PATH: "/forgot-password" },
  UPDATE_PASSWORD: { KEY: "UPDATE_PASSWORD", PATH: "/update-password" },
  UPDATE_USER: { KEY: "UPDATE_USER", PATH: "/update-user" },
  DEPOSIT: { KEY: "DEPOSIT", PATH: "/deposit" },
  DEPOSIT_RESULT_PAGE: { KEY: "DEPOSIT_RESULT_PAGE", PATH: "/deposit/result" },
};

export const PUBLIC_ROUTER_PATH = {
  HOME_PAGE: { KEY: "HOME_PAGE", PATH: "/" },
  ABOUT: { KEY: "ABOUT", PATH: "/about" },
  PRODUCT_DETAIL: { KEY: "PRODUCT_DETAIL", PATH: "/product/:id" },
  SEARCH: { KEY: "SEARCH", PATH: "/search" },
  PRODUCT_VENDOR_PAGE: {
    KEY: "PRODUCT_VENDOR_PAGE",
    PATH: "/vendor/:vendorId",
  },
};

export const GLOBAL_ROUTER_PATH = {
  NOT_FOUND: { KEY: "NOT_FOUND", PATH: "*" },
};

export const PRIVATE_ROUTER_PATH = {
  CART: { KEY: "CART", PATH: "/cart" },
  ORDER_DETAIL: { KEY: "ORDER_DETAIL", PATH: "/order-detail" },
  ORDER_HISTORY: { KEY: "ORDER_HISTORY", PATH: "/order-history" },
  VENDOR_DASHBOARD: { KEY: "VENDOR_DASHBOARD", PATH: "/vendor-dashboard" },
  VENDOR_MANAGER_PRODUCT: { KEY: "VENDOR_MANAGER_PRODUCT", PATH: "products" },
  VENDOR_MANAGER_ORDER: { KEY: "VENDOR_MANAGER_ORDER", PATH: "orders" },
  VENDOR_MANAGER_TRANSACTION: { KEY: "VENDOR_MANAGER_TRANSACTION", PATH: "transaction" },
  ADMIN_DASHBOARD: { KEY: "ADMIN_DASHBOARD", PATH: "/admin-dashboard" },
  ADMIN_MANAGER_USER: { KEY: "ADMIN_MANAGER_USER", PATH: "/admin-dashboard/users" },
  ADMIN_MANAGER_PRODUCT: { KEY: "ADMIN_MANAGER_PRODUCT", PATH: "/admin-dashboard/products" },
  ADMIN_PAYMENT_HISTORY: { KEY: "ADMIN_PAYMENT_HISTORY", PATH: "/admin-dashboard/payment-history" },
  ADMIN_APPROVAL_VENDOR: { KEY: "ADMIN_APPROVAL_VENDOR", PATH: "/admin-dashboard/approval-vendor" },
};

export const ROUTER_PATH = {
  ...AUTH_ROUTER_PATH,
  ...GLOBAL_ROUTER_PATH,
  ...PUBLIC_ROUTER_PATH,
  ...PRIVATE_ROUTER_PATH,
};
