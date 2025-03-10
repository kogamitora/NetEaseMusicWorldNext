# NetEaseMusicWorld++

[简体中文](README.md) | [English](README_EN.md) | 日本語

> NetEase Musicの海外アクセス制限を解除するChrome拡張機能（新バージョン）

## 拡張機能のURL

[Chrome ウェブストア](https://chromewebstore.google.com/detail/neteasemusicworld++/ibglohpjgdhkmhmfpdibjgmjjmccafmh)

## 概要

これは海外ユーザーがNetEase MusicにアクセスできるようにするChrome拡張機能です。本プロジェクトは、前の2つのバージョンをベースに、Chromeの最新の拡張機能要件に合わせて最適化されています。

オリジナルの作者がメンテナンスを終了し、私自身も海外でNetEase Musicを使用する必要があるため、より多くの海外ユーザーのためにこの拡張機能を更新しました。

## バージョン履歴

- 第1版：[acgotaku/NetEaseMusicWorld](https://github.com/acgotaku/NetEaseMusicWorld)
- 第2版：[nondanee/NetEaseMusicWorldPlus](https://github.com/nondanee/NetEaseMusicWorldPlus)

## 主な更新内容

1. Chrome Extension Manifest V3の採用
   - Chromeの最新の拡張機能仕様に準拠
   - 拡張機能の無効化警告が表示されない
   - より良いパフォーマンスとセキュリティ

2. 機能の最適化
   - 従来のリクエスト傍受の代わりにdeclarativeNetRequestを使用
   - 直感的な操作のための単一モード
   - システムのhostsファイルの変更が不要

## 使用方法

1. インストール後、ツールバーの拡張機能アイコンをクリックして有効/無効を切り替え
2. グレーのアイコンは無効状態
3. 赤いアイコンは有効状態

## プライバシー通知

- ユーザーデータを収集しません
- 必要なネットワークリクエストのみを変更
- すべてのコードはオープンソース 