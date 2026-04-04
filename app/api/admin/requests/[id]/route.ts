import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminUnauthorizedResponse,
  verifyAdminPassword,
} from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  if (!verifyAdminPassword(request)) {
    return adminUnauthorizedResponse();
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    const existing = await prisma.customerRequest.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const updated = await prisma.customerRequest.update({
      where: { id },
      data: { status: "assigned" },
    });

    return NextResponse.json({ ok: true, request: updated });
  } catch (e) {
    console.error("[PATCH /api/admin/requests/[id]]", e);
    return NextResponse.json(
      { error: "Could not update request." },
      { status: 500 }
    );
  }
}
