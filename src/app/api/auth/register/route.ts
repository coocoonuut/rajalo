import jsonResponse from "@/lib/jsonResponse";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const { username, email, password } = await request.json();

    // Validate the input data
    if (!username || !email || !password) {
        return jsonResponse({ error: "All fields are required" }, 400);
    }

    // Verify data types
    if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
        return jsonResponse({ error: "Invalid input types" }, 400);
    }

    try {
        // Create a new user in the database
        await prisma.user.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 10), // Hash password before storing
            },
        });

        return jsonResponse({ message: "User registered successfully" }, 201);
    } catch (err) {
        console.error(err);
        return jsonResponse({ error: "Failed to create user" }, 500);
    }
}