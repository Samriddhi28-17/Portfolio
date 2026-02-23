'use client'
import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        bottom: '1.8rem',
        right: '1.8rem',
        zIndex: 999,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'var(--toggle-bg)',
        color: 'var(--toggle-fg)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 16px var(--shadow)',
        transition: 'background var(--transition), transform 0.2s',
      }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}