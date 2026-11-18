// Design tokens (#31/#32). Brand orange #C2410C on white gives 5.2:1 (WCAG AA); min touch target 44.
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#C2410C', light: '#FFEDD5', dark: '#7C2D12' },
        ink: '#1F2937',
        muted: '#4B5563',
      },
      borderRadius: { card: '16px' },
      minHeight: { touch: '44px' },
      minWidth: { touch: '44px' },
    },
  },
};
