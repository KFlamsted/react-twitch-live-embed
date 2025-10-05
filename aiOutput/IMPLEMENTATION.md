# React Twitch Live Embed - Implementation Plan

## Project Overview

**Package Name:** `react-twitch-live-embed`

**Purpose:** A lightweight, TypeScript-first React component library that provides a simple, declarative way to embed Twitch streams and channels into React applications.

**Core Value Proposition:**
- Single, easy-to-use `<TwitchLive>` component
- Full TypeScript support with comprehensive type definitions
- Wraps the Twitch Embed API in a React-friendly interface
- Zero external dependencies (except React peer dependency)

## Technical Architecture

### Technology Stack
- **TypeScript** - For type safety and better developer experience
- **React 18+** - Peer dependency, leveraging modern React features (hooks, concurrent features)
- **Vite** - Build tool for both development and production builds
- **Storybook** - Interactive documentation and component showcase

### Build Configuration
- **Library Mode:** Using Vite's library mode to bundle as an npm package
- **Output Formats:** ESM and CommonJS for maximum compatibility
- **Tree Shaking:** Ensure the package is tree-shakeable
- **Type Definitions:** Generate `.d.ts` files for TypeScript consumers

## Component Design

### Component: `<TwitchLive>`

#### Implementation Strategy
The component will use an **iframe-based approach** to embed the Twitch player, utilizing the official Twitch Embed URL structure.

#### Key Features
1. **Lifecycle Management:**
   - Use `useRef` to maintain iframe reference
   - Use `useEffect` to handle iframe creation and cleanup
   - Handle dynamic prop updates appropriately

2. **Responsive Design:**
   - Support both fixed dimensions (px) and responsive dimensions (%)
   - Maintain proper aspect ratio
   - Container-based sizing

3. **Type Safety:**
   - Strict TypeScript interfaces for all props
   - Proper type exports for consumer applications

### Component Props

```typescript
interface TwitchLiveProps {
  // Required
  channel: string;
  
  // Optional with sensible defaults
  parent?: string[];              // default: [window.location.hostname]
  allowFullscreen?: boolean;      // default: true
  autoplay?: boolean;             // default: true
  muted?: boolean;                // default: false
  theme?: 'light' | 'dark';       // default: 'dark'
  width?: number | string;        // default: 940
  height?: number | string;       // default: 480
  time?: string;                  // default: '0h0m0s'
  
  // Additional useful props
  className?: string;             // For custom styling
  id?: string;                    // For custom identification
}
```

### Implementation Approach

**Option 1: Direct iframe (Recommended)**
- Construct Twitch embed URL with query parameters
- Render standard HTML `<iframe>` element
- Simpler, more predictable, easier to maintain
- Better for SSR/SSG scenarios

**Option 2: Twitch Embed SDK**
- Load Twitch's JavaScript SDK
- Use their API to instantiate player
- More complex, requires script loading
- Better control over player methods (if needed in future)

**Decision:** Start with **Option 1 (Direct iframe)** for MVP, as it:
- Requires no external script loading
- Is more lightweight
- Meets all stated requirements
- Can be enhanced later if needed

## Project Structure

```
react-twitch-embedded/
├── src/
│   ├── components/
│   │   └── TwitchLive/
│   │       ├── TwitchLive.tsx          # Main component
│   │       ├── TwitchLive.types.ts     # TypeScript interfaces
│   │       └── index.ts                # Barrel export
│   ├── utils/
│   │   └── buildEmbedUrl.ts            # URL construction logic
│   ├── index.ts                        # Package entry point
│   └── vite-env.d.ts                   # Vite type declarations
├── stories/
│   └── TwitchLive.stories.tsx          # Storybook stories
├── .storybook/
│   ├── main.ts                         # Storybook configuration
│   └── preview.ts                      # Storybook preview config
├── dist/                               # Build output (gitignored)
├── package.json
├── tsconfig.json                       # TypeScript config
├── tsconfig.node.json                  # Node-specific TS config
├── vite.config.ts                      # Vite configuration
├── .gitignore
├── README.md                           # Usage documentation
├── LICENSE                             # MIT or similar
└── IMPLEMENTATION.md                   # This file
```

## Implementation Phases

### Phase 1: Project Setup
1. Initialize npm package with proper metadata
2. Configure TypeScript with strict mode
3. Set up Vite for library mode
4. Configure build scripts and exports
5. Set up basic .gitignore and npm ignore files

### Phase 2: Core Component
1. Create TypeScript interfaces for props
2. Implement `TwitchLive` component with iframe
3. Create URL builder utility for Twitch embed URLs
4. Add prop validation and sensible defaults
5. Implement proper error boundaries (if needed)

### Phase 3: Storybook Setup
1. Install and configure Storybook for React + Vite
2. Create comprehensive stories showcasing:
   - Basic usage with different channels
   - All prop combinations
   - Responsive sizing examples
   - Theme variations (light/dark)
   - Autoplay and muted states
3. Add Storybook documentation pages

### Phase 4: Documentation & Testing
1. Write comprehensive README with:
   - Installation instructions
   - Basic usage examples
   - API documentation (all props)
   - Live examples/CodeSandbox links
   - Troubleshooting section
2. Add inline JSDoc comments for better IDE support
3. Consider basic vitest tests (optional for v1.0)

### Phase 5: NPM Publishing Preparation
1. Set proper package.json fields:
   - `name`, `version`, `description`
   - `keywords` for discoverability
   - `repository`, `bugs`, `homepage`
   - `license`, `author`
   - `main`, `module`, `types` entry points
   - `exports` map for modern Node.js
   - `peerDependencies` for React
   - `files` array to control what's published
2. Add prepublish scripts
3. Test local installation with `npm pack`
4. Create GitHub repository (recommended)
5. Write CHANGELOG.md

## Key Technical Decisions

### 1. Twitch Embed URL Format
Based on Twitch documentation, the embed URL will be:
```
https://player.twitch.tv/?channel={CHANNEL}&parent={PARENT}
```
With additional query parameters for all customization options.

### 2. Parent Domain Requirement
The `parent` prop will be **optional** and default to `[window.location.hostname]` when not provided. This approach:
- Automatically works in any environment (localhost, staging, production)
- Eliminates the need for developers to manually specify it during development
- Still allows explicit override when needed (e.g., for multiple domains)
- Handles the common case seamlessly while maintaining flexibility

**Implementation:**
```typescript
const parentDomains = parent ?? [window.location.hostname];
```

**Note:** For SSR environments where `window` is unavailable, we'll need a fallback or require the prop to be explicitly set.

### 3. Responsive Sizing
Support both pixel values and percentage strings:
- Numbers → convert to `{value}px`
- Strings → pass through as-is (allows `"100%"`, `"50vh"`, etc.)

### 4. TypeScript Configuration
- `strict: true` for maximum type safety
- Generate declaration files (`.d.ts`)
- Target ES2020+ for modern browsers
- Use `"moduleResolution": "bundler"` for Vite compatibility

### 5. React Compatibility
- Peer dependency: `"react": ">=18.0.0"`
- Use functional components with hooks only
- No class components
- Follow React 18+ best practices

## Package.json Key Fields

```json
{
  "name": "react-twitch-live-embed",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/react-twitch-live-embed.cjs",
  "module": "./dist/react-twitch-live-embed.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/react-twitch-live-embed.js",
      "require": "./dist/react-twitch-live-embed.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": ">=18.0.0"
  }
}
```

## Success Criteria

### Must Have (v1.0.0)
- ✅ Working `<TwitchLive>` component with all specified props
- ✅ TypeScript definitions exported
- ✅ Builds successfully with Vite
- ✅ Storybook with interactive examples
- ✅ Comprehensive README
- ✅ Proper npm package structure
- ✅ Tested installation in a fresh React project

### Nice to Have (Future Versions)
- Unit tests with Vitest + React Testing Library
- E2E tests with Playwright
- CI/CD pipeline (GitHub Actions)
- Automated releases
- Additional features: chat embed, clips, collections
- Player control methods (play, pause, etc.) via Twitch SDK
- Event callbacks (onReady, onPlay, onPause, etc.)

## Development Workflow

1. **Initial Setup:** Scaffold project with all configs
2. **Development:** Build component with hot reload via Storybook
3. **Testing:** Manually test in Storybook, later add automated tests
4. **Building:** Run Vite build to generate dist files
5. **Local Testing:** Use `npm link` or `npm pack` to test in another project
6. **Publishing:** `npm publish` once ready

## Open Questions / Decisions Needed

1. **License:** MIT, Apache 2.0, or other?
2. **Package Scope:** Should it be scoped (e.g., `@KFlamsted/react-twitch-live-embed`)?
3. **Error Handling:** How should we handle invalid channels or missing required props?
4. **SSR Support:** Should we handle server-side rendering scenarios? (Important given our `window.location.hostname` default)
   - Option A: Detect SSR environment and skip rendering iframe on server
   - Option B: Require `parent` prop in SSR environments
   - Option C: Accept optional `defaultParent` prop as SSR-safe fallback

## Timeline Estimate

- **Phase 1 (Setup):** 1-2 hours
- **Phase 2 (Core Component):** 2-3 hours
- **Phase 3 (Storybook):** 1-2 hours
- **Phase 4 (Documentation):** 1-2 hours
- **Phase 5 (Publishing Prep):** 1 hour

**Total:** Approximately 6-10 hours for a complete v1.0.0 ready for npm.

## Next Steps

Once this implementation plan is approved:
1. Initialize the npm package and install dependencies
2. Configure TypeScript, Vite, and project structure
3. Implement the core `TwitchLive` component
4. Set up and populate Storybook
5. Write documentation
6. Prepare for npm publishing

---

**Document Version:** 1.0  
**Last Updated:** October 5, 2025  
**Status:** Awaiting approval to begin implementation
