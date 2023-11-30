export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1994'
    : process.env.VERCEL_URL

export const API_URL = `${APP_URL}/api`
