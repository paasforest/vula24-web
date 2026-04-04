/**
 * Verifies admin API access using ADMIN_PASSWORD.
 * Accepts: Authorization: Bearer <password> or X-Admin-Password: <password>
 */
export function verifyAdminPassword(request: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length === 0) {
    return false;
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7).trim();
    return token === expected;
  }

  const header = request.headers.get("x-admin-password");
  if (header != null && header === expected) {
    return true;
  }

  return false;
}

export function adminUnauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
