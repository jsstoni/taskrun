import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

(async () => {
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION notify_new_job() RETURNS trigger AS $$
    BEGIN
      PERFORM pg_notify(
        'new_job',
        row_to_json(NEW)::text
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'trigger_notify_new_job'
      ) THEN
        CREATE TRIGGER trigger_notify_new_job
        AFTER INSERT ON jobs
        FOR EACH ROW
        EXECUTE FUNCTION notify_new_job();
      END IF;
    END;
    $$;
  `);
})();
