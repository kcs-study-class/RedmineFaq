export default function Sidebar({ categories, activeCategory, onCategoryChange, disabled }) {
  return (
    <nav className={`sidebar${disabled ? ' sidebar--disabled' : ''}`} aria-label="カテゴリ">
      <p className="sidebar-label">カテゴリ</p>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`category-btn${activeCategory === cat && !disabled ? ' category-btn--active' : ''}`}
              onClick={() => !disabled && onCategoryChange(cat)}
              aria-current={activeCategory === cat && !disabled ? 'true' : undefined}
              disabled={disabled && cat !== 'すべて'}
            >
              <span className="category-dot" aria-hidden="true" />
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
