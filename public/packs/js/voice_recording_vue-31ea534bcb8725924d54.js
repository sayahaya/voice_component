/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/voice_recording_vue.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/voice_recording_vue.js":
/*!*****************************************************!*\
  !*** ./app/javascript/packs/voice_recording_vue.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#app',
  data: {
    // ① 変数を宣言する部分
    status: 'init',
    // 状況
    recorder: null,
    // 音声にアクセスする "MediaRecorder" のインスタンス
    audioData: [],
    // 入力された音声データ
    audioExtension: '' // 音声ファイルの拡張子

  },
  methods: {
    // ② 録音を開始／ストップする部分
    startRecording: function startRecording() {
      this.status = 'recording';
      this.audioData = [];
      this.recorder.start();
    },
    stopRecording: function stopRecording() {
      this.recorder.stop();
      this.status = 'ready';
    },
    // ④ 音声ファイルの拡張子を取得する部分
    getExtension: function getExtension(audioType) {
      var extension = 'wav';
      var matches = audioType.match(/audio\/([^;]+)/);

      if (matches) {
        extension = matches[1];
      }

      return '.' + extension;
    }
  },
  mounted: function mounted() {
    var _this = this;

    // ⑤ マイクにアクセス
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(function (stream) {
      _this.recorder = new MediaRecorder(stream);

      _this.recorder.addEventListener('dataavailable', function (e) {
        _this.audioData.push(e.data);

        _this.audioExtension = _this.getExtension(e.data.type);
      });

      _this.recorder.addEventListener('stop', function () {
        var audioBlob = new Blob(_this.audioData);
        fetch('https://westus.api.cognitive.microsoft.com/speaker/identification/v2.0/text-independent/profiles/identifySingleSpeaker?profileIds=34349224-8943-4073-8a42-e6bc6e35eb31,44b1405c-dc29-48c5-b916-cf344e2d26b3,94fa8cdd-afac-4c29-976d-44f766201e39&ignoreMinLength={true}', {
          method: 'POST',
          headers: {
            "Ocp-Apim-Subscription-Key": "94a7ea4342be483a8b1e3a4c039ecdd0",
            "Content-Type": "audio/wav"
          },
          body: audioBlob
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log(data);
        })["catch"](function (err) {
          console.log(err);
        });
      });

      _this.status = 'ready';
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=voice_recording_vue-31ea534bcb8725924d54.js.map