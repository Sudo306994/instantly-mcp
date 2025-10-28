/**
 * Vercel Serverless Function for Instantly MCP Server
 * This wraps the Express app from the MCP server for Vercel deployment
 */

let serverInstance = null;

export default async function handler(req, res) {
  try {
    console.log('[Vercel] Handler invoked:', req.method, req.url);

    // Initialize server if not already created
    if (!serverInstance) {
      console.log('[Vercel] Initializing server instance...');

      // Dynamic import to ensure module is loaded
      const { createServer } = await import('../dist/vercel-adapter.js');
      console.log('[Vercel] Module loaded successfully');

      serverInstance = await createServer();
      console.log('[Vercel] Server instance created');
    }

    console.log('[Vercel] Handling request with Express app');
    // Handle the request with the Express app
    return serverInstance(req, res);
  } catch (error) {
    console.error('[Vercel] Error handling request:', error);
    console.error('[Vercel] Error stack:', error.stack);

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
