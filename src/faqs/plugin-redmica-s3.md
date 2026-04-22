---
title: "RedMica S3 プラグインの使い方（添付ファイルを Amazon S3 に保存）"
category: "プラグイン"
order: 5
---

チケットや Wiki への添付ファイルをサーバーローカルではなく Amazon S3 に保存するプラグインです。

**初期設定（管理者作業）**

1. AWS コンソールで S3 バケットと IAM ユーザー（アクセスキー）を用意する
2. Redmine サーバーの `config/storage.yml` または環境変数に以下を設定する

```
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=your-bucket-name
S3_REGION=ap-northeast-1
```

3. Redmine を再起動して設定を反映する

**動作確認**

1. テスト用チケットにファイルを添付してアップロード
2. AWS コンソールの S3 バケットにファイルが保存されていることを確認

**既存ファイルの移行**

既にサーバーに保存されている添付ファイルは自動移行されません。移行が必要な場合は付属のマイグレーションスクリプトを使用してください（詳細は [GitHub リポジトリ](https://github.com/redmica/redmica_s3) を参照）。

**利用上の注意**

- バケットのアクセス権は Redmine からのみ許可し、パブリックアクセスは無効にすること
- CloudFront と組み合わせると署名付き URL による安全な配信が可能
- ダウンロード時は S3 の転送コストが発生する

> このプラグインはサーバーのディスク容量節約とストレージの耐障害性向上に効果的です。
