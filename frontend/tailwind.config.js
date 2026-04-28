/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111008',
        ink2: '#2C2A22',
        mid: '#6B6558',
        muted: '#9E9888',
        cream: '#FDFBF6',
        cream2: '#F5F1E8',
        cream3: '#EDE7D8',
        gold: '#B8923A',
        'gold-l': '#D4AE62',
        'gold-pale': '#FBF4E3',
      },
    },
  },
  plugins: [],
}
