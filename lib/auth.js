import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

/**
 * Extracts and validates JWT token from request headers
 * @param {Request} request - The incoming request object
 * @returns {Object|null} - User object if token is valid, null otherwise
 */
export async function getUserFromToken(request) {
  try {
    // Get the cookies string from the request headers
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      throw new Error("No cookies provided");
    }

    // Parse the cookie to extract 'promptr-auth-token'
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((cookie) => {
        const [key, ...v] = cookie.trim().split("=");
        return [key, v.join("=")];
      })
    );

    const token = cookies["promptr-auth-token"];
    if (!token) {
      throw new Error("No token provided");
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (!decoded || !decoded.id) {
      throw new Error("Invalid token payload");
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        stripeCustomerId: true,
        bio: true,
        location: true,
        phone: true,
        // Add other fields you want to include, excluding password
        subscription: {
          select: {
            id: true,
            stripeSubId: true,
            plan: true,
            status: true,
            currentPeriodEnd: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Token validation error:", error);
    throw error;
  }
}
