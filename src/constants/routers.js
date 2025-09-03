export const AUTH_ROUTER_PATH = {
  LOGIN: { KEY: 'LOGIN', PATH: '/login' },
  ROLE_SIGN_UP: { KEY: 'ROLE_SIGN_UP', PATH: '/role-signup' },
  SIGN_UP: { KEY: 'SIGN_UP', PATH: '/signup' },
  FORGOT_PASSWORD: { KEY: 'FORGOT_PASSWORD', PATH: '/forgot-password' },
  UPDATE_PASSWORD: { KEY: 'UPDATE_PASSWORD', PATH: '/update-password' },
}

export const PUBLIC_ROUTER_PATH = {
  HOME_PAGE: { KEY: 'HOME_PAGE', PATH: '/homepage' },
  ABOUT: { KEY: 'ABOUT', PATH: '/about' },
}

export const GLOBAL_ROUTER_PATH = {
  NOT_FOUND: { KEY: 'NOT_FOUND', PATH: '*' },
}

export const ROUTER_PATH = {
  ...AUTH_ROUTER_PATH,
  ...GLOBAL_ROUTER_PATH,
  ...PUBLIC_ROUTER_PATH,
}
