new Vue({
  el: '#app',
  data: {

  // ① 変数を宣言する部分
    status: 'init',     // 状況
    recorder: null,     // 音声にアクセスする "MediaRecorder" のインスタンス
    audioData: [],      // 入力された音声データ
    audioExtension: ''  // 音声ファイルの拡張子

  },
  methods: {

    // ② 録音を開始／ストップする部分
    startRecording() {

      this.status = 'recording';
      this.audioData = [];
      this.recorder.start();

    },
    stopRecording() {

      this.recorder.stop();
      this.status = 'ready';

    },

    // ④ 音声ファイルの拡張子を取得する部分
    getExtension(audioType) {

      let extension = 'wav';
      const matches = audioType.match(/audio\/([^;]+)/);

      if(matches) {

        extension = matches[1];

      }

        return '.'+ extension;

    }

  },
  mounted() {

    // ⑤ マイクにアクセス
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {

        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', e => {

          this.audioData.push(e.data);
          this.audioExtension = this.getExtension(e.data.type);

        });
        this.recorder.addEventListener('stop', () => {

          const audioBlob = new Blob(this.audioData);
          fetch('https://westus.api.cognitive.microsoft.com/speaker/identification/v2.0/text-independent/profiles/identifySingleSpeaker?profileIds=34349224-8943-4073-8a42-e6bc6e35eb31,44b1405c-dc29-48c5-b916-cf344e2d26b3,94fa8cdd-afac-4c29-976d-44f766201e39&ignoreMinLength={true}', {
            method: 'POST',
            headers: {
              "Ocp-Apim-Subscription-Key":"94a7ea4342be483a8b1e3a4c039ecdd0",
              "Content-Type":"audio/wav"
            },
            body: audioBlob
          }).then(response => {
            return response.json();
          }).then(data => {
            console.log(data);
          }).catch(err => {
            console.log(err);
          })
        });
        this.status = 'ready';

      });

  }
});


