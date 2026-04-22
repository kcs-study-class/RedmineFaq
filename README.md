# Kitsune FAQ Site

Kitsune Creative Studio の静的FAQサイト。  
Markdown ファイルで FAQ を管理し、Vite + React でビルド、AWS S3 + CloudFront で配信する構成。

---

## 技術スタック

| 役割 | 採用技術 |
|------|----------|
| フレームワーク | React 18 + Vite 5 |
| 全文検索 | Fuse.js |
| MDパース | marked + gray-matter（ビルド時のみ） |
| スタイル | バニラ CSS（CSS 変数） |
| デプロイ先 | AWS S3 + CloudFront |

---

## ディレクトリ構成

```
faq-site/
├── index.html                 # エントリポイント
├── vite.config.js
├── Makefile
├── scripts/
│   └── build-index.js        # MD → faq-index.json 変換スクリプト
├── public/
│   └── faq-index.json        # ビルド時に自動生成（Git管理外推奨）
└── src/
    ├── main.jsx
    ├── App.jsx                # 状態管理・検索・カテゴリフィルター
    ├── style.css
    ├── components/
    │   ├── Header.jsx         # ロゴ + 検索バー
    │   ├── Sidebar.jsx        # カテゴリナビ
    │   ├── FaqList.jsx        # グループ表示・空状態
    │   └── FaqItem.jsx        # アコーディオン
    └── faqs/                  # FAQコンテンツ（Markdownで管理）
        ├── getting-started.md
        ├── billing.md
        └── ...
```

---

## クイックスタート

```bash
# 依存パッケージをインストール
make install

# 開発サーバーを起動（http://localhost:5173）
make dev

# 本番ビルド（dist/ を生成）
make build
```

---

## FAQ の追加・編集

1. `src/faqs/` に `.md` ファイルを作成する
2. 以下の frontmatter を記述する

```markdown
---
title: "質問文をここに書く"
category: "カテゴリ名"
order: 1
---

回答本文を Markdown で記述する。

- 箇条書き、**強調**、`コード` すべて対応
```

| フィールド | 必須 | 説明 |
|-----------|------|------|
| `title` | ✓ | 質問文。検索・アコーディオンのヘッダーに表示 |
| `category` | ✓ | カテゴリ名。サイドバーのフィルターに使用 |
| `order` | — | カテゴリ内の表示順（数値、省略時は 99） |

3. `make dev` を再起動するか `make index` でインデックスを再生成する

---

## Makefile コマンド一覧

| コマンド | 説明 |
|---------|------|
| `make install` | npm install |
| `make dev` | 開発サーバー起動（localhost:5173） |
| `make build` | 本番ビルド（dist/ 生成） |
| `make preview` | ビルド成果物のローカルプレビュー |
| `make index` | faq-index.json のみ再生成 |
| `make clean` | dist/ と faq-index.json を削除 |
| `make deploy BUCKET=<name>` | S3 へデプロイ |

---

## S3 デプロイ

### 前提条件

- AWS CLI がインストール・設定済みであること
- S3 バケットの Static website hosting が有効になっていること
- バケットポリシーで CloudFront からのアクセスが許可されていること

### デプロイ手順

```bash
make deploy BUCKET=your-bucket-name
```

静的アセット（JS/CSS）は長期キャッシュ、HTML と `faq-index.json` はキャッシュなしで配信される。

### S3 バケット設定

| 設定項目 | 値 |
|---------|----|
| Static website hosting | 有効 |
| Index document | `index.html` |
| Error document | `index.html` |
| パブリックアクセス | CloudFront 経由のみ許可 |

---

## 機能詳細

### 全文検索
- 入力と同時に検索（デバウンス 200ms）
- タイトル・本文を対象に Fuse.js でファジー検索
- マッチ箇所をハイライト表示
- 検索中はカテゴリフィルターを非活性化

### カテゴリフィルター
- サイドバー（PC）/ 横スクロールタブ（モバイル）
- URL ハッシュ `#category-カテゴリ名` で直リンク可能

### アコーディオン
- 質問クリックで回答を展開 / 折りたたみ
- URL ハッシュ `#faq-id` で特定 FAQ を直接展開した状態で開ける

### アニメーション
- ページ初期表示: FAQ カードのスタガードフェードイン（各 50ms 遅延）
- アコーディオン開閉: `max-height` + `opacity` トランジション（200ms）

---

## デザイン

コンセプト: **和洋折衷エディトリアル** — 深い紺と琥珀のアクセント。

```css
--color-bg:      #0d0f1a   /* 背景 */
--color-surface: #13162a   /* カード */
--color-accent:  #c8922a   /* 琥珀（アクセント） */
--color-text:    #e8e4d9   /* 本文 */

--font-display:  'Shippori Mincho', serif   /* 見出し・質問文 */
--font-body:     'DM Sans', sans-serif      /* 本文・UI */
--font-mono:     'JetBrains Mono', mono     /* コード */
```

---

## 注意事項

- `gray-matter` と `marked` はビルドスクリプト（Node.js）でのみ使用。ブラウザバンドルには含まれない
- FAQ コンテンツは自社管理の MD のみを想定。外部入力を受け付ける場合は `DOMPurify` を追加すること
- FAQ 数が数百件以上になる場合はカテゴリ別 JSON への分割と遅延読み込みを検討する
