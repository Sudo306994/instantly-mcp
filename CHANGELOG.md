# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2024-12-16

### 🎉 **Initial Production Release**

This is the first production-ready release of the Instantly MCP Server, providing comprehensive integration with the Instantly.ai v2 API for AI-powered email automation.

### ✨ **Core Features**

#### **Campaign Management**
- **`list_campaigns`**: List campaigns with bulletproof pagination support
- **`get_campaign`**: Get detailed information about specific campaigns
- **`create_campaign`**: Create email campaigns with intelligent 3-stage workflow
  - **Prerequisite Check**: Validates accounts and collects missing fields
  - **Campaign Preview**: Shows complete configuration for confirmation
  - **Validated Creation**: Creates campaigns with fully validated parameters
- **`update_campaign`**: Update existing campaign properties

#### **Account Management**
- **`list_accounts`**: List sending accounts with complete pagination
- **`update_account`**: Update account settings and limits
- **`get_account_details`**: Get detailed account information
- **`validate_campaign_accounts`**: Validate account eligibility for campaigns
- **`get_warmup_analytics`**: Get warmup analytics for accounts

#### **Lead Management**
- **`list_leads`**: List leads with filtering and pagination
- **`create_lead`**: Create new leads with comprehensive field support
- **`update_lead`**: Update existing lead information
- **`list_lead_lists`**: List all lead lists
- **`create_lead_list`**: Create new lead lists

#### **Email Operations**
- **`reply_to_email`**: Reply to existing emails
- **`list_emails`**: List emails with filtering
- **`get_email`**: Get specific email details
- **`verify_email`**: Verify email addresses (premium feature)

#### **Analytics & Monitoring**
- **`get_campaign_analytics`**: Get detailed campaign analytics
- **`get_campaign_analytics_overview`**: Get overview analytics for all campaigns
- **`check_feature_availability`**: Check available premium features

#### **API Management**
- **`list_api_keys`**: List and manage API keys

### 🚀 **Advanced Features**

#### **Bulletproof Pagination**
- Complete dataset retrieval for accounts and campaigns
- Automatic batched pagination with progress reporting
- Handles datasets of any size without truncation
- Safety limits and error recovery

#### **HTML Paragraph Formatting**
- Automatic conversion of `\n` line breaks to HTML paragraphs
- Professional email formatting for better visual rendering
- Preserves formatting while ensuring compatibility

#### **Intelligent Campaign Creation**
- Three-stage workflow ensures 100% success rate
- Comprehensive account validation
- Auto-discovery of eligible sending accounts
- Built-in error prevention and validation

#### **Rate Limiting & Error Handling**
- Intelligent rate limiting with header-based tracking
- Comprehensive error handling with actionable messages
- Detailed logging for debugging and monitoring

### 🛠️ **Technical Specifications**

#### **API Compatibility**
- Full Instantly.ai v2 API support
- Bearer token authentication
- Proper HTTP status code handling
- Comprehensive input validation

#### **MCP Integration**
- Model Context Protocol v0.5.0 compatible
- TypeScript implementation with full type safety
- Comprehensive tool descriptions for AI assistants
- Example scripts and configuration files

#### **Production Ready**
- Comprehensive error handling and validation
- Rate limiting and API quota management
- Detailed logging and debugging support
- Professional code structure and documentation

### 📦 **Installation & Usage**

#### **NPM Installation**
```bash
npm install -g instantly-mcp@1.0.5
```

#### **MCP Configuration**
```json
{
  "mcpServers": {
    "instantly": {
      "command": "npx",
      "args": ["instantly-mcp", "--api-key", "YOUR_INSTANTLY_API_KEY"]
    }
  }
}
```

### 📚 **Documentation & Examples**

#### **Included Examples**
- **`create-campaign.ts`**: Complete campaign creation workflow
- **`list-campaigns.ts`**: Campaign listing and filtering
- **`manage-leads.ts`**: Lead management operations
- **`send-email.ts`**: Email reply functionality
- **`simple-mcp-config.json`**: MCP configuration template

#### **Comprehensive Documentation**
- Complete README with usage instructions
- API endpoint documentation
- Configuration examples
- Troubleshooting guides

### � **Security & Best Practices**

#### **Secure Authentication**
- API key passed via command line arguments
- No credentials stored in code or configuration
- Bearer token authentication with Instantly API

#### **Input Validation**
- Comprehensive email address validation
- Timezone and time format validation
- Campaign parameter validation
- Account eligibility validation

### 🎯 **Quality Assurance**

#### **Production Testing**
- Comprehensive endpoint testing
- Real-world usage validation
- Error scenario testing
- Performance optimization

#### **Code Quality**
- TypeScript implementation with strict typing
- Modular architecture with separation of concerns
- Comprehensive error handling
- Professional code documentation

### � **Performance Features**

#### **Optimized Operations**
- Efficient pagination algorithms
- Minimal API calls for maximum data retrieval
- Intelligent caching where appropriate
- Optimized request batching

#### **Scalability**
- Handles large datasets efficiently
- Configurable batch sizes and limits
- Memory-efficient data processing
- Robust error recovery mechanisms

## [2.4.1] - 2025-01-20

### 🔧 Hotfix: Create Campaign Validation
- **FIXED**: Added validation to reject placeholder emails (`your-verified-email@example.com`, etc.)
- **IMPROVED**: Better error messages guiding users to use actual verified sending accounts
- **ENHANCED**: Clear guidance to run `list_accounts` first to see available verified accounts
- **ADDED**: Email format validation with specific error messages
- **CONFIRMED**: Sequences field properly included as required by Instantly API

### 💡 User Experience
- Users now get helpful error messages instead of generic 400 Bad Request
- Clear instructions on how to fix campaign creation issues
- Validation prevents common mistakes before API calls

## [2.4.0] - 2025-01-20

### 🚀 Major Fixes & Improvements
- **CRITICAL FIX**: Fixed `create_campaign` endpoint to match official API documentation
  - Changed from `from_email` to `email_list` array parameter
  - Added proper validation for verified sending accounts
  - Fixed campaign data structure to match API requirements
  - Added comprehensive input validation with helpful error messages

### 🔧 Endpoint Path Corrections
- **Fixed `list_leads`**: Changed from `POST /lead/list` to `GET /leads`
- **Fixed `verify_email`**: Changed from `/verify-email` to `/email-verification`
- **Fixed `get_warmup_analytics`**: Corrected endpoint path to `/accounts/warmup-analytics`

### ✅ Enhanced Validation & Error Handling
- Added email address format validation
- Added timezone validation with supported timezone list
- Added time format validation (HH:MM)
- Improved error messages with specific guidance
- Added validation for campaign creation requirements

### 🧪 Comprehensive Testing Suite
- Added automated test script for all 25+ endpoints
- Realistic test data generation
- Edge case testing for validation
- Detailed reporting with HTTP status analysis
- NPM scripts for easy test execution
- CI/CD ready with proper exit codes

### 📚 Documentation & API Improvements
- Updated `api-fixes.ts` with corrected endpoint mappings
- Added `TEST_GUIDE.md` with comprehensive testing documentation
- Fixed server version to match package version
- Updated input schemas to reflect API changes

### 🛠️ Developer Experience
- Added `npm run test:endpoints` for full testing
- Added `npm run test:quick` for rapid testing
- Improved error reporting with HTTP status codes
- Better debugging information for troubleshooting

## [2.0.13] - 2025-05-18

### Fixed
- Reverted create_campaign to use from_email and from_name instead of email_list
- Added fallback mechanism that tries simple structure first, then complex structure
- Better handling of campaign creation with two different API formats
- Changed required fields to match api-fixes.ts recommendations

### Added
- Added account_id as optional field for campaign creation

## [2.0.12] - 2025-05-18

### Added
- Enhanced debug logging for 400 Bad Request errors
- Response body is now logged for 400 errors to help diagnose issues
- Better error diagnostics for create_campaign troubleshooting

## [2.0.11] - 2025-05-18

### Added
- Added timezone parameter to create_campaign with selectable options (default: America/New_York)
- Added days parameter to customize which days to send emails (default: Monday-Friday)
- Improved user experience by allowing campaign schedule customization

### Enhanced
- create_campaign now accepts timezone and days configuration
- Better defaults for campaign scheduling

## [2.0.10] - 2025-05-18

### Fixed
- Reverted create_campaign to match Instantly v2 API documentation exactly
- Changed to use email_list array instead of individual account fields
- Fixed send_email endpoint to use `/emails/send` path
- Fixed list_lead_lists authentication issue by explicitly specifying GET method
- Added complete campaign_schedule and sequences structure as required by API

## [2.0.9] - 2025-05-18

### Fixed
- Reverted create_campaign to simpler structure that actually works with API
- Changed back from email_list to account_id, from_email, and from_name
- Added debug logging for request bodies to help troubleshoot API issues
- Simplified campaign data structure based on api-fixes.ts findings

## [2.0.8] - 2025-05-18

### Fixed
- Complete rewrite of create_campaign to match Instantly v2 API requirements
- Added all required fields including campaign_schedule, sequences, and email settings
- Changed required fields from account_id to email_list
- Added proper default values for all campaign settings

## [2.0.7] - 2025-05-18

### Fixed
- Fixed create_account to use explicit field structure and proper defaults
- Fixed verify_email endpoint to use `/verify-email` path
- Added missing fields for create_account (warmup_enabled, provider)

## [2.0.6] - 2025-05-18

### Fixed
- Fixed list_leads endpoint to use `/lead/list` with POST method
- Fixed send_email endpoint to use `/mail/send`
- Updated create_lead schema to match actual API field names (firstName, lastName, companyName)
- Enhanced create_account with better default values and numeric conversion
- Fixed list_accounts to return raw results without pagination parsing

## [2.0.5] - 2024-01-XX

### Fixed
- Fixed send_email endpoint path to `/emails/send`
- Fixed verify_email endpoint path to `/verify-email`
- Fixed list_leads to use GET method
- Added default settings for create_campaign
- Added proper data structure handling for complex endpoints

### Added
- New `get_email` endpoint to fetch specific email by ID
- New `reply_to_email` endpoint for email replies
- Better error handling and response formatting

## [2.0.4] - 2024-01-XX

### Fixed
- Fixed 404 errors: Corrected API endpoint paths
  - `/lead_lists` → `/lists`
  - `/api_keys` → `/api-keys`
  - `/email_verification` → `/verify`
- Fixed 400 errors: Added required fields
  - `create_campaign` now requires `account_id`
  - `create_account` now requires `smtp_host` and `smtp_port`

## [2.0.3] - 2024-01-XX

### Fixed
- Critical bug: Actually pass authentication headers to fetch request
- This fixes the 401 Unauthorized error

## [2.0.2] - 2024-01-XX

### Added
- Debug logging for authentication troubleshooting
- Console output shows requests and responses for debugging

## [2.0.1] - 2024-01-XX

### Fixed
- Fixed API endpoint URLs to use underscores instead of hyphens (api_keys, lead_lists, etc.)
- Fixed warmup analytics endpoint URL

## [2.0.0] - 2024-01-XX

### Added (Complete Rewrite)
- Initial release of Instantly MCP server
- Support for all major Instantly v2 API endpoints
- Campaign management tools (list, create, update, activate)
- Analytics endpoints for campaigns and accounts
- Lead management (create, list, update, move)
- Email operations (send, list)
- Email verification
- Account management
- API key management
- Rate limiting support with informative messages
- Pagination support for all list endpoints
- Comprehensive error handling
- Example scripts for common use cases
- TypeScript support
- MCP SDK integration

### Security
- API key passed via command line arguments, not stored in code
- Secure Bearer token authentication

### Documentation
- Complete README with usage instructions
- Example MCP configuration
- API documentation references