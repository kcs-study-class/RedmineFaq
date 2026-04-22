import { useCallback, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useTheme } from '../hooks/useTheme'

const DEBOUNCE_MS = 200

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const debounceRef = useRef(null)

  const handleSearch = useCallback((query) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setSearchQuery(query), DEBOUNCE_MS)
  }, [])

  return (
    <div className="layout">
      <Header theme={theme} onToggleTheme={toggleTheme} onSearch={handleSearch} />
      <Outlet context={{ searchQuery }} />
      <Footer />
    </div>
  )
}
