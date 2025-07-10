import { NextResponse } from "next/server";

export default function jsonResponse(data: object, status: number = 200) {
    return NextResponse.json(data, { status });
}