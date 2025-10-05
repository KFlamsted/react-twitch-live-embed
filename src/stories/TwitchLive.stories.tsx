import type { Meta, StoryObj } from '@storybook/react';
import { TwitchLive } from '../components/TwitchLive';

/**
 * The TwitchLive component allows you to embed Twitch streams and channels
 * into your React application with full TypeScript support.
 * 
 * ## Features
 * - Automatic parent domain detection
 * - Responsive sizing (px or %)
 * - Light and dark themes
 * - Full customization of player behavior
 */
const meta = {
  title: 'Components/TwitchLive',
  component: TwitchLive,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A React component for embedding Twitch streams with full TypeScript support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    channel: {
      control: 'text',
      description: 'Name of the Twitch channel to embed',
    },
    parent: {
      control: 'object',
      description: 'Parent domain(s) for embed security. Auto-detected if not provided.',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color theme for the player',
    },
    width: {
      control: 'text',
      description: 'Width in pixels or percentage (e.g., 800 or "100%")',
    },
    height: {
      control: 'text',
      description: 'Height in pixels or percentage (e.g., 450 or "50%")',
    },
    autoplay: {
      control: 'boolean',
      description: 'Start playing automatically',
    },
    muted: {
      control: 'boolean',
      description: 'Start with audio muted',
    },
    allowFullscreen: {
      control: 'boolean',
      description: 'Allow fullscreen mode',
    },
    time: {
      control: 'text',
      description: 'Start time for VODs (format: "0h0m0s")',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class name',
    },
    id: {
      control: 'text',
      description: 'Custom ID for the iframe',
    },
  },
} satisfies Meta<typeof TwitchLive>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic usage with default settings.
 * This embeds a popular Twitch channel with standard configuration.
 */
export const Default: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
  },
};

/**
 * Light theme variant for lighter website designs.
 */
export const LightTheme: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
    theme: 'light',
  },
};

/**
 * Starts muted - useful for autoplay scenarios.
 */
export const MutedAutoplay: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
    muted: true,
    autoplay: true,
  },
};

/**
 * No autoplay - user must click to start the stream.
 */
export const NoAutoplay: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
    autoplay: false,
  },
};

/**
 * Responsive width using percentage.
 * The embed will fill its container.
 */
export const ResponsiveWidth: Story = {
  args: {
    channel: 'monstercat',
    width: '100%',
    height: 450,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', border: '1px dashed #ccc', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Compact size for sidebars or smaller spaces.
 */
export const CompactSize: Story = {
  args: {
    channel: 'monstercat',
    width: 400,
    height: 300,
  },
};

/**
 * Large display for main content areas.
 */
export const LargeDisplay: Story = {
  args: {
    channel: 'monstercat',
    width: 1280,
    height: 720,
  },
};

/**
 * Starting at a specific time (useful for VODs).
 * Format: "XhYmZs" (e.g., "1h30m0s" for 1 hour 30 minutes)
 */
export const WithStartTime: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
    time: '0h5m0s',
  },
};

/**
 * With custom CSS class for additional styling.
 */
export const WithCustomClass: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
    className: 'custom-twitch-embed',
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .custom-twitch-embed {
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          }
        `}</style>
        <Story />
      </>
    ),
  ],
};

/**
 * Explicit parent domains for production environments.
 * Multiple domains can be specified for sites with multiple domains.
 */
export const WithExplicitParent: Story = {
  args: {
    channel: 'monstercat',
    width: 800,
    height: 450,
    parent: ['localhost', 'example.com', 'www.example.com'],
  },
};
