# ============================================================
# Kitsune FAQ Site — Makefile
# ============================================================

.PHONY: help install dev build preview index clean deploy

# デフォルトターゲット
help:
	@echo ""
	@echo "  Kitsune FAQ Site"
	@echo ""
	@echo "  make install    依存パッケージをインストール"
	@echo "  make dev        開発サーバーを起動 (localhost:5173)"
	@echo "  make build      本番ビルド (dist/ を生成)"
	@echo "  make preview    ビルド成果物をローカルプレビュー"
	@echo "  make index      faq-index.json のみ再生成"
	@echo "  make clean      dist/ と faq-index.json を削除"
	@echo "  make deploy     S3へデプロイ (BUCKET 変数が必要)"
	@echo ""

# ------------------------------------------------------------
# 開発
# ------------------------------------------------------------

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

# MDファイルからJSONインデックスのみ再生成
index:
	node scripts/build-index.js

# ------------------------------------------------------------
# クリーン
# ------------------------------------------------------------

clean:
	rm -rf dist
	rm -f public/faq-index.json
	@echo "✓ dist/ と public/faq-index.json を削除しました"

# ------------------------------------------------------------
# デプロイ (例: make deploy BUCKET=my-faq-bucket)
# ------------------------------------------------------------

BUCKET ?= YOUR_BUCKET_NAME

deploy: build
	@if [ "$(BUCKET)" = "YOUR_BUCKET_NAME" ]; then \
		echo ""; \
		echo "  ERROR: BUCKET 変数を指定してください"; \
		echo "  例: make deploy BUCKET=my-faq-bucket"; \
		echo ""; \
		exit 1; \
	fi
	@echo "→ 静的アセットをアップロード (長期キャッシュ)..."
	aws s3 sync dist/ s3://$(BUCKET)/ \
		--delete \
		--cache-control "public, max-age=31536000, immutable" \
		--exclude "*.html" \
		--exclude "faq-index.json"
	@echo "→ HTML / JSON をアップロード (キャッシュなし)..."
	aws s3 sync dist/ s3://$(BUCKET)/ \
		--exclude "*" \
		--include "*.html" \
		--include "faq-index.json" \
		--cache-control "no-cache, no-store, must-revalidate"
	@echo "✓ デプロイ完了: s3://$(BUCKET)/"
