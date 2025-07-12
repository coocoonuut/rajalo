import jsonResponse from "@/lib/jsonResponse";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
    const { username, password } = await request.json();

    // Validate the input data
    if (!username || !password) {
        return jsonResponse({ error: "Username and password are required" }, 400);
    }

    // Verify data types
    if (typeof username !== "string" || typeof password !== "string") {
        return jsonResponse({ error: "Invalid input types" }, 400);
    }

    try {
        // Find the user in the database
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return jsonResponse({ error: "User not found" }, 404);
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return jsonResponse({ error: "Invalid password" }, 401);
        }

        return jsonResponse({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        return jsonResponse({ error: "Failed to login" }, 500);
    }
}