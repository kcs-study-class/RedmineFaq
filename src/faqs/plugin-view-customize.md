---
title: "View Customize プラグインの使い方（画面のカスタマイズ）"
category: "プラグイン"
order: 17
---

JavaScript・CSS を使って Redmine の画面を自由にカスタマイズできるプラグインです。コーディングなしのプラグイン設定と組み合わせることで、UI を柔軟に変更できます。

**カスタマイズの作成**

1. 管理画面 → **「ビューのカスタマイズ」** を開く
2. **「新しいビューカスタマイズ」** をクリック
3. 以下を設定する

| 項目 | 説明 |
|------|------|
| パス（正規表現） | カスタマイズを適用するページ（例：`/issues` でチケット一覧） |
| プロジェクト識別子 | 特定プロジェクトのみに適用する場合に指定 |
| 種別 | JavaScript / CSS / HTML |
| コード | 実行するスクリプトまたはスタイル |

4. **「保存」**

**活用例**

**CSS：特定フィールドの強調**
```css
/* 優先度「今すぐ」のチケットを赤く表示 */
.priority-immediate { background-color: #ffe0e0 !important; }
```

**JavaScript：フィールドの初期値を自動入力**
```javascript
// 新規チケット作成時に担当者を自動で自分に設定
if (document.querySelector('#issue_assigned_to_id')) {
  document.querySelector('#issue_assigned_to_id').value = current_user_id;
}
```

**HTML：案内テキストの追加**
```html
<p class="notice">チケット作成前に <a href="/wiki/rules">ルール</a> を確認してください。</p>
```

**適用範囲の制御**

パスに正規表現を使うことで細かく制御できます。

| パターン | 適用ページ |
|----------|-----------|
| `.*` | すべてのページ |
| `/issues/new` | 新規チケット作成ページのみ |
| `/projects/my-project/.*` | 特定プロジェクトのすべてのページ |

> JavaScript を使用する場合は Redmine の画面構造（HTML）が変わるとカスタマイズが動作しなくなることがあります。Redmine アップデート後は動作確認を行ってください。
