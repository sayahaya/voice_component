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

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/hayat/voice_component/app/javascript/packs/voice_recording_vue.js: Support for the experimental syntax 'jsx' isn't currently enabled (1:1):\n\n> 1 | <head>\n    | ^\n  2 |   <link href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" rel=\"stylesheet\">\n  3 | </head>\n  4 | <body class=\"p-3\">\n\nAdd @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.\n    at Parser._raise (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:776:17)\n    at Parser.raiseWithData (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:769:17)\n    at Parser.expectOnePlugin (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:9750:18)\n    at Parser.parseExprAtom (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:11125:22)\n    at Parser.parseExprSubscripts (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10708:23)\n    at Parser.parseUpdate (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10688:21)\n    at Parser.parseMaybeUnary (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10666:23)\n    at Parser.parseExprOps (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10523:23)\n    at Parser.parseMaybeConditional (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10497:23)\n    at Parser.parseMaybeAssign (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10460:21)\n    at Parser.parseExpressionBase (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10405:23)\n    at /Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10399:39\n    at Parser.allowInAnd (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12098:16)\n    at Parser.parseExpression (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:10399:17)\n    at Parser.parseStatementContent (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12390:23)\n    at Parser.parseStatement (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12259:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12845:25)\n    at Parser.parseBlockBody (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12836:10)\n    at Parser.parseProgram (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12190:10)\n    at Parser.parseTopLevel (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:12181:25)\n    at Parser.parse (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:13892:10)\n    at parse (/Users/hayat/voice_component/node_modules/@babel/parser/lib/index.js:13944:38)\n    at parser (/Users/hayat/voice_component/node_modules/@babel/core/lib/parser/index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/hayat/voice_component/node_modules/@babel/core/lib/transformation/normalize-file.js:55:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/hayat/voice_component/node_modules/@babel/core/lib/transformation/index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (/Users/hayat/voice_component/node_modules/@babel/core/lib/transform.js:19:41)\n    at transform.next (<anonymous>)\n    at step (/Users/hayat/voice_component/node_modules/gensync/index.js:261:32)\n    at /Users/hayat/voice_component/node_modules/gensync/index.js:273:13\n    at async.call.result.err.err (/Users/hayat/voice_component/node_modules/gensync/index.js:223:11)\n    at /Users/hayat/voice_component/node_modules/gensync/index.js:189:28\n    at /Users/hayat/voice_component/node_modules/@babel/core/lib/gensync-utils/async.js:62:7\n    at /Users/hayat/voice_component/node_modules/gensync/index.js:113:33");

/***/ })

/******/ });
//# sourceMappingURL=voice_recording_vue-2dedd3de0b0129a96a7d.js.map