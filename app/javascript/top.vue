<template>
  <main id="app">
    <!-- 録音の開始/録音中/結果を見るボタンを設置する部分 -->
    <div class="container-fluid" v-if="screen=='recordingScreen'" key="recordingScreen">
      <p class="logo_2">声の成分分析ツール</p>
      <p class="logo_1">Voice&thinsp;<br class="br-sp">component</p>
      
      <div class="main">
        <%= image_tag 'face.png', class: 'background-image' %>

        <button class="record-btn" type="button" v-if="status=='ready'" @click="startRecording">
          さっそく声の成分をチェック!!&nbsp;<i class="fas fa-microphone fa-lg"></i><br>
          (５秒間のマイク録音が開始されます)<br>
          <div class="message">
            ※何を話すかお悩みの方へのアドバイス<br>
            <%= @message %>
          </div>
        </button>

        <button class="recording-btn" type="button" v-if="status=='recording'">
          <span id="sec"></span>&nbsp;<i class="fas fa-microphone fa-lg"></i>
        </button>
      
        <form id="btn">
          <button class="result-btn" type="button" v-if="status=='finishRecording'" @click="changeScreen">
            分析結果を確認する!!&nbsp;<i class="fas fa-search fa-lg" aria-hidden="true"></i>
          </button>
        </form>
        
        <button class="reRecording-btn" type="button" v-if="status=='finishRecording'" @click="startRecording">
          もう一度声を録音する&nbsp;<i class="fas fa-microphone fa-lg"></i>
        </button>
      </div>

      <div class="top_note">※マイクアクセスを許可にしてからご利用下さい。<br>※1ヶ月の利用回数上限を設けており、上限に達し<br>た場合は次月以降にご利用お願い致します。<br>※Internet Explorerではご利用出来ませんのでご了承下さい。</div>
      <div class="link">
        <%= link_to "Voice componentとは？", help_path %><br>
        <%= link_to "利用規約", terms_path %><br>
        <%= link_to "プライバシーポリシー", privacy_path %><br>
        <%= link_to "お問い合わせ先", inquiry_path %>
      </div>

      <p>©2021 Voice component</p>
    </div>

    <!--結果を見るボタンを押した後の結果画面部分 -->
    <div v-if="screen=='resultScreen'" key="resultScreen">
      <div class="resultTitle"><i class="fas fa-search fa-lg" aria-hidden="true"></i>&nbsp;分析結果</div>
      <div class="pie" id="pie"></div>
      <br>
      <br>
      <br>
      <div class="button-container">
        <div class="button-wrapper">
        
          <button class="button button-top button-lg" type="button" onclick="window.location.reload();">
            <i class="fas fa-home"></i>&nbsp;トップページへ
          </button>

          <a href="" id="twitter" class="button button-tw button-lg" rel="nofollow" target="_blank">
            分析結果をツイート</i>
          </a>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
    new Vue({
      el: '#app',
      data: {
        //  変数を宣言する部分
        status: 'init',     // 状況
        recorder: null,     // 音声にアクセスする "MediaRecorder" のインスタンス
        audioData: [],      // 入力された音声データ
        audioExtension: '',  // 音声ファイルの拡張子
        screen: 'recordingScreen', //画面切り替え
      },
      methods: {
        //  録音を開始する部分
        startRecording() {
          this.status = 'recording';
          this.audioData = [];
          this.recorder.start();
        },
        //  音声ファイルの拡張子を取得する部分
        getExtension(audioType) {
          let extension = 'wav';
          const matches = audioType.match(/audio\/([^;]+)/);
          if(matches) {
            extension = matches[1];
          }  
          return '.'+ extension;
        },
        // 結果画面に切り替える部分
        changeScreen () {
          this.screen = 'resultScreen';
        }
      },
      mounted() {
        //  マイクにアクセス
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            let audioBlob;
            this.recorder = new MediaRecorder(stream);
            this.recorder.addEventListener('dataavailable', e => {
              this.audioData.push(e.data);
              this.audioExtension = this.getExtension(e.data.type);
            });
            this.recorder.addEventListener('stop', () => {
              audioBlob = new Blob(this.audioData);
              formData = new FormData();
              formData.append("audio", audioBlob);
              this.status = 'finishRecording';
            });
            document.getElementById("btn").addEventListener('click', () => {
               $.ajax({
                url: '/result',  
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: 'json',
                data: formData
              }).then(data => {
                //サーバーからAPIレスポンスを取得
                const name1 = data['names'][0]['name'];
                const name2 = data['names'][1]['name'];
                const name3 = data['names'][2]['name'];
                const name4 = data['names'][3]['name'];
                const api_score1 = data['scores'][0]; //Apiレスポンスのscore
                const api_score2 = data['scores'][1];
                const api_score3 = data['scores'][2];
                const api_score4 = data['scores'][3]; 
                //APIからの取得データをグラフで表示
                const pie = new Highcharts.Chart('pie',{
                  chart: {
                    backgroundColor: '#fefbf7',
                    borderColor: '#4C4B4A',
                    borderWidth: 2,
                    borderRadius: 30,
                  },
                  title: {//タイトル設定
                    style: {
                      fontWeight: 'bold' 
                    },
                    text: 'あなたの声は下記成分を含んでいます・・・！！'
                  },
                  responsive: {
                    rules: [{
                      condition: {
                        maxWidth: 500
                      },
                      chartOptions: {
                        title: {
                          style: {
                           fontSize: 13 
                          }
                        }
                      }
                   }]
                 },
                  plotOptions: {//オプション設定
                    pie: {               
                      dataLabels: {
                        color: 'black',
                        formatter: function() {
                          return '<b>'+ this.point.name +'</b>'+'<br>'+ Math.round(this.percentage*10)/10 +'%';
                        },
                        enabled: true,
                      }
                    },
                    series: {
                      enableMouseTracking: false
                    }
                  },
                  credits: {
                    enabled: false,
                  }, 
                  series: [{//データ設定
                    type: 'pie',
                    data: [//分析結果画面に表示する名前・スコアデータ
                      {name: name1, y: api_score1, color: '#f15c80'},
                      {name: name2, y: api_score2, color: '#8085e9'},
                      {name: name3, y: api_score3, color:'#f7a35c'},
                      {name: name4, y: api_score4, color: '#90ed7d'},
                    ],
                    showInLegend: false//凡例の表示
                  }]
                });
                //twitterシェア画面への結果表示に反映させるデータ取得
                const twitter = document.getElementById('twitter');
                const total_score = api_score1 + api_score2 + api_score3 + api_score4;
                const result_score1 = Math.round((api_score1 / total_score) *1000)/10 +'％';
                const result_score2 = Math.round((api_score2 / total_score) *1000)/10 +'％';
                const result_score3 = Math.round((api_score3 / total_score) *1000)/10 +'％';
                const result_score4 = Math.round((api_score4 / total_score) *1000)/10 +'％';
                if (api_score4 > 0){
                  twitter.href = "http://twitter.com/intent/tweet?text=" 
                  + "あなたの声は・・・" + '%0a%0a' + name1 + '%20%20' + result_score1 + '%0a' + name2 + '%20%20' + result_score2 + '%0a' 
                  + name3 + '%20%20' + result_score3 + '%0a' + name4 + '%20%20' + result_score4
                  + '%0a%0a' + "の成分を含んでいます!!" + '%0a%0a' + '%23' + "VoiceComponent" + '%0a' + "&url=https://voice-component.com";
                } else if (api_score4 <= 0 && api_score3 > 0){
                  twitter.href = "http://twitter.com/intent/tweet?text=" 
                  + "あなたの声は・・・" + '%0a%0a' + name1 + '%20%20' + result_score1 + '%0a' + name2 + '%20%20' + result_score2 + '%0a' 
                  + name3 + '%20%20' + result_score3 + '%0a' 
                  + '%0a%0a' + "の成分を含んでいます!!" + '%0a%0a' + '%23' + "VoiceComponent" + '%0a' + "&url=https://voice-component.com";
                } else if (api_score4 <= 0 && api_score3 <= 0){
                  twitter.href = "http://twitter.com/intent/tweet?text=" 
                  + "あなたの声は・・・" + '%0a%0a' + name1 + '%20%20' + result_score1 + '%0a' + name2 + '%20%20' + result_score2 + '%0a' 
                  + '%0a%0a' + "の成分を含んでいます!!" + '%0a%0a' + '%23' + "VoiceComponent" + '%0a' + "&url=https://voice-component.com";
                }                
              }).catch(err => {//録音失敗した場合のエラーメッセージを表示
                alert('音声の録音に失敗しました。マイクを確認していただき、再度録音をお願いします。');
              })
            });
            this.status = 'ready';
            //音声録音ボタンを押すと5秒間カウント表示
            this.recorder.addEventListener('start', () => {
              let re = document.getElementById("sec");
              re.innerHTML = '録音中！(終了まであと5秒)';
              let sec = 4;
              let countDownTime =  setInterval( () => {
                remainingTime = sec--;
                str = '録音中！(終了まであと'+remainingTime+'秒)';
                re = document.getElementById("sec");
                re.innerHTML = str;
                if( sec === 0 ){
                  clearInterval(countDownTime);
                };
              }, 1000);
              setTimeout( () => {
                this.recorder.stop();
              }, 5000);
            });
          })
       }
     });
</script>

<style>
</style>
