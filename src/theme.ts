export const colors = {
  bg: "#FBF6FA",
  bgSoft: "#F5EFF8",
  card: "#FFFFFF",
  ink: "#3D2F4A",
  muted: "#8E7E9A",
  lavender: "#B59AD8",
  lavenderDeep: "#8E6BB0",
  eggplant: "#453653",
  peach: "#F5C5A8",
  peachSoft: "#FBE8DC",
  blush: "#F3D7E6",
  mint: "#E5F0EE",
  sky: "#E4EBF8",
  line: "#EFE6F3",
  white: "#FFFFFF",
} as const;

export const radii = {
  sm: 14,
  md: 20,
  lg: 28,
  pill: 999,
} as const;

export const shadow = {
  soft: {
    shadowColor: "#6B4F7A",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  float: {
    shadowColor: "#2A1838",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
} as const;
