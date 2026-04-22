import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">ページが見つかりません</h1>
      <p className="not-found-desc">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Link to="/" className="not-found-link">
        FAQ トップへ戻る
      </Link>
    </div>
  )
}
