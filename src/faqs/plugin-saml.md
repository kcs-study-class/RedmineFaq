---
title: "Redmine SAML プラグインの使い方（SAML シングルサインオン）"
category: "プラグイン"
order: 14
---

SAML 2.0 に対応した IdP（Identity Provider）を使って Redmine にシングルサインオン（SSO）できるプラグインです。

**対応 IdP 例**

- Microsoft Entra ID（旧 Azure AD）
- Google Workspace
- Okta
- OneLogin
- Keycloak

**設定手順（管理者作業）**

1. IdP 側で Redmine 向けの SAML アプリケーションを作成し、以下の情報を取得する
   - IdP の SSO URL（エンドポイント）
   - IdP のエンティティ ID
   - IdP の X.509 証明書

2. Redmine 側の設定：管理画面 → **「プラグイン」** → Redmine SAML の **「設定」**

| 設定項目 | 説明 |
|----------|------|
| IdP SSO URL | IdP から提供されたログイン URL |
| IdP エンティティ ID | IdP の識別子 |
| IdP 証明書 | X.509 証明書（PEM 形式） |
| SP エンティティ ID | Redmine の識別子（例：`https://redmine.example.com`） |
| 属性マッピング | IdP の属性名 → Redmine フィールドのマッピング |

3. IdP に Redmine の **SP メタデータ URL** を登録する
   - メタデータ URL: `https://your-redmine.com/auth/saml/metadata`

**ログインフロー**

SAML 設定後、ログイン画面に **「SAML でログイン」** ボタンが追加されます。

**既存アカウントとの紐付け**

既存の Redmine アカウントと SAML ユーザーは、メールアドレスで自動マッチングされます。

> 本番環境への適用前に、必ずテスト環境で動作確認を行ってください。設定ミスでログインできなくなった場合は DB 直接操作が必要になります。
