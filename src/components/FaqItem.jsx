import { useState, useEffect, useRef, useCallback } from 'react'

function highlight(text, query) {
  if (!query) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="highlight">{part}</mark>
      : part
  )
}

export default function FaqItem({ faq, index, searchQuery }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  const itemRef = useRef(null)

  // URLハッシュで特定FAQを開く
  useEffect(() => {
    if (window.location.hash === `#faq-${faq.id}`) {
      setOpen(true)
      setTimeout(() => {
        itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [faq.id])

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      // ハッシュ更新
      if (next) {
        window.history.replaceState(null, '', `#faq-${faq.id}`)
      } else if (window.location.hash === `#faq-${faq.id}`) {
        window.history.replaceState(null, '', window.location.pathname)
      }
      return next
    })
  }, [faq.id])

  // スタガードアニメーション用のディレイ
  const style = { '--delay': `${index * 50}ms` }

  return (
    <li
      ref={itemRef}
      className={`faq-item${open ? ' faq-item--open' : ''}`}
      style={style}
      id={`faq-${faq.id}`}
    >
      <button
        className="faq-question"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`faq-body-${faq.id}`}
      >
        <span className="faq-q-mark">Q</span>
        <span className="faq-q-text">
          {highlight(faq.title, searchQuery)}
        </span>
        <span className="faq-chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-body-${faq.id}`}
        ref={bodyRef}
        className="faq-answer"
        role="region"
        aria-hidden={!open}
        style={{
          maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0',
        }}
      >
        <div
          className="faq-answer-inner"
          dangerouslySetInnerHTML={{ __html: faq.html }}
        />
      </div>
    </li>
  )
}
