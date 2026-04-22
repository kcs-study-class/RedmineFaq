import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Fuse from 'fuse.js'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FaqList from './components/FaqList'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'

const DEBOUNCE_MS = 200

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('すべて')
  const debounceRef = useRef(null)

  // FAQデータ取得
  useEffect(() => {
    fetch('/faq-index.json')
      .then((r) => r.json())
      .then((data) => {
        setFaqs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // URLハッシュからカテゴリを初期化
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#category-')) {
      const cat = decodeURIComponent(hash.replace('#category-', ''))
      setActiveCategory(cat)
    }
  }, [])

  // Fuse.jsインスタンス
  const fuse = useMemo(
    () =>
      new Fuse(faqs, {
        keys: ['title', 'body'],
        threshold: 0.4,
        includeMatches: true,
      }),
    [faqs]
  )

  // カテゴリ一覧
  const categories = useMemo(() => {
    const cats = [...new Set(faqs.map((f) => f.category))]
    return ['すべて', ...cats]
  }, [faqs])

  // 表示するFAQ
  const displayedFaqs = useMemo(() => {
    if (searchQuery.trim()) {
      return fuse.search(searchQuery).map((r) => r.item)
    }
    if (activeCategory === 'すべて') return faqs
    return faqs.filter((f) => f.category === activeCategory)
  }, [searchQuery, activeCategory, faqs, fuse])

  // 検索（debounce）
  const handleSearch = useCallback((query) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearchQuery(query)
    }, DEBOUNCE_MS)
  }, [])

  // カテゴリ選択
  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat)
    const hash = cat === 'すべて' ? '' : `#category-${encodeURIComponent(cat)}`
    window.history.replaceState(null, '', hash || window.location.pathname)
  }, [])

  const isSearching = searchQuery.trim().length > 0

  return (
    <div className="layout">
      <Header onSearch={handleSearch} theme={theme} onToggleTheme={toggleTheme} />
      <div className="content-wrapper">
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          disabled={isSearching}
        />
        <main className="main">
          {loading ? (
            <div className="loading">読み込み中...</div>
          ) : (
            <FaqList
              faqs={displayedFaqs}
              searchQuery={searchQuery}
              isSearching={isSearching}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
