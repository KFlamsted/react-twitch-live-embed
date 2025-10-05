# react-twitch-live-embed

A lightweight, TypeScript-first React component for embedding Twitch streams and channels into your application.

## Features

✨ **Simple API** - Just one component with intuitive props  
🎯 **TypeScript** - Full type safety and IntelliSense support  
🔒 **Auto-detection** - Parent domain automatically detected  
📱 **Responsive** - Support for both fixed and percentage-based sizing  
🎨 **Themeable** - Light and dark themes built-in  
⚡ **Zero Dependencies** - Only React as peer dependency  
🏗️ **Modern Build** - ESM and CommonJS outputs

## Installation

```bash
npm install react-twitch-live-embed
```

```bash
yarn add react-twitch-live-embed
```

```bash
pnpm add react-twitch-live-embed
```

## Quick Start

```tsx
import { TwitchLive } from 'react-twitch-live-embed';

function App() {
  return (
    <TwitchLive 
      channel="monstercat" 
      width={800} 
      height={450}
    />
  );
}
```

That's it! The component automatically detects your domain and handles all the Twitch embed configuration.

## Usage Examples

### Basic Usage

```tsx
import { TwitchLive } from 'react-twitch-live-embed';

function MyStream() {
  return <TwitchLive channel="shroud" />;
}
```

### Responsive Width

```tsx
<TwitchLive 
  channel="ninja" 
  width="100%" 
  height={450}
/>
```

### Light Theme

```tsx
<TwitchLive 
  channel="summit1g" 
  theme="light"
  width={800}
  height={450}
/>
```

### Muted Autoplay

```tsx
<TwitchLive 
  channel="pokimane" 
  autoplay={true}
  muted={true}
  width={800}
  height={450}
/>
```

### Start at Specific Time (VODs)

```tsx
<TwitchLive 
  channel="esl_csgo" 
  time="1h30m0s"
  width={800}
  height={450}
/>
```

### Custom Styling

```tsx
<TwitchLive 
  channel="riotgames" 
  className="my-custom-embed"
  width={800}
  height={450}
/>
```

### Multiple Parent Domains

```tsx
<TwitchLive 
  channel="dreamhackcs" 
  parent={['example.com', 'www.example.com', 'staging.example.com']}
  width={800}
  height={450}
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `channel` | `string` | **required** | Name of the Twitch channel to embed |
| `parent` | `string[]` | `[window.location.hostname]` | Parent domain(s) for embed security |
| `width` | `number \| string` | `940` | Width in pixels or percentage (e.g., `800` or `"100%"`) |
| `height` | `number \| string` | `480` | Height in pixels or percentage (e.g., `450` or `"50%"`) |
| `autoplay` | `boolean` | `true` | Start playing automatically |
| `muted` | `boolean` | `false` | Start with audio muted |
| `allowFullscreen` | `boolean` | `true` | Allow fullscreen mode |
| `theme` | `'light' \| 'dark'` | `'dark'` | Color theme for the player |
| `time` | `string` | `'0h0m0s'` | Start time for VODs (format: `"XhYmZs"`) |
| `className` | `string` | `undefined` | Custom CSS class name |
| `id` | `string` | `undefined` | Custom ID for the iframe |

### TypeScript

The package includes full TypeScript definitions:

```tsx
import type { TwitchLiveProps } from 'react-twitch-live-embed';

const MyComponent: React.FC = () => {
  const embedProps: TwitchLiveProps = {
    channel: 'esl_csgo',
    width: 800,
    height: 450,
    theme: 'dark',
  };

  return <TwitchLive {...embedProps} />;
};
```

## Advanced Usage

### Responsive Container

```tsx
function ResponsiveEmbed() {
  return (
    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
      <TwitchLive 
        channel="gamesdonequick" 
        width="100%"
        height={720}
      />
    </div>
  );
}
```

### Conditional Rendering

```tsx
function ConditionalStream({ isLive, channelName }) {
  if (!isLive) {
    return <p>Stream is offline</p>;
  }

  return (
    <TwitchLive 
      channel={channelName}
      width={800}
      height={450}
    />
  );
}
```

### Multiple Embeds

```tsx
function MultiStream() {
  const channels = ['shroud', 'summit1g', 'timthetatman'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {channels.map((channel) => (
        <TwitchLive
          key={channel}
          channel={channel}
          width="100%"
          height={300}
        />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Stream Not Loading

**Issue:** The embed shows "Video unavailable" or doesn't load.

**Solutions:**
1. Verify the channel name is correct
2. Check that the channel is live or has VODs
3. Ensure your domain is in the `parent` array (if specified)
4. Check browser console for CORS or CSP errors

### Parent Domain Issues

**Issue:** Getting "Embedding is not allowed" error.

**Solution:** Twitch requires parent domains to be specified. This package auto-detects `window.location.hostname`, but in some cases you may need to specify it explicitly:

```tsx
<TwitchLive 
  channel="yourChannel" 
  parent={['yourdomain.com', 'www.yourdomain.com']}
/>
```

### SSR (Server-Side Rendering)

**Issue:** Using with Next.js or other SSR frameworks.

**Solution:** The component uses `window.location.hostname` which isn't available during SSR. Either:

1. Explicitly provide the `parent` prop:
```tsx
<TwitchLive channel="channel" parent={['yourdomain.com']} />
```

2. Use dynamic imports:
```tsx
import dynamic from 'next/dynamic';

const TwitchLive = dynamic(
  () => import('react-twitch-live-embed').then((mod) => mod.TwitchLive),
  { ssr: false }
);
```

### Autoplay Not Working on Mobile

**Issue:** Video doesn't autoplay on mobile devices.

**Solution:** Mobile browsers typically block autoplay with sound. Use muted autoplay:

```tsx
<TwitchLive 
  channel="channel" 
  autoplay={true}
  muted={true}
/>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Kristian Flamsted

## Links

- [NPM Package](https://www.npmjs.com/package/react-twitch-live-embed)
- [GitHub Repository](#)
- [Twitch Embed Documentation](https://dev.twitch.tv/docs/embed/everything/)
- [Report Issues](#)

## Acknowledgments

Built with:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Storybook](https://storybook.js.org/)
