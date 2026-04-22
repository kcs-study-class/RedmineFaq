import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { marked } from 'marked'

const __dirname = dirname(fileURLToPath(import.meta.url))
const faqsDir = join(__dirname, '../src/faqs')
const outputDir = join(__dirname, '../public')
const outputFile = join(outputDir, 'faq-index.json')

// public/ ディレクトリがなければ作成
mkdirSync(outputDir, { recursive: true })

const files = readdirSync(faqsDir).filter((f) => f.endsWith('.md'))

const faqs = files
  .map((file) => {
    const id = basename(file, '.md')
    const raw = readFileSync(join(faqsDir, file), 'utf-8')
    const { data, content } = matter(raw)

    const html = marked.parse(content.trim())
    // プレーンテキスト（検索用）
    const body = content.replace(/[#*`_\[\]()>!-]/g, '').trim()

    return {
      id,
      title: data.title ?? id,
      category: data.category ?? '未分類',
      order: data.order ?? 99,
      body,
      html,
    }
  })
  .sort((a, b) => {
    if (a.category < b.category) return -1
    if (a.category > b.category) return 1
    return a.order - b.order
  })

writeFileSync(outputFile, JSON.stringify(faqs, null, 2), 'utf-8')
console.log(`✓ faq-index.json を生成しました（${faqs.length} 件）`)
