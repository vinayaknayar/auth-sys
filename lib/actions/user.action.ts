import { db } from "../database.connection";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

// get all users
export const getUsers = async () => {
  try {
    const users = await db.user.findMany();
    console.log("users", users);
    return users;
  } catch (error) {
    console.log("Error in getUsers", error);
    return null;
  }
};


// Delete user by ID
export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await db.user.delete({ where: { id } });
    console.log("Deleted user:", deletedUser);
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
};