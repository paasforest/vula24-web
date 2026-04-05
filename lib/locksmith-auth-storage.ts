/** localStorage key for JWT after locksmith email/password login. */
export const LOCKSMITH_TOKEN_KEY = 'vula24_locksmith_token'

export function getLocksmithToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LOCKSMITH_TOKEN_KEY)
}

export function setLocksmithToken(token: string) {
  localStorage.setItem(LOCKSMITH_TOKEN_KEY, token)
}

export function clearLocksmithToken() {
  localStorage.removeItem(LOCKSMITH_TOKEN_KEY)
}
