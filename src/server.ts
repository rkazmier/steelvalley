import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { apiRouter } from './server/api';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * PayU API proxy middleware to handle CORS issues
 */
app.use('/api/payu', createProxyMiddleware({
  target: 'https://merch-prod.snd.payu.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/payu': '',
  },
  onProxyReq: (proxyReq: any, req: any, res: any) => {
    // Add proper headers for PayU API
    proxyReq.setHeader('Origin', 'https://merch-prod.snd.payu.com');
    proxyReq.setHeader('Referer', 'https://merch-prod.snd.payu.com');
  },
  onProxyRes: (proxyRes: any, req: any, res: any) => {
    // Add CORS headers to response
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
} as any));

/**
 * REST API endpoints (backed by Postgres via Drizzle) — see src/server/api.ts
 */
app.use('/api', express.json(), apiRouter);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
