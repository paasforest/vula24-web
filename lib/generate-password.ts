/** Random 8-character password for new locksmith accounts (alphanumeric, no ambiguous chars). */
export function generateRandomPassword(length = 8): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrst23456789";
  let s = "";
  for (let i = 0; i < length; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}
