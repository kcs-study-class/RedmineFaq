import { useRef } from 'react'

export default function Header({ onSearch, theme, onToggleTheme }) {
  const inputRef = useRef(null)
  const isDark = theme === 'dark'

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-text">Redmine FAQ</span>
        </div>
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="FAQを検索…"
            onChange={(e) => onSearch(e.target.value)}
            aria-label="FAQ検索"
          />
        </div>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          title={isDark ? 'ライトモード' : 'ダークモード'}
        >
          {isDark ? (
            /* 太陽アイコン */
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            /* 月アイコン */
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
