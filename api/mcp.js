/**
 * Vercel Serverless Function for Instantly MCP Server
 * This wraps the Express app from the MCP server for Vercel deployment
 */

import { createServer } from '../dist/vercel-adapter.js';

let serverInstance = null;

export default async function handler(req, res) {
  try {
    // Initialize server if not already created
    if (!serverInstance) {
      serverInstance = await createServer();
    }

    // Handle the request with the Express app
    return serverInstance(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
