# Quick Start Examples

Copy and paste these examples to get started quickly!

## Basic React App

```tsx
import React from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function App() {
  return (
    <div className="App">
      <h1>My Twitch Stream</h1>
      <TwitchLive 
        channel="monstercat" 
        width={800} 
        height={450}
      />
    </div>
  );
}

export default App;
```

## Next.js (App Router)

```tsx
// app/page.tsx
'use client';

import { TwitchLive } from 'react-twitch-live-embed';

export default function Home() {
  return (
    <main>
      <h1>Welcome to my stream!</h1>
      <TwitchLive 
        channel="shroud"
        width="100%"
        height={600}
        parent={['yourdomain.com']} // Specify your domain
      />
    </main>
  );
}
```

## Next.js (Pages Router)

```tsx
// pages/index.tsx
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const TwitchLive = dynamic(
  () => import('react-twitch-live-embed').then((mod) => mod.TwitchLive),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <h1>Live Stream</h1>
      <TwitchLive 
        channel="ninja"
        width={800}
        height={450}
      />
    </div>
  );
}
```

## Multiple Streams

```tsx
import React from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function MultiStream() {
  const channels = ['shroud', 'summit1g', 'pokimane'];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {channels.map((channel) => (
        <TwitchLive
          key={channel}
          channel={channel}
          width="100%"
          height={300}
          muted={true}
        />
      ))}
    </div>
  );
}

export default MultiStream;
```

## Responsive Embed

```tsx
import React from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function ResponsiveEmbed() {
  return (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto',
      padding: '20px'
    }}>
      <TwitchLive 
        channel="esl_csgo"
        width="100%"
        height={720}
        theme="dark"
      />
    </div>
  );
}

export default ResponsiveEmbed;
```

## With Channel Selector

```tsx
import React, { useState } from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function ChannelSelector() {
  const [channel, setChannel] = useState('monstercat');
  const channels = ['monstercat', 'shroud', 'pokimane', 'ninja'];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Channel: </label>
        <select 
          value={channel} 
          onChange={(e) => setChannel(e.target.value)}
        >
          {channels.map((ch) => (
            <option key={ch} value={ch}>{ch}</option>
          ))}
        </select>
      </div>
      
      <TwitchLive 
        channel={channel}
        width={800}
        height={450}
      />
    </div>
  );
}

export default ChannelSelector;
```

## Custom Styled Embed

```tsx
import React from 'react';
import { TwitchLive } from 'react-twitch-live-embed';
import './CustomStream.css';

function CustomStream() {
  return (
    <div className="stream-container">
      <TwitchLive 
        channel="gamesdonequick"
        width={800}
        height={450}
        className="custom-twitch-player"
      />
    </div>
  );
}

export default CustomStream;
```

```css
/* CustomStream.css */
.stream-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.custom-twitch-player {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
```

## TypeScript Example

```tsx
import React from 'react';
import { TwitchLive, TwitchLiveProps } from 'react-twitch-live-embed';

const StreamEmbed: React.FC = () => {
  const embedConfig: TwitchLiveProps = {
    channel: 'esl_csgo',
    width: 800,
    height: 450,
    autoplay: true,
    muted: false,
    theme: 'dark',
    allowFullscreen: true,
  };

  return (
    <div>
      <h2>ESL CS:GO Stream</h2>
      <TwitchLive {...embedConfig} />
    </div>
  );
};

export default StreamEmbed;
```

## Conditional Rendering

```tsx
import React, { useState, useEffect } from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function ConditionalStream() {
  const [isLive, setIsLive] = useState(false);
  const channel = 'yourChannel';

  // You would typically fetch this from Twitch API
  useEffect(() => {
    // Simulated check
    setIsLive(true);
  }, []);

  if (!isLive) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Stream is currently offline</h2>
        <p>Check back later!</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        backgroundColor: '#ff0000', 
        color: 'white', 
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        🔴 LIVE NOW
      </div>
      <TwitchLive 
        channel={channel}
        width="100%"
        height={600}
      />
    </div>
  );
}

export default ConditionalStream;
```

## Sidebar Embed

```tsx
import React from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function SidebarLayout() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <h1>Main Content</h1>
        <p>Your main content goes here...</p>
      </main>
      
      {/* Sidebar with Stream */}
      <aside style={{ width: '400px' }}>
        <h3>Live Stream</h3>
        <TwitchLive 
          channel="monstercat"
          width={400}
          height={300}
          muted={true}
        />
      </aside>
    </div>
  );
}

export default SidebarLayout;
```

## Fullscreen Button Example

```tsx
import React from 'react';
import { TwitchLive } from 'react-twitch-live-embed';

function FullscreenStream() {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={() => {
            const iframe = document.querySelector('iframe');
            iframe?.requestFullscreen();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#9146ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go Fullscreen
        </button>
      </div>
      
      <TwitchLive 
        channel="riotgames"
        width={800}
        height={450}
        allowFullscreen={true}
      />
    </div>
  );
}

export default FullscreenStream;
```

---

## Installation Reminder

```bash
npm install react-twitch-live-embed
```

For more examples and interactive demos, check out the [Storybook](http://localhost:6006) or visit the [full documentation](./README.md).
