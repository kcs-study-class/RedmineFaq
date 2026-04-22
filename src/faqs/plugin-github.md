---
title: "Redmine Github プラグインの使い方（GitHub リポジトリ連携）"
category: "プラグイン"
order: 8
---

Redmine のプロジェクトに GitHub リポジトリを関連付け、コミット情報をチケットと紐付けできるプラグインです。

**初期設定（管理者作業）**

1. 管理画面 → **「プラグイン」** → Redmine Github の **「設定」** を開く
2. GitHub の Personal Access Token を入力して保存

**GitHub トークンの取得**

1. GitHub にログイン → Settings → Developer settings
2. **「Personal access tokens」** → **「Generate new token」**
3. スコープは `repo`（プライベートリポジトリの場合）または `public_repo` を選択
4. 生成したトークンをコピー

**プロジェクトへのリポジトリ登録**

1. プロジェクトの **「設定」** → **「リポジトリ」** タブ
2. **「リポジトリを追加」** → タイプ **「GitHub」** を選択
3. リポジトリの URL（例：`https://github.com/your-org/your-repo`）を入力
4. **「保存」**

**コミットとチケットの紐付け**

コミットメッセージに `refs #123` または `fixes #123` を含めると自動でチケットに関連付けられます。

| 記述 | 効果 |
|------|------|
| `refs #123` | チケット #123 にコミットへのリンクを追加 |
| `fixes #123` | チケット #123 を「解決済み」にしてコミットリンクを追加 |

**リポジトリの確認**

プロジェクトメニューの **「リポジトリ」** からコミット一覧・差分・ファイルブラウザを確認できます。

> Webhook を設定すると GitHub へのプッシュ時に Redmine が自動でリポジトリを更新します。
