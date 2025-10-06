import type { TwitchLiveProps } from '../components/TwitchLive/TwitchLive.types'

/**
 * Builds the Twitch embed URL with all query parameters
 */
export function buildEmbedUrl(
  props: Omit<TwitchLiveProps, 'width' | 'height' | 'className' | 'id'>
): string {
  const {
    channel,
    parent,
    allowFullscreen = true,
    autoplay = true,
    muted = false,
    theme = 'dark',
    time = '0h0m0s',
  } = props

  // Get parent domains - default to current hostname if available
  const parentDomains =
    parent ?? (typeof window !== 'undefined' ? [window.location.hostname] : [])

  // Build query parameters
  const params = new URLSearchParams({
    channel,
    autoplay: autoplay ? 'true' : 'false',
    muted: muted ? 'true' : 'false',
    time,
  })

  // Add parent domains (can be multiple)
  parentDomains.forEach((domain) => {
    params.append('parent', domain)
  })

  // Add optional parameters
  if (theme) {
    params.append('theme', theme)
  }

  if (!allowFullscreen) {
    params.append('allowfullscreen', 'false')
  }

  return `https://player.twitch.tv/?${params.toString()}`
}

/**
 * Normalizes dimension value to a CSS-compatible string
 * @param value - Number (pixels) or string (percentage, etc.)
 * @returns CSS dimension string
 */
export function normalizeDimension(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}
