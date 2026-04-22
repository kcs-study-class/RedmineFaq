import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import Fuse from 'fuse.js'
import Sidebar from './components/Sidebar'
import FaqList from './components/FaqList'

export default function App() {
  const { searchQuery } = useOutletContext()
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('すべて')

  useEffect(() => {
    fetch('/faq-index.json')
      .then((r) => r.json())
      .then((data) => {
        setFaqs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#category-')) {
      const cat = decodeURIComponent(hash.replace('#category-', ''))
      setActiveCategory(cat)
    }
  }, [])

  const fuse = useMemo(
    () =>
      new Fuse(faqs, {
        keys: ['title', 'body'],
        threshold: 0.4,
        includeMatches: true,
      }),
    [faqs]
  )

  const categories = useMemo(() => {
    const cats = [...new Set(faqs.map((f) => f.category))]
    return ['すべて', ...cats]
  }, [faqs])

  const displayedFaqs = useMemo(() => {
    if (searchQuery.trim()) {
      return fuse.search(searchQuery).map((r) => r.item)
    }
    if (activeCategory === 'すべて') return faqs
    return faqs.filter((f) => f.category === activeCategory)
  }, [searchQuery, activeCategory, faqs, fuse])

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat)
    const hash = cat === 'すべて' ? '' : `#category-${encodeURIComponent(cat)}`
    window.history.replaceState(null, '', hash || window.location.pathname)
  }, [])

  const isSearching = searchQuery.trim().length > 0

  return (
    <div className="content-wrapper">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        disabled={isSearching}
      />
      <main className="main">
        {loading ? (
          <div className="loading">読み込み中…</div>
        ) : (
          <FaqList
            faqs={displayedFaqs}
            searchQuery={searchQuery}
            isSearching={isSearching}
          />
        )}
      </main>
    </div>
  )
}
