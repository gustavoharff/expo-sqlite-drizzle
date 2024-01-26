import { db } from "@/lib/db";
import { useEffect, useState } from "react";

import { users as usersSchema } from '@/lib/drizzle/schema'

type User = typeof usersSchema.$inferSelect

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    (async () => {
      const result = await db.select().from(usersSchema)

      setUsers(result)
    })()
  }, [])

  return users
}
