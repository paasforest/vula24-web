/** Railway API base — public so browser forms can call the API (CORS enabled on API). */
export function getVula24ApiBase(): string {
  const base =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_VULA24_API_URL
      ? process.env.NEXT_PUBLIC_VULA24_API_URL.trim()
      : 'https://vula24-api-production.up.railway.app'
  return base.replace(/\/$/, '')
}
