"use server"

import { getUsers, deleteUserById } from "@/lib/actions/user.action"

export const dashboard = async () => {
  const users = await getUsers()
  return users
}

export const deleteUser = async (id: string) => {
  await deleteUserById(id)
}