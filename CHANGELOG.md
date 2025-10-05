# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-05

### Added
- Initial release of react-twitch-live-embed
- `TwitchLive` component for embedding Twitch streams
- Full TypeScript support with comprehensive type definitions
- Automatic parent domain detection using `window.location.hostname`
- Support for all Twitch embed parameters:
  - `channel` - Twitch channel name
  - `parent` - Parent domain(s) with auto-detection
  - `width` / `height` - Responsive sizing (pixels or percentages)
  - `autoplay` - Automatic playback
  - `muted` - Audio muting
  - `allowFullscreen` - Fullscreen capability
  - `theme` - Light/dark themes
  - `time` - Start time for VODs
  - `className` - Custom styling
  - `id` - Custom iframe ID
- Comprehensive Storybook documentation with examples
- ESM and CommonJS build outputs
- Zero external dependencies (React peer dependency only)

### Documentation
- Complete README with usage examples
- API reference documentation
- Troubleshooting guide
- TypeScript usage examples
- SSR/Next.js integration guide

### Build & Tooling
- Vite-based build system
- TypeScript with strict mode
- Automated declaration file generation
- Storybook 9 for interactive documentation
- MIT License

[1.0.0]: https://github.com/KFlamsted/react-twitch-live-embed/releases/tag/v1.0.0
