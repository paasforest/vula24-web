import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  isNonEmptyString,
  isValidEmail,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const message = isNonEmptyString(body.message) ? body.message.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const created = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[POST /api/contact]", e);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
