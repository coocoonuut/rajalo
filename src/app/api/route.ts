import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { longUrl } = await request.json();

    // Validate input
    if (!longUrl || typeof longUrl !== "string") {
      return NextResponse.json(
        { error: "longUrl is required" },
        { status: 400 }
      );
    }

    // Create a new temporal URL entry
    const newTemporalUrl = await prisma.temporalUrls.create({
      data: {
        longUrl,
        codeUrl: nanoid(6),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(newTemporalUrl, { status: 201 });
  } catch (error) {
    console.error("Error creating temporal URL:", error);
    return NextResponse.json(
      { error: "Failed to create temporal URL" },
      { status: 500 }
    );
  }
}