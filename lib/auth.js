import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

/**
 * Extracts and validates JWT token from request headers
 * @param {Request} request - The incoming request object
 * @returns {Object|null} - User object if token is valid, null otherwise
 */
export async function getUserFromToken(request) {
  try {
    // Get token from X-Auth-Token header
    const authHeader = request.headers.get("X-Auth-Token");

    if (!authHeader) {
      return null;
    }

    // Verify the JWT token
    const decoded = jwt.verify(authHeader, process.env.JWT_PRIVATE_KEY);

    if (!decoded || !decoded.id) {
      return null;
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        // Add other fields you want to include, excluding password
      },
    });

    return user;
  } catch (error) {
    console.error("Token validation error:", error);
    return null;
  }
}
