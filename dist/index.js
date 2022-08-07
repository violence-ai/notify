(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Notify", [], factory);
	else if(typeof exports === 'object')
		exports["Notify"] = factory();
	else
		root["Notify"] = factory();
})(typeof self === 'undefined' ? this : self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/animate-functions/animateLikeOnIphone.ts":
/*!******************************************************!*\
  !*** ./src/animate-functions/animateLikeOnIphone.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.animateLikeOnIphone = void 0;
exports.animateLikeOnIphone = {
  /**
   * До помещения элемента в DOM.
   * Здесь нужно настроить базовые стили перед стартом анимации
   */
  beforeInsert: function beforeInsert(message, done) {
    message.elMessage.style.height = '0';
    message.elMessage.style.transition = "500ms ease";
    message.elContent.style.transform = 'scale(0)';
    message.elContent.style.opacity = '0';
    done();
  },

  /**
   * После помещения элемента в DOM.
   * Здесь нужно настроить стили для анимации появления
   */
  afterInsert: function afterInsert(message, done) {
    message.elMessage.style.height = "".concat(message.elContent.clientHeight + 20, "px");
    message.elContent.animate([{
      offset: 0,
      transform: "scale(0)",
      "opacity": "0"
    }, {
      offset: 1,
      transform: "scale(1)",
      "opacity": "1"
    }], {
      duration: 500,
      fill: "forwards",
      easing: "ease"
    }).addEventListener("finish", function () {
      done();
    });
  },

  /**
   * После того как анимация завершиться.
   * Возможно вам потребуется применить финальный стили после окончания анимации
   */
  afterInAnimateEnd: function afterInAnimateEnd(message, done) {
    done();
  },

  /**
   * После того как выйдет время отображения.
   * Подготовьте базовые стили перед началом анимации исчезновения
   */
  startOutAnimate: function startOutAnimate(message, done) {
    var outAnimationDuration = 820;
    var t = Math.floor(outAnimationDuration / 2);
    message.elContent.style.transform = 'scale(1)';
    message.elContent.style.opacity = '1';
    message.elContent.animate([{
      offset: 0,
      "opacity": "1"
    }, {
      offset: 1,
      "opacity": "0"
    }], {
      duration: t,
      fill: "forwards",
      easing: "ease"
    }).addEventListener("finish", function () {
      message.elMessage.style.transition = "".concat(t, "ms ease");
      message.elMessage.style.height = "0px";
      setTimeout(function () {
        done();
      }, t);
    });
  }
};

/***/ }),

/***/ "./src/classes/Message.ts":
/*!********************************!*\
  !*** ./src/classes/Message.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var setCSSStyles_1 = __webpack_require__(/*! ../functions/setCSSStyles */ "./src/functions/setCSSStyles.ts");

var Message = /*#__PURE__*/function () {
  function Message(params, notify) {
    _classCallCheck(this, Message);

    this.timeoutInterval = null;
    this.notify = notify;
    this.title = params.title;
    this.text = params.text;
    this.elMessage = document.createElement('div');
    this.elContent = document.createElement('div');
    this.elCloseBtn = document.createElement('div');
    this.elTitle = document.createElement('div');
    this.elText = document.createElement('div');
    this.configure();
    this.beforeInsert();
  }

  _createClass(Message, [{
    key: "configure",
    value: function configure() {
      var styles = this.notify.getStyles();
      setCSSStyles_1.setCSSStyles(this.elMessage, styles.message);
      setCSSStyles_1.setCSSStyles(this.elContent, styles.content);
      this.elContent.addEventListener('mouseenter', this.stopTimeout.bind(this));
      this.elContent.addEventListener('mouseleave', this.startTimeout.bind(this));
      setCSSStyles_1.setCSSStyles(this.elCloseBtn, styles.close);
      this.elCloseBtn.addEventListener('click', this.startOutAnimate.bind(this));
      setCSSStyles_1.setCSSStyles(this.elTitle, styles.title);
      this.elTitle.innerText = this.title;
      setCSSStyles_1.setCSSStyles(this.elText, styles.text);
      this.elText.innerText = this.text;
      this.elMessage.append(this.elContent);
      this.elContent.append(this.elCloseBtn);
      this.elContent.append(this.elTitle);
      this.elContent.append(this.elText);
    }
  }, {
    key: "beforeInsert",
    value: function beforeInsert() {
      var _this = this;

      this.notify.getAnimate().beforeInsert(this, function () {
        _this.afterInsert();
      });
    }
  }, {
    key: "afterInsert",
    value: function afterInsert() {
      var _this2 = this;

      this.notify.rootElement.prepend(this.elMessage);
      this.notify.getAnimate().afterInsert(this, function () {
        _this2.afterInAnimateEnd();
      });
    }
  }, {
    key: "afterInAnimateEnd",
    value: function afterInAnimateEnd() {
      var _this3 = this;

      this.notify.getAnimate().afterInAnimateEnd(this, function () {
        _this3.startTimeout();
      });
    }
  }, {
    key: "startOutAnimate",
    value: function startOutAnimate() {
      var _this4 = this;

      this.notify.getAnimate().startOutAnimate(this, function () {
        _this4.elMessage.remove();
      });
    }
  }, {
    key: "stopTimeout",
    value: function stopTimeout() {
      if (this.timeoutInterval) {
        clearTimeout(this.timeoutInterval);
      }
    }
  }, {
    key: "startTimeout",
    value: function startTimeout() {
      var _this5 = this;

      this.stopTimeout();
      this.timeoutInterval = setTimeout(function () {
        _this5.startOutAnimate();
      }, this.notify.options.timeout);
    }
  }]);

  return Message;
}();

exports.default = Message;

/***/ }),

/***/ "./src/functions/setCSSStyles.ts":
/*!***************************************!*\
  !*** ./src/functions/setCSSStyles.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setCSSStyles = void 0;

function setCSSStyles(el, styles) {
  for (var prop in styles) {
    var value = styles[prop];

    if (value !== undefined) {
      el.style[prop] = value;
    }
  }
}

exports.setCSSStyles = setCSSStyles;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Message_1 = __importDefault(__webpack_require__(/*! ./classes/Message */ "./src/classes/Message.ts"));

var setCSSStyles_1 = __webpack_require__(/*! ./functions/setCSSStyles */ "./src/functions/setCSSStyles.ts");

var styles_1 = __webpack_require__(/*! ./styles */ "./src/styles.ts");

var animateLikeOnIphone_1 = __webpack_require__(/*! ./animate-functions/animateLikeOnIphone */ "./src/animate-functions/animateLikeOnIphone.ts");

var Notify = /*#__PURE__*/function () {
  function Notify(options) {
    _classCallCheck(this, Notify);

    this.options = options;
    this.rootElement = this.createRootElement();
  }

  _createClass(Notify, [{
    key: "createRootElement",
    value: function createRootElement() {
      var el = document.createElement('div');
      setCSSStyles_1.setCSSStyles(el, this.getStyles().root);
      document.body.prepend(el);
      return el;
    }
  }, {
    key: "push",
    value: function push(params) {
      new Message_1["default"](params, this);
    }
  }, {
    key: "getStyles",
    value: function getStyles() {
      var _this$options$styles;

      return (_this$options$styles = this.options.styles) !== null && _this$options$styles !== void 0 ? _this$options$styles : Notify.defaultStyles;
    }
  }, {
    key: "getAnimate",
    value: function getAnimate() {
      var _this$options$animate;

      return (_this$options$animate = this.options.animateFunction) !== null && _this$options$animate !== void 0 ? _this$options$animate : animateLikeOnIphone_1.animateLikeOnIphone;
    }
  }]);

  return Notify;
}();

exports.default = Notify;
Notify.animateFunctions = {
  animateLikeOnIphone: animateLikeOnIphone_1.animateLikeOnIphone
};
Notify.defaultStyles = styles_1.styles;

/***/ }),

/***/ "./src/styles.ts":
/*!***********************!*\
  !*** ./src/styles.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.styles = void 0;
exports.styles = {
  root: {
    position: 'fixed',
    top: "20px",
    right: "40px",
    width: "300px"
  },
  message: {
    width: '100%',
    display: 'flex',
    alignItems: 'end'
  },
  content: {
    padding: '10px',
    background: '#2a2a2a',
    color: '#fff',
    borderRadius: '10px',
    position: 'relative'
  },
  title: {
    fontWeight: 'bold'
  },
  text: {
    marginTop: '10px'
  },
  close: {
    width: '10px',
    height: '10px',
    background: '#ff0000',
    borderRadius: '100px',
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ob3RpZnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9hbmltYXRlLWZ1bmN0aW9ucy9hbmltYXRlTGlrZU9uSXBob25lLnRzIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9jbGFzc2VzL01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2Z1bmN0aW9ucy9zZXRDU1NTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL05vdGlmeS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsiT2JqZWN0IiwidmFsdWUiLCJleHBvcnRzIiwiYmVmb3JlSW5zZXJ0IiwibWVzc2FnZSIsImRvbmUiLCJlbE1lc3NhZ2UiLCJzdHlsZSIsImhlaWdodCIsInRyYW5zaXRpb24iLCJlbENvbnRlbnQiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5IiwiYWZ0ZXJJbnNlcnQiLCJjbGllbnRIZWlnaHQiLCJhbmltYXRlIiwib2Zmc2V0IiwiZHVyYXRpb24iLCJmaWxsIiwiZWFzaW5nIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFmdGVySW5BbmltYXRlRW5kIiwic3RhcnRPdXRBbmltYXRlIiwib3V0QW5pbWF0aW9uRHVyYXRpb24iLCJ0IiwiTWF0aCIsImZsb29yIiwic2V0VGltZW91dCIsInNldENTU1N0eWxlc18xIiwicmVxdWlyZSIsIk1lc3NhZ2UiLCJwYXJhbXMiLCJub3RpZnkiLCJ0aW1lb3V0SW50ZXJ2YWwiLCJ0aXRsZSIsInRleHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbENsb3NlQnRuIiwiZWxUaXRsZSIsImVsVGV4dCIsImNvbmZpZ3VyZSIsInN0eWxlcyIsImdldFN0eWxlcyIsInNldENTU1N0eWxlcyIsImNvbnRlbnQiLCJzdG9wVGltZW91dCIsImJpbmQiLCJzdGFydFRpbWVvdXQiLCJjbG9zZSIsImlubmVyVGV4dCIsImFwcGVuZCIsImdldEFuaW1hdGUiLCJyb290RWxlbWVudCIsInByZXBlbmQiLCJyZW1vdmUiLCJjbGVhclRpbWVvdXQiLCJvcHRpb25zIiwidGltZW91dCIsImVsIiwicHJvcCIsInVuZGVmaW5lZCIsIl9faW1wb3J0RGVmYXVsdCIsIm1vZCIsIl9fZXNNb2R1bGUiLCJNZXNzYWdlXzEiLCJzdHlsZXNfMSIsImFuaW1hdGVMaWtlT25JcGhvbmVfMSIsIk5vdGlmeSIsImNyZWF0ZVJvb3RFbGVtZW50Iiwicm9vdCIsImJvZHkiLCJkZWZhdWx0U3R5bGVzIiwiYW5pbWF0ZUZ1bmN0aW9uIiwiYW5pbWF0ZUxpa2VPbklwaG9uZSIsImFuaW1hdGVGdW5jdGlvbnMiLCJwb3NpdGlvbiIsInRvcCIsInJpZ2h0Iiwid2lkdGgiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsInBhZGRpbmciLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJib3JkZXJSYWRpdXMiLCJmb250V2VpZ2h0IiwibWFyZ2luVG9wIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZhOztBQUNiQSw4Q0FBNkM7QUFBRUMsT0FBSyxFQUFFO0FBQVQsQ0FBN0M7QUFDQUMsMkJBQUEsR0FBOEIsS0FBSyxDQUFuQztBQUNBQSwyQkFBQSxHQUE4QjtBQUMxQjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxjQUwwQix3QkFLYkMsT0FMYSxFQUtKQyxJQUxJLEVBS0U7QUFDeEJELFdBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0JDLE1BQXhCLEdBQWlDLEdBQWpDO0FBQ0FKLFdBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0JFLFVBQXhCO0FBQ0FMLFdBQU8sQ0FBQ00sU0FBUixDQUFrQkgs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Ozs7O0FDaENhOztBQUNiMUMsOENBQTZDO0FBQUVDLE9BQUssRUFBRTtBQUFULENBQTdDO0FBQ0FDLGNBQUEsR0FBaUIsS0FBSyxDQUF0QjtBQUNBQSxjQUFBLEdBQWlCO0FBQ2JvRSxNQUFJLEVBQUU7QUFDRk0sWUFBUSxFQUFFLE9BRFI7QUFFRkMsT0FBRyxRQUZEO0FBR0ZDLFNBQUssUUFISDtBQUlGQyxTQUFLO0FBSkgsR0FETztBQU9iM0UsU0FBTyxFQUFFO0FBQ0wyRSxTQUFLLEVBQUUsTUFERjtBQUVMQyxXQUFPLEVBQUUsTUFGSjtBQUdMQyxjQUFVLEVBQUU7QUFIUCxHQVBJO0FBWWJwQyxTQUFPLEVBQUU7QUFDTHFDLFdBQU8sRUFBRSxNQURKO0FBRUxDLGNBQVUsRUFBRSxTQUZQO0FBR0xDLFNBQUssRUFBRSxNQUhGO0FBSUxDLGdCQUFZLEVBQUUsTUFKVDtBQUtMVCxZQUFRLEVBQUU7QUFMTCxHQVpJO0FBbUJiMUMsT0FBSyxFQUFFO0FBQ0hvRCxjQUFVLEVBQUU7QUFEVCxHQW5CTTtBQXNCYm5ELE1BQUksRUFBRTtBQUNGb0QsYUFBUyxFQUFFO0FBRFQsR0F0Qk87QUF5QmJ0QyxPQUFLLEVBQUU7QUFDSDhCLFNBQUssRUFBRSxNQURKO0FBRUh2RSxVQUFNLEVBQUUsTUFGTDtBQUdIMkUsY0FBVSxFQUFFLFNBSFQ7QUFJSEUsZ0JBQVksRUFBRSxPQUpYO0FBS0hULFlBQVEsRUFBRSxVQUxQO0FBTUhDLE9BQUcsRUFBRSxNQU5GO0FBT0hDLFNBQUssRUFBRSxNQVBKO0FBUUhVLFVBQU0sRUFBRTtBQVJMO0FBekJNLENBQWpCLEM7Ozs7OztVQ0hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIk5vdGlmeVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJOb3RpZnlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTm90aWZ5XCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnID8gdGhpcyA6IHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuYW5pbWF0ZUxpa2VPbklwaG9uZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5hbmltYXRlTGlrZU9uSXBob25lID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQlNC+INC/0L7QvNC10YnQtdC90LjRjyDRjdC70LXQvNC10L3RgtCwINCyIERPTS5cclxuICAgICAqINCX0LTQtdGB0Ywg0L3Rg9C20L3QviDQvdCw0YHRgtGA0L7QuNGC0Ywg0LHQsNC30L7QstGL0LUg0YHRgtC40LvQuCDQv9C10YDQtdC0INGB0YLQsNGA0YLQvtC8INCw0L3QuNC80LDRhtC40LhcclxuICAgICAqL1xyXG4gICAgYmVmb3JlSW5zZXJ0KG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSAnMCc7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUudHJhbnNpdGlvbiA9IGA1MDBtcyBlYXNlYDtcclxuICAgICAgICBtZXNzYWdlLmVsQ29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxDb250ZW50LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0J/QvtGB0LvQtSDQv9C+0LzQtdGJ0LXQvdC40Y8g0Y3Qu9C10LzQtdC90YLQsCDQsiBET00uXHJcbiAgICAgKiDQl9C00LXRgdGMINC90YPQttC90L4g0L3QsNGB0YLRgNC+0LjRgtGMINGB0YLQuNC70Lgg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0L/QvtGP0LLQu9C10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIGFmdGVySW5zZXJ0KG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBgJHttZXNzYWdlLmVsQ29udGVudC5jbGllbnRIZWlnaHQgKyAyMH1weGA7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuYW5pbWF0ZShbXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAwLCB0cmFuc2Zvcm06IFwic2NhbGUoMClcIiwgXCJvcGFjaXR5XCI6IFwiMFwiIH0sXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAxLCB0cmFuc2Zvcm06IFwic2NhbGUoMSlcIiwgXCJvcGFjaXR5XCI6IFwiMVwiIH0sXHJcbiAgICAgICAgXSwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBmaWxsOiBcImZvcndhcmRzXCIsXHJcbiAgICAgICAgICAgIGVhc2luZzogXCJlYXNlXCJcclxuICAgICAgICB9KS5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsICgpID0+IHtcclxuICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0J/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0LDQvdC40LzQsNGG0LjRjyDQt9Cw0LLQtdGA0YjQuNGC0YzRgdGPLlxyXG4gICAgICog0JLQvtC30LzQvtC20L3QviDQstCw0Lwg0L/QvtGC0YDQtdCx0YPQtdGC0YHRjyDQv9GA0LjQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9GM0L3Ri9C5INGB0YLQuNC70Lgg0L/QvtGB0LvQtSDQvtC60L7QvdGH0LDQvdC40Y8g0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICovXHJcbiAgICBhZnRlckluQW5pbWF0ZUVuZChtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0J/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0LLRi9C50LTQtdGCINCy0YDQtdC80Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjy5cclxuICAgICAqINCf0L7QtNCz0L7RgtC+0LLRjNGC0LUg0LHQsNC30L7QstGL0LUg0YHRgtC40LvQuCDQv9C10YDQtdC0INC90LDRh9Cw0LvQvtC8INCw0L3QuNC80LDRhtC40Lgg0LjRgdGH0LXQt9C90L7QstC10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0T3V0QW5pbWF0ZShtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgY29uc3Qgb3V0QW5pbWF0aW9uRHVyYXRpb24gPSA4MjA7XHJcbiAgICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3Iob3V0QW5pbWF0aW9uRHVyYXRpb24gLyAyKTtcclxuICAgICAgICBtZXNzYWdlLmVsQ29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxDb250ZW50LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuYW5pbWF0ZShbXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAwLCBcIm9wYWNpdHlcIjogXCIxXCIgfSxcclxuICAgICAgICAgICAgeyBvZmZzZXQ6IDEsIFwib3BhY2l0eVwiOiBcIjBcIiB9LFxyXG4gICAgICAgIF0sIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IHQsXHJcbiAgICAgICAgICAgIGZpbGw6IFwiZm9yd2FyZHNcIixcclxuICAgICAgICAgICAgZWFzaW5nOiBcImVhc2VcIlxyXG4gICAgICAgIH0pLmFkZEV2ZW50TGlzdGVuZXIoXCJmaW5pc2hcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2l0aW9uID0gYCR7dH1tcyBlYXNlYDtcclxuICAgICAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgIH0sIHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBzZXRDU1NTdHlsZXNfMSA9IHJlcXVpcmUoXCIuLi9mdW5jdGlvbnMvc2V0Q1NTU3R5bGVzXCIpO1xyXG5jbGFzcyBNZXNzYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgbm90aWZ5KSB7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm90aWZ5ID0gbm90aWZ5O1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBwYXJhbXMudGl0bGU7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gcGFyYW1zLnRleHQ7XHJcbiAgICAgICAgdGhpcy5lbE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWxDbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWxUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICB0aGlzLmJlZm9yZUluc2VydCgpO1xyXG4gICAgfVxyXG4gICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMubm90aWZ5LmdldFN0eWxlcygpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyh0aGlzLmVsTWVzc2FnZSwgc3R5bGVzLm1lc3NhZ2UpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyh0aGlzLmVsQ29udGVudCwgc3R5bGVzLmNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLnN0b3BUaW1lb3V0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnN0YXJ0VGltZW91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXModGhpcy5lbENsb3NlQnRuLCBzdHlsZXMuY2xvc2UpO1xyXG4gICAgICAgIHRoaXMuZWxDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3RhcnRPdXRBbmltYXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyh0aGlzLmVsVGl0bGUsIHN0eWxlcy50aXRsZSk7XHJcbiAgICAgICAgdGhpcy5lbFRpdGxlLmlubmVyVGV4dCA9IHRoaXMudGl0bGU7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKHRoaXMuZWxUZXh0LCBzdHlsZXMudGV4dCk7XHJcbiAgICAgICAgdGhpcy5lbFRleHQuaW5uZXJUZXh0ID0gdGhpcy50ZXh0O1xyXG4gICAgICAgIHRoaXMuZWxNZXNzYWdlLmFwcGVuZCh0aGlzLmVsQ29udGVudCk7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQuYXBwZW5kKHRoaXMuZWxDbG9zZUJ0bik7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQuYXBwZW5kKHRoaXMuZWxUaXRsZSk7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQuYXBwZW5kKHRoaXMuZWxUZXh0KTtcclxuICAgIH1cclxuICAgIGJlZm9yZUluc2VydCgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeS5nZXRBbmltYXRlKCkuYmVmb3JlSW5zZXJ0KHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZnRlckluc2VydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWZ0ZXJJbnNlcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkucm9vdEVsZW1lbnQucHJlcGVuZCh0aGlzLmVsTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkuZ2V0QW5pbWF0ZSgpLmFmdGVySW5zZXJ0KHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZnRlckluQW5pbWF0ZUVuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWZ0ZXJJbkFuaW1hdGVFbmQoKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkuZ2V0QW5pbWF0ZSgpLmFmdGVySW5BbmltYXRlRW5kKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVvdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXJ0T3V0QW5pbWF0ZSgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeS5nZXRBbmltYXRlKCkuc3RhcnRPdXRBbmltYXRlKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbE1lc3NhZ2UucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wVGltZW91dCgpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lb3V0SW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydFRpbWVvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wVGltZW91dCgpO1xyXG4gICAgICAgIHRoaXMudGltZW91dEludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRPdXRBbmltYXRlKCk7XHJcbiAgICAgICAgfSwgdGhpcy5ub3RpZnkub3B0aW9ucy50aW1lb3V0KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBNZXNzYWdlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNldENTU1N0eWxlcyA9IHZvaWQgMDtcclxuZnVuY3Rpb24gc2V0Q1NTU3R5bGVzKGVsLCBzdHlsZXMpIHtcclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBzdHlsZXMpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHN0eWxlc1twcm9wXTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnNldENTU1N0eWxlcyA9IHNldENTU1N0eWxlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTWVzc2FnZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NsYXNzZXMvTWVzc2FnZVwiKSk7XHJcbmNvbnN0IHNldENTU1N0eWxlc18xID0gcmVxdWlyZShcIi4vZnVuY3Rpb25zL3NldENTU1N0eWxlc1wiKTtcclxuY29uc3Qgc3R5bGVzXzEgPSByZXF1aXJlKFwiLi9zdHlsZXNcIik7XHJcbmNvbnN0IGFuaW1hdGVMaWtlT25JcGhvbmVfMSA9IHJlcXVpcmUoXCIuL2FuaW1hdGUtZnVuY3Rpb25zL2FuaW1hdGVMaWtlT25JcGhvbmVcIik7XHJcbmNsYXNzIE5vdGlmeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVSb290RWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUm9vdEVsZW1lbnQoKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXMoZWwsIHRoaXMuZ2V0U3R5bGVzKCkucm9vdCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKGVsKTtcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbiAgICBwdXNoKHBhcmFtcykge1xyXG4gICAgICAgIG5ldyBNZXNzYWdlXzEuZGVmYXVsdChwYXJhbXMsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0U3R5bGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3R5bGVzID8/IE5vdGlmeS5kZWZhdWx0U3R5bGVzO1xyXG4gICAgfVxyXG4gICAgZ2V0QW5pbWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFuaW1hdGVGdW5jdGlvbiA/PyBhbmltYXRlTGlrZU9uSXBob25lXzEuYW5pbWF0ZUxpa2VPbklwaG9uZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBOb3RpZnk7XHJcbk5vdGlmeS5hbmltYXRlRnVuY3Rpb25zID0geyBhbmltYXRlTGlrZU9uSXBob25lOiBhbmltYXRlTGlrZU9uSXBob25lXzEuYW5pbWF0ZUxpa2VPbklwaG9uZSB9O1xyXG5Ob3RpZnkuZGVmYXVsdFN0eWxlcyA9IHN0eWxlc18xLnN0eWxlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zdHlsZXMgPSB2b2lkIDA7XHJcbmV4cG9ydHMuc3R5bGVzID0ge1xyXG4gICAgcm9vdDoge1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIHRvcDogYDIwcHhgLFxyXG4gICAgICAgIHJpZ2h0OiBgNDBweGAsXHJcbiAgICAgICAgd2lkdGg6IGAzMDBweGAsXHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZToge1xyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdlbmQnLFxyXG4gICAgfSxcclxuICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICBwYWRkaW5nOiAnMTBweCcsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJyMyYTJhMmEnLFxyXG4gICAgICAgIGNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgIH0sXHJcbiAgICB0ZXh0OiB7XHJcbiAgICAgICAgbWFyZ2luVG9wOiAnMTBweCdcclxuICAgIH0sXHJcbiAgICBjbG9zZToge1xyXG4gICAgICAgIHdpZHRoOiAnMTBweCcsXHJcbiAgICAgICAgaGVpZ2h0OiAnMTBweCcsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJyNmZjAwMDAnLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzEwMHB4JyxcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICB0b3A6ICcxMHB4JyxcclxuICAgICAgICByaWdodDogJzEwcHgnLFxyXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICB9LFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9