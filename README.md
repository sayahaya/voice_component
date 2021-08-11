# Voice component
簡単5秒でユーザーの声を分析し、その声に似た有名人を表示してくれるサービスです。

https://voice-component.com/

リリースから10日で**ユニークユーザー数5,000人**、**PV数23,000PV**を突破!
<br>
<br>

### デモ動画
![デモ動画](https://user-images.githubusercontent.com/73504807/128833789-9ea077bb-71ae-451e-821e-46383a3024f7.gif)
<br>
<br>

### このサービスを作った思い
元々自分自身の声に苦手意識があり、プログラミングスクール内でその思いを共有したところ、男女問わず一定数の方が同様のネガディブな感情を持っていることが分かりました。<br>
ボイスチェンジャーなど一時的に声を変える手段はありますが、純粋に「自分の声」を好きにさせてくれるサービスはあまりないなと考え、「自分の声」が嫌い・苦手だと感じている人に向けて声を好きになれるきっかけを与えたいという思いからこのサービス作成をしました。
<br>
<br>

### 分析結果出力までの流れ
ユーザーの音声データを外部APIにて識別、返ってきたレスポンスを元にHighchartsを用いて円グラフで分析結果を表示しています。<br>
外部APIには音声データを50人登録しており、ユーザーの声に近い順で〜5名が選ばれレスポンスとして返されます。（分析結果表示画面には最大4名まで表示するようにしています）
<br>
<br>

※APIレスポンス例
![APIレスポンス例](https://user-images.githubusercontent.com/73504807/128974602-82e9fd06-605f-466a-b4c5-625c719cc7da.png)
<br>
<br>

※分析結果画面
![分析結果画像](https://user-images.githubusercontent.com/73504807/126440099-cfdb212a-fa5d-4528-9f8d-6b3e9c9cba3f.png)
<br>
<br>
<br>

# Qiita記事
[【個人開発】「自分の声」が嫌いな人ほど使ってほしい！声成分分析サービス『Voice component』を作りました！](https://qiita.com/yama2_0506/items/b51999cd0d9445021ac4)
<br>
- LGTM 221(2021年8月11日現在)
<br>
<br>
<br>

# ER図
![ER図](https://user-images.githubusercontent.com/73504807/126449664-8a62aa5f-1716-4928-8077-3d3fe5aeb010.png)
<br>
<br>
<br>

# 使用技術
- Ruby 3.0.0
- Rails 6.1.3
- Vue.js 2.6.1
- Highcharts
- Capistrano
- AWS(VPC,EC2,RDS,ALB,Route53,ACM)
- 外部API [Microsoft Speaker Recognition 話者識別](https://docs.microsoft.com/ja-jp/azure/cognitive-services/speech-service/speaker-recognition-overview#speaker-identification)
<br>
<br>
<br>

# インフラ構成図
![インフラ図](https://user-images.githubusercontent.com/73504807/128970146-2a8050ef-e175-4fb8-b716-88be43df71c8.png)

