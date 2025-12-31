/**
 * PackMate WebXR - Constants & Configuration
 * Centralized configuration for colors, positions, timing, and sizes
 */

// ============================================
// COLORS
// ============================================
export const COLORS = {
  PRIMARY: '#00FFFF',
  PRIMARY_DARK: '#00CCCC',
  SUCCESS: '#00FF00',
  WARNING: '#FFFF00',
  ERROR: '#FF0000',
  BACKGROUND: '#000000',
  TEXT: '#FFFFFF',
  TEXT_MUTED: '#AAAAAA',
  PANEL_BG: 'rgba(0, 0, 0, 0.85)',
  GLOW: 'rgba(0, 255, 255, 0.3)',
}

// ============================================
// 3D POSITIONS (x, y, z)
// ============================================
export const POSITIONS = {
  SUITCASE: [0, 0.6, -2.5],
  PACKING_LIST: [-0.6, 1.5, -1.2],
  PACKING_LIST_3D: [-0.5, 1.4, -1.0],
  COMPLETION_MESSAGE: [0, 1.8, -1.5],
  SCANNING_TEXT: [0, 1.2, -1.5],
}

// ============================================
// SIZES
// ============================================
export const SIZES = {
  SUITCASE: [1.8, 1.2, 0.9],
  PACKED_ITEM_CUBE: 0.25,
  CORNER_MARKER_RADIUS: 0.02,
  DROP_ZONE_INNER: 0.5,
  DROP_ZONE_OUTER: 0.55,
  
  // Text sizes for VR readability
  TEXT: {
    TITLE: 0.045,
    BODY: 0.03,
    SMALL: 0.025,
    ICON: 0.08,
  },
  
  // Panel sizes
  PANEL: {
    PACKING_LIST: [0.5, 0.8],
    COMPLETION: [1.2, 0.4],
  },
}

// ============================================
// TIMING (milliseconds)
// ============================================
export const TIMING = {
  DETECTION_DELAY_MS: 2000,
  AUTO_SHOW_LIST_MS: 1000,
  ITEM_APPEAR_STAGGER_MS: 100,
  ANIMATION_DURATION_MS: 300,
  HAPTIC_DURATION_MS: 100,
}

// ============================================
// ANIMATION PARAMETERS
// ============================================
export const ANIMATION = {
  FLOAT_SPEED: 2,
  FLOAT_AMPLITUDE: 0.02,
  ROTATION_SPEED: 0.5,
  ROTATION_AMPLITUDE: 0.1,
  PULSE_SPEED: 2,
  PULSE_MIN_OPACITY: 0.1,
  PULSE_AMPLITUDE: 0.05,
  HOVER_SCALE: 1.05,
}

// ============================================
// XR CONFIGURATION
// ============================================
export const XR_CONFIG = {
  HAPTIC_INTENSITY: 0.5,
  HAPTIC_DURATION: 100,
  RAY_COLOR: COLORS.PRIMARY,
  RAY_LENGTH: 5,
  HIT_TEST_INTERVAL: 16, // ~60fps
}

// ============================================
// DEFAULT PACKING ITEMS
// ============================================
export const DEFAULT_ITEMS = [
  { id: 1, name: 'Shirts', category: 'Clothing', icon: '👕' },
  { id: 2, name: 'Pants', category: 'Clothing', icon: '👖' },
  { id: 3, name: 'Passport', category: 'Documents', icon: '🛂' },
  { id: 4, name: 'Wallet', category: 'Documents', icon: '👛' },
  { id: 5, name: 'Phone Charger', category: 'Electronics', icon: '🔌' },
  { id: 6, name: 'Headphones', category: 'Electronics', icon: '🎧' },
  { id: 7, name: 'Toothbrush', category: 'Toiletries', icon: '🪥' },
  { id: 8, name: 'Shoes', category: 'Clothing', icon: '👟' },
]

// ============================================
// CATEGORY COLORS
// ============================================
export const CATEGORY_COLORS = {
  Clothing: '#FF6B6B',
  Documents: '#4ECDC4',
  Electronics: '#45B7D1',
  Toiletries: '#96CEB4',
  default: COLORS.PRIMARY,
}

// ============================================
// SOUND PATHS
// ============================================
export const SOUNDS = {
  PACK: '/sounds/pack.mp3',
  COMPLETE: '/sounds/complete.mp3',
  CLICK: '/sounds/click.mp3',
  ERROR: '/sounds/error.mp3',
}

// ============================================
// KEYBOARD CONTROLS
// ============================================
export const KEYBOARD = {
  TOGGLE_LIST: 'l',
  RESET: 'r',
  HELP: 'h',
}

