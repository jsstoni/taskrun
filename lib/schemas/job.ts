import { users } from '@/lib/schemas/user';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const jobMethodEnum = pgEnum('job_method', ['POST', 'PUT', 'DELETE']);

export const jobs = pgTable(
  'jobs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    scheduler: varchar('scheduler', { length: 150 }).notNull(),
    command: text('command').notNull(),
    method: jobMethodEnum('method').notNull(),
    metadata: text('metadata').notNull(),
    active: boolean('active').notNull().default(true),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [index('user_id').on(t.userId)]
);

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  user: one(users, {
    fields: [jobs.userId],
    references: [users.id],
  }),
  logs: many(logs),
}));

export const logStatusEnum = pgEnum('log_status', ['ok', 'failed']);

export const logs = pgTable(
  'logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    status: logStatusEnum('status').notNull(),
    response: text('response').notNull(),
    timeResponse: varchar('time_response').notNull(),
    jobId: uuid('job_id')
      .notNull()
      .references(() => jobs.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [index('job_id').on(t.jobId)]
);

export const logsRelations = relations(logs, ({ one }) => ({
  job: one(jobs, {
    fields: [logs.jobId],
    references: [jobs.id],
  }),
}));
