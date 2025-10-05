import React from 'react';
import type { TwitchLiveProps } from './TwitchLive.types';
import { buildEmbedUrl, normalizeDimension } from '../../utils/buildEmbedUrl';

/**
 * TwitchLive component - Embeds a Twitch stream or channel
 * 
 * @example
 * ```tsx
 * <TwitchLive 
 *   channel="shroud" 
 *   width={800} 
 *   height={450}
 * />
 * ```
 */
export const TwitchLive: React.FC<TwitchLiveProps> = ({
  channel,
  parent,
  allowFullscreen = true,
  autoplay = true,
  muted = false,
  theme = 'dark',
  time = '0h0m0s',
  width = 940,
  height = 480,
  className,
  id,
}) => {
  // Build the embed URL
  const embedUrl = buildEmbedUrl({
    channel,
    parent,
    allowFullscreen,
    autoplay,
    muted,
    theme,
    time,
  });

  // Normalize dimensions
  const normalizedWidth = normalizeDimension(width);
  const normalizedHeight = normalizeDimension(height);

  return (
    <iframe
      id={id}
      src={embedUrl}
      className={className}
      width={normalizedWidth}
      height={normalizedHeight}
      allowFullScreen={allowFullscreen}
      style={{
        border: 'none',
      }}
      title={`Twitch stream for ${channel}`}
    />
  );
};

TwitchLive.displayName = 'TwitchLive';
