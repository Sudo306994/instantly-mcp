/**
 * Vercel Adapter for Instantly MCP Server
 * Exports the Express app for serverless function deployment
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamingHttpTransport } from './streaming-http-transport.js';
import { registerMcpHandlers } from './handlers/mcp-handlers.js';

let cachedApp: any = null;

/**
 * Create and configure the Express app for Vercel
 */
export async function createServer() {
  // Return cached app if already created
  if (cachedApp) {
    return cachedApp;
  }

  console.error('[Vercel] Initializing Instantly MCP Server...');

  // Create MCP server instance
  const server = new Server(
    {
      name: 'instantly-mcp',
      version: '1.1.1',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register MCP handlers (apiKey is optional, not needed for Vercel deployment)
  registerMcpHandlers(server);

  // Configure HTTP transport
  const transport = new StreamingHttpTransport(server, {
    port: parseInt(process.env.PORT || '3000', 10),
    host: '0.0.0.0',
    cors: {
      origin: true, // Allow all origins in Vercel
      credentials: true,
    },
  });

  // Get the Express app without starting the HTTP server
  // We don't call transport.start() because Vercel handles the HTTP server
  const app = (transport as any).app;

  if (!app) {
    throw new Error('Failed to create Express app');
  }

  console.error('[Vercel] Express app initialized successfully');

  // Cache the app for subsequent requests
  cachedApp = app;

  return app;
}
