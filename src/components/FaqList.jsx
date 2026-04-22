import FaqItem from './FaqItem'

export default function FaqList({ faqs, searchQuery, isSearching }) {
  if (faqs.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">
          {isSearching
            ? `「${searchQuery}」に一致するFAQは見つかりませんでした`
            : 'このカテゴリにはFAQがありません'}
        </p>
      </div>
    )
  }

  // カテゴリごとにグループ化（検索中は一覧表示）
  if (isSearching) {
    return (
      <ul className="faq-list" role="list">
        {faqs.map((faq, i) => (
          <FaqItem key={faq.id} faq={faq} index={i} searchQuery={searchQuery} />
        ))}
      </ul>
    )
  }

  // カテゴリグループ表示
  const groups = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = []
    acc[faq.category].push(faq)
    return acc
  }, {})

  let globalIndex = 0
  return (
    <div className="faq-groups">
      {Object.entries(groups).map(([category, items]) => (
        <section key={category} className="faq-group">
          <h2 className="faq-group-title">{category}</h2>
          <ul className="faq-list" role="list">
            {items.map((faq) => {
              const idx = globalIndex++
              return <FaqItem key={faq.id} faq={faq} index={idx} searchQuery={searchQuery} />
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
