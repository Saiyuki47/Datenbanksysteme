interface Props {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: Props) {
  return (
    <header>
      <div>
        <div className="logo">
          SQL<span>.</span>Übung
        </div>
        <div className="subtitle">Pine Valley &amp; Northwind Datenbank</div>
      </div>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'}
        title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
