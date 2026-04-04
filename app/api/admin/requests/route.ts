import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminUnauthorizedResponse,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!verifyAdminPassword(request)) {
    return adminUnauthorizedResponse();
  }

  try {
    const requests = await prisma.customerRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, requests });
  } catch (e) {
    console.error("[GET /api/admin/requests]", e);
    return NextResponse.json(
      { error: "Could not load requests." },
      { status: 500 }
    );
  }
}
