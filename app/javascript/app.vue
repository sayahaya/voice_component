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
              const name1 = data['names'][0];
              const name2 = data['names'][1];
              const name3 = data['names'][2];
              const name4 = data['names'][3];
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
              const twitter_post = "http://twitter.com/intent/tweet?text="
                + "あなたの声は・・・" + '%0a%0a' + name1 + '%20%20' + result_score1 + '%0a' + name2 + '%20%20' + result_score2 + '%0a'
                + name3 + '%20%20' + result_score3 + '%0a' + name4 + '%20%20' + result_score4
                + '%0a%0a' + "の成分を含んでいます!!" + '%0a%0a' + '%23' + "VoiceComponent" + '%0a' + "&url=https://voice-component.com";
              twitter.href = twitter_post
            }).catch(err => {//録音失敗した場合のエラーメッセージを表示
              console.log(err);
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
    }
   });
</script>
