# Claude Instructions for Uniswap v4-SDK Documentation

## Project Context
This is the Uniswap documentation repository focusing on v4-SDK enhancement work. The v4-SDK documentation is currently minimal compared to other SDKs and needs significant expansion.

## Key Documentation Areas
- **Primary Focus**: `docs/sdk/v4/` - v4-SDK specific documentation
- **Reference Material**: `docs/contracts/v4/` - Related contract documentation
- **Comparison Base**: `docs/sdk/v3/` - v3-SDK structure for patterns

## Current v4-SDK State (Baseline)
- **Completion**: ~25% compared to v3-SDK standards
- **Existing**: Overview + 3 swap guides + comprehensive API reference
- **Missing**: Liquidity management, hooks integration, advanced guides, getting started

## Documentation Standards
- Follow existing v3-SDK guide structure and patterns
- Use practical TypeScript/JavaScript examples
- Include proper error handling and edge cases
- Maintain consistency with existing Uniswap documentation style
- Focus on developer experience and progressive learning

## Build Commands
- Run `npm run build` to validate documentation builds
- Check `npm run lint` for style consistency
- Auto-generated reference docs via `scripts/v4-sdk-docs-gen.sh`

## Key Files to Reference
- [v4-SDK Baseline Assessment](./v4-sdk-baseline-assessment.md) - Detailed current state analysis
- `docs/sdk/v4/overview.md` - Current starting point
- `docs/sdk/v3/guides/` - Template structure for v4 guides

## Important Notes
- Never commit without explicit user request
- Prefer editing existing files over creating new ones
- Focus on practical, actionable developer guidance
- Bridge the gap between v4 contracts and SDK abstractions