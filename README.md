# Voice component
https://voice-component.com/

# サービス概要
簡単5秒でユーザーの声を分析し、その声に似た有名人を表示してくれるサービスです。

# このサービスを作った思い
自分の声は好きですか？嫌いですか？
世の中には様々な理由で自分の声が嫌い・苦手を思っている方が多くいらっしゃいます。しかし、声は生まれ持ったもので変えることはできません。その為、今「自分の声」が嫌い・苦手だと感じている人に向けて声を好きになれるきっかけを与えられるサービスを提供できないかと思い作成しています。

# 使用画面と機能紹介

## トップ画面(音声録音前)
![トップ画像1](https://user-images.githubusercontent.com/73504807/126438847-6466a67c-7ff8-4b55-aa16-70f9e4ec18d6.png)
<br>
まずトップ画面の「さっそく声の成分をチェック！」ボタンを押して５秒間音声録音。

## トップ画面(音声録音後)
![トップ画面2](https://user-images.githubusercontent.com/73504807/126578680-92aa6581-7fa7-4773-962c-a93920830e58.png)
<br>
音声録音後、「分析結果をチェック！」ボタンをクリック。

## 分析結果画面
![分析結果画像](https://user-images.githubusercontent.com/73504807/126440099-cfdb212a-fa5d-4528-9f8d-6b3e9c9cba3f.png)
<br>
分析結果が円グラフで表示されます。（音声データは５０人登録されている中から〜４名選ばれます）

# ER図リンク
![voice_component_er図](https://user-images.githubusercontent.com/73504807/126449664-8a62aa5f-1716-4928-8077-3d3fe5aeb010.png)

# 使用技術
- Ruby 3.0.0
- Rails 6.1.3
- Vue.js 2.6.1
- Highcharts
- Capistrano
- AWS(VPC,EC2,RDS,ALB,Route53,ACM)
- Microsoft Speaker Recognition 「話者識別」
