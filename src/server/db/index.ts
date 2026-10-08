import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let _db: NodePgDatabase<typeof schema> | null = null;

/**
 * Lazily creates the Drizzle client so the app can still boot
 * (and render SSR pages) when DATABASE_URL is not configured.
 */
export function getDb(): NodePgDatabase<typeof schema> {
  if (!_db) {
    const connectionString = process.env['DATABASE_URL'];
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    const pool = new Pool({
      connectionString,
      ssl: process.env['DATABASE_SSL'] === 'false' ? false : { rejectUnauthorized: false },
    });
    _db = drizzle(pool, { schema });
  }
  return _db;
}

export { schema };
