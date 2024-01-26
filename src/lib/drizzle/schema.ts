import { v4 } from 'uuid'

import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: text('id').$defaultFn(() => v4())
  .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
})
