import isValidUrl from "@/lib/isValidUrl";
import jsonResponse from "@/lib/jsonResponse";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { code: string } }) {
    const { code } = await params;

    if (!code) return jsonResponse({ error: "Code parameter is required" }, 400);

    let url;

    try {
        url = await prisma.temporalUrls.findUnique({
            where: { codeUrl: code },
        });
    } catch (err) {
        console.error("DB query error:", err);
        return jsonResponse({ error: "Failed to fetch URL" }, 500);
    }

    // Check if the URL exists
    if (!url) return jsonResponse({ error: "URL not found" }, 404);

    // Check if the URL has expired
    if (url.expiresAt < new Date()) return jsonResponse({ error: "URL has expired" }, 410);

    // Ensure the long URL is available
    if (!url.longUrl) return jsonResponse({ error: "Long URL is not available" }, 400);

    // Ensure the long URL is a valid URL
    if (!isValidUrl(url.longUrl)) return jsonResponse({ error: "Long URL is not valid" }, 400);

    // Redirect to the long URL
    return NextResponse.redirect(url.longUrl);
}