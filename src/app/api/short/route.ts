import jsonResponse from "@/lib/jsonResponse";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const { longUrl } = await request.json();

  // Validate input
  if (!longUrl || typeof longUrl !== "string") {
    return jsonResponse({ error: "longUrl must be a valid string" }, 400);
  }

  try {
    const newTemporalUrl = await prisma.temporalUrls.create({
      data: {
        longUrl,
        codeUrl: nanoid(6),
        expiresAt: new Date(Date.now() + 30 * 1000),
      },
    });

    return jsonResponse(newTemporalUrl, 201);
  } catch (error) {
    console.error("Error creating temporal URL:", error);
    return jsonResponse({ error: "Failed to create temporal URL" }, 500);
  }
}