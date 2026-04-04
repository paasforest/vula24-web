import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  isNonEmptyString,
  isValidPhone,
  normalizePhone,
  isValidUrgency,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = isNonEmptyString(body.phone)
      ? normalizePhone(body.phone)
      : "";
    const location = isNonEmptyString(body.location)
      ? body.location.trim()
      : "";
    const service = isNonEmptyString(body.service)
      ? body.service.trim()
      : "";
    const urgencyRaw = isNonEmptyString(body.urgency)
      ? body.urgency.trim()
      : "";

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }
    if (!location) {
      return NextResponse.json(
        { error: "Location is required." },
        { status: 400 }
      );
    }
    if (!service) {
      return NextResponse.json(
        { error: "Service is required." },
        { status: 400 }
      );
    }
    if (!isValidUrgency(urgencyRaw)) {
      return NextResponse.json(
        { error: "Urgency must be ASAP, 30 min, or Flexible." },
        { status: 400 }
      );
    }

    const created = await prisma.customerRequest.create({
      data: {
        phone,
        location,
        service,
        urgency: urgencyRaw,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[POST /api/requests]", e);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }
}
