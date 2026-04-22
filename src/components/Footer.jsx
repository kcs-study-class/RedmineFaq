import { useState, useEffect } from 'react'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`scroll-top${visible ? ' scroll-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="ページ先頭に戻る"
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const version = __APP_VERSION__

  return (
    <>
      <ScrollToTop />
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">© {year} Kitsune Creative Studio</span>
          <span className="footer-version">v{version}</span>
        </div>
      </footer>
    </>
  )
}
