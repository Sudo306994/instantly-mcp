/**
 * OAuth 2.0 Protected Resource Metadata Endpoint
 * Required by ChatGPT to discover authentication requirements
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { protectedResourceHandler, metadataCorsOptionsRequestHandler } from 'mcp-handler';

const handler = protectedResourceHandler({
  authServerUrls: ['https://instantly-mcp.vercel.app'],
});

const corsHandler = metadataCorsOptionsRequestHandler();

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const url = `https://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method || 'GET',
      headers: req.headers as any,
    });

    // Handle OPTIONS (CORS preflight)
    if (req.method === 'OPTIONS') {
      const response = await corsHandler(request);
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      return res.status(response.status).send('');
    }

    // Handle GET request
    const response = await handler(request);
    const body = await response.text();

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(response.status).send(body);
  } catch (error: any) {
    console.error('[OAuth Metadata Error]', error);
    res.status(500).json({
      error: 'Failed to serve OAuth metadata',
      message: error.message
    });
  }
}
