# sotsusei

[webgazer.js](https://webgazer.cs.brown.edu/)を用いて任意のサイトで視線トラッキングを行うプログラム  
生成したcsvファイルを[別で制作したプログラム](https://github.com/sawasick/sotsuseiApp)で読み込むことでヒートマップ画像を作成できる

## Usage
視線トラッキングを行いたいwebページのHTMLに下記を追加
```html
<body>
  <!-- body末尾 -->
  <script src="./src/js/jquery.js"></script>
  <script src="./src/js/add.js"></script>
  <script async src="./src/js/webgazer.min.min.js"></script>
  <script src="./src/js/main.js"></script>
  <script src="./src/js/calibration.js"></script>
  <script src="./src/js/precision_calculation.js"></script>
  <script src="./src/js/precision_store_points.js"></script>
  <script src="./src/js/resize_canvas.js"></script>

  <!-- もしくは上記のjsファイルを1つにまとめた -->
  <script src="./combine.js"></script>
</body>
```
ページ遷移、タブを閉じるなどするとcsvファイルがダウンロードされる  
ファイル名はwgYYYYMMDDHHMM.csv(年月日時間分)

---
### 各jsファイルの機能
- jquery.js...jqueryを使用するためのファイル
- add.js...キャリブレーションのためのDOM要素を追加する
- webgazer.min.min.js...webgazerのコア部分、webgazer.jsを手動で圧縮したもの
- main.js...webgazerの起動や視線の座標データを処理、csv出力など
- calibration.js...キャリブレーションを行う
- precision_calculation.js...精度を計算(?)
- precision_store_points.js...(?)
- resize_canvas.js...canvas要素のサイズを変える(?)