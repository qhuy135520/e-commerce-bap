export const AUTH_ROUTER_PATH = {
  LOGIN: { KEY: "LOGIN", PATH: "/login" },
  ROLE_SIGN_UP: { KEY: "ROLE_SIGN_UP", PATH: "/role-signup" },
  SIGN_UP: { KEY: "SIGN_UP", PATH: "/signup" },
  FORGOT_PASSWORD: { KEY: "FORGOT_PASSWORD", PATH: "/forgot-password" },
  UPDATE_PASSWORD: { KEY: "UPDATE_PASSWORD", PATH: "/update-password" },
  UPDATE_USER: { KEY: "UPDATE_USER", PATH: "/update-user" },
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
  ORDER_HISTORY: { KEY: "ORDER_HISTORY", PATH: "/order-history/:id" },
  VENDOR_DASHBOARD: { KEY: "VENDOR_DASHBOARD", PATH: "/vendor-dashboard" },
  VENDOR_MANAGER_PRODUCT: { KEY: "VENDOR_MANAGER_PRODUCT", PATH: "/vendor-dashboard/products" },
  ADMIN_DASHBOARD: { KEY: "ADMIN_DASHBOARD", PATH: "/admin-dashboard" },
};

export const ROUTER_PATH = {
  ...AUTH_ROUTER_PATH,
  ...GLOBAL_ROUTER_PATH,
  ...PUBLIC_ROUTER_PATH,
  ...PRIVATE_ROUTER_PATH,
};
