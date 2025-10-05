/**
 * Props for the TwitchLive component
 */
export interface TwitchLiveProps {
  /**
   * Name of the Twitch channel to embed
   * @example "shroud"
   */
  channel: string;

  /**
   * Parent domain(s) for the embed. Required by Twitch to prevent unauthorized embedding.
   * Defaults to the current hostname (window.location.hostname)
   * @example ["example.com", "www.example.com"]
   */
  parent?: string[];

  /**
   * If true, the player can go full screen
   * @default true
   */
  allowFullscreen?: boolean;

  /**
   * If true, the video starts playing automatically
   * Note: Mobile devices may not support autoplay without user interaction
   * @default true
   */
  autoplay?: boolean;

  /**
   * Specifies whether the initial state of the video is muted
   * @default false
   */
  muted?: boolean;

  /**
   * The Twitch embed color theme to use
   * @default "dark"
   */
  theme?: 'light' | 'dark';

  /**
   * Time in the video where playback starts
   * Format: "0h0m0s"
   * @default "0h0m0s"
   */
  time?: string;

  /**
   * Width of the rendered element, in pixels or as a percentage string
   * @default 940
   * @example 800 or "100%"
   */
  width?: number | string;

  /**
   * Height of the rendered element, in pixels or as a percentage string
   * @default 480
   * @example 450 or "50%"
   */
  height?: number | string;

  /**
   * Additional CSS class name for the iframe container
   */
  className?: string;

  /**
   * Custom ID for the iframe element
   */
  id?: string;
}
