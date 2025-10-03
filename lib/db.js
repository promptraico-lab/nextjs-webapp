import prisma from "@/lib/prisma";

// Function to update a user in the database
export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

// Export prisma as db for consistency with existing code
const db = prisma;
export default db;
