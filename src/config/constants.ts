export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1994'
    : `https://${process.env.VERCEL_URL || 'altay.wtf'}`

export const API_URL = `${APP_URL}/api`
