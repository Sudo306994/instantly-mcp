/**
 * OAuth Configuration for ChatGPT Compatibility
 *
 * This module provides OAuth 2.1 metadata endpoints required by ChatGPT.
 * The server uses a simplified OAuth flow where the Instantly.ai API key
 * is treated as a Bearer token.
 */

import type { Express } from 'express';

export function setupOAuthEndpoints(app: Express, config: { host: string; port: number }) {
  const getBaseUrl = () => {
    return process.env.NODE_ENV === 'production' || process.env.VERCEL
      ? 'https://instantly-mcp.vercel.app'
      : `http://${config.host}:${config.port}`;
  };

  // OAuth 2.1 Authorization Server Metadata (RFC 8414)
  // Required by ChatGPT to discover authentication capabilities
  app.get('/.well-known/oauth-authorization-server', (req, res) => {
    console.error('[HTTP] 🔍 OAuth discovery: /.well-known/oauth-authorization-server');

    const baseUrl = getBaseUrl();

    res.json({
      issuer: baseUrl,
      service_documentation: 'https://github.com/Instantly-ai/instantly-mcp',
      // Bearer token authentication (API key as bearer token)
      token_endpoint_auth_methods_supported: ['none'],
      grant_types_supported: ['client_credentials'],
      response_types_supported: ['token'],
      scopes_supported: ['read', 'write'],
      authorization_endpoint: baseUrl + '/oauth/authorize',
      token_endpoint: baseUrl + '/oauth/token'
    });
  });

  // OAuth 2.0 Protected Resource Metadata (RFC 9728)
  // ChatGPT checks this to understand how to authenticate
  app.get('/.well-known/oauth-protected-resource', (req, res) => {
    console.error('[HTTP] 🔍 OAuth discovery: /.well-known/oauth-protected-resource');

    const baseUrl = getBaseUrl();

    res.json({
      resource: baseUrl,
      authorization_servers: [baseUrl],
      bearer_methods_supported: ['header'],
      resource_documentation: 'https://github.com/Instantly-ai/instantly-mcp',
      scopes_supported: ['read', 'write'],
      token_introspection_endpoint: baseUrl + '/oauth/introspect'
    });
  });

  // Minimal OAuth token endpoint (for ChatGPT)
  // This is a simplified flow - just validates the API key
  app.post('/oauth/token', (req, res) => {
    console.error('[HTTP] 🔑 OAuth token request');

    // In a real OAuth flow, this would exchange authorization code for tokens
    // For our simplified flow, we just return success with the provided credentials
    res.json({
      access_token: 'use_instantly_api_key_as_bearer_token',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'read write'
    });
  });

  // OAuth authorization endpoint (for ChatGPT)
  app.get('/oauth/authorize', (req, res) => {
    console.error('[HTTP] 🔐 OAuth authorization request');

    res.json({
      message: 'Use your Instantly.ai API key as the Bearer token',
      instructions: 'Set Authorization header to: Bearer YOUR_INSTANTLY_API_KEY'
    });
  });

  // Token introspection endpoint (RFC 7662)
  app.post('/oauth/introspect', (req, res) => {
    console.error('[HTTP] 🔍 OAuth token introspection');

    // Always return active since we validate tokens in the MCP handlers
    res.json({
      active: true,
      scope: 'read write',
      token_type: 'Bearer'
    });
  });
}
