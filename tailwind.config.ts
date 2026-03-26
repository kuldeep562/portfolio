import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          'surface-0': 'var(--bg-surface-0)',
          'surface-1': 'var(--bg-surface-1)',
          'surface-2': 'var(--bg-surface-2)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        signal: {
          green: 'var(--signal-green)',
          cyan: 'var(--signal-cyan)',
          amber: 'var(--signal-amber)',
        },
        system: {
          purple: 'var(--system-purple)',
          red: 'var(--system-red)',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-geist)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'cursor-blink': 'blink 530ms step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ambient-line': 'ambientLine 3s linear infinite',
        'status-pulse': 'statusPulse 2s ease-in-out infinite',
        'counter-count': 'counterCount 2s ease-out forwards',
        'slide-in-right': 'slideInRight 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'typewriter': 'typewriter 45ms steps(1) forwards',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.05)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ambientLine: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        statusPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-4px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      boxShadow: {
        'glow-green': '0 0 20px var(--glow-green)',
        'glow-cyan': '0 0 20px var(--glow-cyan)',
        'glow-amber': '0 0 20px var(--glow-amber)',
        'glow-green-sm': '0 0 8px var(--glow-green)',
        'glow-cyan-sm': '0 0 8px var(--glow-cyan)',
      },
    },
  },
  plugins: [],
}

export default config
