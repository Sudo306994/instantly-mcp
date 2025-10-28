/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728)
 * Required by ChatGPT to discover authentication requirements
 */

import {
  protectedResourceHandler,
  metadataCorsOptionsRequestHandler,
} from 'mcp-handler';

// Create the protected resource metadata handler
const handler = protectedResourceHandler({
  // This server acts as its own authorization server
  authServerUrls: ['https://instantly-mcp.vercel.app'],
});

// CORS handler for OPTIONS requests
const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
