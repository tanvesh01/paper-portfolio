/**
 * ASCII Art Utilities
 * Functions for converting pixel brightness to ASCII characters
 */

/**
 * ASCII character set from darkest to lightest
 * '0' and '1' are duplicated across multiple brightness ranges for increased frequency
 * Index 0 = darkest (low brightness)
 * Index 23 = lightest (high brightness)
 */
export const ASCII_CHARS = ['@', '0', '1', '#', '0', '1', '$', '0', '1', '%', '0', '1', '?', '0', '1', '*', '0', '1', '+', ';', ':', ',', '.', ' '] as const;

/**
 * Calculate brightness/luminance of an RGB color using relative luminance formula
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns Brightness value (0-255)
 */
export function getBrightness(r: number, g: number, b: number): number {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

/**
 * Map brightness value to an ASCII character
 * @param brightness - Brightness value (0-255)
 * @returns ASCII character representing the brightness level
 */
export function brightnessToAscii(brightness: number): string {
  // Map 0-255 brightness to 0-23 character index
  const index = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
  const clampedIndex = Math.min(Math.max(index, 0), ASCII_CHARS.length - 1);
  return ASCII_CHARS[clampedIndex];
}

/**
 * Determine if text color should be inverted based on background brightness
 * @param brightness - Background brightness (0-255)
 * @returns true if white text should be used, false for black text
 */
export function shouldInvertColor(brightness: number): boolean {
  return brightness < 128;
}

/**
 * Check if a point is within a circular radius
 * @param x - Point x coordinate
 * @param y - Point y coordinate
 * @param centerX - Circle center x coordinate
 * @param centerY - Circle center y coordinate
 * @param radius - Circle radius
 * @returns true if point is inside the circle
 */
export function isInRadius(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number
): boolean {
  const dx = x - centerX;
  const dy = y - centerY;
  return dx * dx + dy * dy <= radius * radius;
}

/**
 * Calculate opacity for gradient fade effect based on distance from center
 * @param x - Point x coordinate
 * @param y - Point y coordinate
 * @param centerX - Circle center x coordinate
 * @param centerY - Circle center y coordinate
 * @param radius - Circle radius
 * @returns opacity value (0-1), where 1 is fully opaque at center, 0 at edge
 */
export function getGradientOpacity(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number
): number {
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate opacity: 1 at center, fade to 0 at edge
  // Use quadratic easing for smoother fade
  const normalizedDistance = distance / radius;
  const opacity = 1 - normalizedDistance * normalizedDistance;

  return Math.max(0, Math.min(1, opacity));
}
