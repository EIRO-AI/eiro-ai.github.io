/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fdf8f0',
        foreground: '#171717',
        card: '#ffffff',
        'card-foreground': '#171717',
        popover: '#ffffff',
        'popover-foreground': '#171717',
        primary: '#1a4d3a',
        'primary-foreground': '#ffffff',
        secondary: '#f5f1ea',
        'secondary-foreground': '#1a4d3a',
        muted: '#f5f1ea',
        'muted-foreground': '#6b7570',
        accent: '#f0ebdf',
        'accent-foreground': '#1a4d3a',
        destructive: '#d4183d',
        'destructive-foreground': '#ffffff',
        border: 'rgba(26, 77, 58, 0.15)',
        input: 'transparent',
        'input-background': '#ffffff',
        ring: '#1a4d3a',
      },
      borderRadius: {
        lg: '0.625rem',
        md: 'calc(0.625rem - 2px)',
        sm: 'calc(0.625rem - 4px)',
      },
      fontSize: {
        base: '14px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
      },
    },
  },
  plugins: [],
}