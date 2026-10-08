import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
