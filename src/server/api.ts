import { Router, type Request, type Response, type NextFunction } from 'express';
import { desc, eq } from 'drizzle-orm';
import { getDb } from './db';
import { notes } from './db/schema';

export const apiRouter = Router();

apiRouter.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

/**
 * GET /api/health — health check (used by Render)
 */
apiRouter.get('/health', async (req, res) => {
  let database = 'not configured';
  if (process.env['DATABASE_URL']) {
    try {
      await getDb().execute('select 1');
      database = 'ok';
    } catch {
      database = 'error';
    }
  }
  res.json({ status: 'ok', database, timestamp: new Date().toISOString() });
});

/**
 * GET /api/notes — list all notes
 */
apiRouter.get('/notes', async (req, res, next) => {
  try {
    const result = await getDb().select().from(notes).orderBy(desc(notes.createdAt));
    return void res.json(result);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /api/notes/:id — get a single note
 */
apiRouter.get('/notes/:id', async (req, res, next) => {
  try {
    const id = Number(req.params['id']);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const [note] = await getDb().select().from(notes).where(eq(notes.id, id));
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return void res.json(note);
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /api/notes — create a note
 * Body: { "title": string, "content"?: string }
 */
apiRouter.post('/notes', async (req, res, next) => {
  try {
    const { title, content } = req.body ?? {};
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Field "title" is required' });
    }
    const [created] = await getDb()
      .insert(notes)
      .values({ title: title.trim(), content: content ?? null })
      .returning();
    return void res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
});

/**
 * PUT /api/notes/:id — update a note
 * Body: { "title"?: string, "content"?: string, "done"?: boolean }
 */
apiRouter.put('/notes/:id', async (req, res, next) => {
  try {
    const id = Number(req.params['id']);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const { title, content, done } = req.body ?? {};
    const changes: Partial<typeof notes.$inferInsert> = { updatedAt: new Date() };
    if (title !== undefined) changes.title = String(title);
    if (content !== undefined) changes.content = content === null ? null : String(content);
    if (done !== undefined) changes.done = Boolean(done);
    const [updated] = await getDb().update(notes).set(changes).where(eq(notes.id, id)).returning();
    if (!updated) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return void res.json(updated);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /api/notes/:id — delete a note
 */
apiRouter.delete('/notes/:id', async (req, res, next) => {
  try {
    const id = Number(req.params['id']);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const [deleted] = await getDb().delete(notes).where(eq(notes.id, id)).returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return void res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

/**
 * Error handler for API routes — returns JSON instead of HTML.
 */
apiRouter.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('[api] error:', err);
  res.status(500).json({ error: 'Internal server error' });
});
