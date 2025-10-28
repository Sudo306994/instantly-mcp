/**
 * Vercel Serverless Function with OAuth Support
 * Uses mcp-handler package for ChatGPT compatibility
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { TOOLS_DEFINITION } from '../src/tools/index.js';
import { executeToolDirectly } from '../src/handlers/tool-executor.js';

// Create the base MCP handler
const baseHandler = createMcpHandler(
  (server) => {
    // Register all existing tools
    for (const tool of TOOLS_DEFINITION) {
      server.tool(
        tool.name,
        tool.description,
        // Convert JSON Schema to zod-like format
        tool.inputSchema as any,
        async (args: any, extra: any) => {
          try {
            // Extract API key from auth context
            const apiKey = extra?.auth?.extra?.apiKey;

            if (!apiKey) {
              throw new Error('API key required. Please provide your Instantly.ai API key.');
            }

            // Execute the tool using existing executor
            const result = await executeToolDirectly(tool.name, args, apiKey);

            // Return in MCP format
            return {
              content: [{
                type: 'text' as const,
                text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
              }]
            };
          } catch (error: any) {
            return {
              content: [{
                type: 'text' as const,
                text: `Error: ${error.message}`
              }],
              isError: true
            };
          }
        }
      );
    }
  },
  {
    name: 'instantly-mcp',
    version: '1.1.1',
  },
  { basePath: '/api' }
);

// Token verification function
const verifyToken = async (
  req: Request,
  bearerToken?: string,
): Promise<AuthInfo | undefined> => {
  if (!bearerToken) {
    console.error('[OAuth] No bearer token provided');
    return undefined;
  }

  // The bearer token IS the Instantly.ai API key
  if (bearerToken.length < 10) {
    console.error('[OAuth] Bearer token too short');
    return undefined;
  }

  console.error('[OAuth] Bearer token validated');

  return {
    token: bearerToken,
    scopes: ['read', 'write'],
    clientId: 'instantly-user',
    extra: {
      apiKey: bearerToken,
    },
  };
};

// Wrap handler with OAuth authentication
const authHandler = withMcpAuth(baseHandler, verifyToken, {
  required: true,
  requiredScopes: ['read'],
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
});

// Export Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Convert Vercel request to standard Request
    const url = `https://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method || 'GET',
      headers: req.headers as any,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : null,
    });

    // Call the MCP handler
    const response = await authHandler(request);

    // Convert Response to Vercel response
    const body = await response.text();
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.send(body);
  } catch (error: any) {
    console.error('[Handler Error]', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
