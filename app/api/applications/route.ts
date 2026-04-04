import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  isNonEmptyString,
  isValidPhone,
  normalizePhone,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const phone = isNonEmptyString(body.phone)
      ? normalizePhone(body.phone)
      : "";
    const city = isNonEmptyString(body.city) ? body.city.trim() : "";
    const experience = isNonEmptyString(body.experience)
      ? body.experience.trim()
      : "";
    const vehicle = isNonEmptyString(body.vehicle) ? body.vehicle.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }
    if (!city) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }
    if (!experience) {
      return NextResponse.json(
        { error: "Experience is required." },
        { status: 400 }
      );
    }
    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehicle information is required." },
        { status: 400 }
      );
    }

    const created = await prisma.locksmithApplication.create({
      data: {
        name,
        phone,
        city,
        experience,
        vehicle,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[POST /api/applications]", e);
    return NextResponse.json(
      { error: "Could not submit your application. Please try again." },
      { status: 500 }
    );
  }
}
