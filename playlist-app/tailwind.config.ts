import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'orange-primary': '#FF7F50',
        'pink-primary': '#FF4081',
        'gray-light': '#F3F4F6',
        'gray-dark': '#1F2937',
        'text-dark': '#111827',
        'text-light': '#F9FAFB',
        'yellow-accent': '#FACC15',
        'purple-accent': '#A78BFA',
      },
    },
  },
  plugins: [],
} satisfies Config;
