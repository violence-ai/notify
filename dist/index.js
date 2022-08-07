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
    this.notify = notify; // create elements

    this.elMessage = document.createElement('div');
    this.elContent = document.createElement('div');
    this.elCloseBtn = document.createElement('div');
    this.elTitle = document.createElement('div');
    this.elText = document.createElement('div');
    var styles = this.notify.getStyles(); // set styles

    setCSSStyles_1.setCSSStyles(this.elMessage, styles.message);
    setCSSStyles_1.setCSSStyles(this.elContent, styles.content);
    setCSSStyles_1.setCSSStyles(this.elCloseBtn, styles.close);
    setCSSStyles_1.setCSSStyles(this.elTitle, styles.title);
    setCSSStyles_1.setCSSStyles(this.elText, styles.text); // set event listeners

    this.elContent.addEventListener('mouseenter', this.stopTimeout.bind(this));
    this.elContent.addEventListener('mouseleave', this.startTimeout.bind(this));
    this.elCloseBtn.addEventListener('click', this.startOutAnimate.bind(this)); // set text data

    this.elTitle.innerText = params.title;
    this.elText.innerText = params.text; // build

    this.elMessage.append(this.elContent);
    this.elContent.append(this.elCloseBtn);
    this.elContent.append(this.elTitle);
    this.elContent.append(this.elText);
    this.beforeInsert();
  }

  _createClass(Message, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ob3RpZnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9hbmltYXRlLWZ1bmN0aW9ucy9hbmltYXRlTGlrZU9uSXBob25lLnRzIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9jbGFzc2VzL01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2Z1bmN0aW9ucy9zZXRDU1NTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL05vdGlmeS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsiT2JqZWN0IiwidmFsdWUiLCJleHBvcnRzIiwiYmVmb3JlSW5zZXJ0IiwibWVzc2FnZSIsImRvbmUiLCJlbE1lc3NhZ2UiLCJzdHlsZSIsImhlaWdodCIsInRyYW5zaXRpb24iLCJlbENvbnRlbnQiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5IiwiYWZ0ZXJJbnNlcnQiLCJjbGllbnRIZWlnaHQiLCJhbmltYXRlIiwib2Zmc2V0IiwiZHVyYXRpb24iLCJmaWxsIiwiZWFzaW5nIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFmdGVySW5BbmltYXRlRW5kIiwic3RhcnRPdXRBbmltYXRlIiwib3V0QW5pbWF0aW9uRHVyYXRpb24iLCJ0IiwiTWF0aCIsImZsb29yIiwic2V0VGltZW91dCIsInNldENTU1N0eWxlc18xIiwicmVxdWlyZSIsIk1lc3NhZ2UiLCJwYXJhbXMiLCJub3RpZnkiLCJ0aW1lb3V0SW50ZXJ2YWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbENsb3NlQnRuIiwiZWxUaXRsZSIsImVsVGV4dCIsInN0eWxlcyIsImdldFN0eWxlcyIsInNldENTU1N0eWxlcyIsImNvbnRlbnQiLCJjbG9zZSIsInRpdGxlIiwidGV4dCIsInN0b3BUaW1lb3V0IiwiYmluZCIsInN0YXJ0VGltZW91dCIsImlubmVyVGV4dCIsImFwcGVuZCIsImdldEFuaW1hdGUiLCJyb290RWxlbWVudCIsInByZXBlbmQiLCJyZW1vdmUiLCJjbGVhclRpbWVvdXQiLCJvcHRpb25zIiwidGltZW91dCIsImVsIiwicHJvcCIsInVuZGVmaW5lZCIsIl9faW1wb3J0RGVmYXVsdCIsIm1vZCIsIl9fZXNNb2R1bGUiLCJNZXNzYWdlXzEiLCJzdHlsZXNfMSIsImFuaW1hdGVMaWtlT25JcGhvbmVfMSIsIk5vdGlmeSIsImNyZWF0ZVJvb3RFbGVtZW50Iiwicm9vdCIsImJvZHkiLCJkZWZhdWx0U3R5bGVzIiwiYW5pbWF0ZUZ1bmN0aW9uIiwiYW5pbWF0ZUxpa2VPbklwaG9uZSIsImFuaW1hdGVGdW5jdGlvbnMiLCJwb3NpdGlvbiIsInRvcCIsInJpZ2h0Iiwid2lkdGgiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsInBhZGRpbmciLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJib3JkZXJSYWRpdXMiLCJmb250V2VpZ2h0IiwibWFyZ2luVG9wIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZhOztBQUNiQSw4Q0FBNkM7QUFBRUMsT0FBSyxFQUFFO0FBQVQsQ0FBN0M7QUFDQUMsMkJBQUEsR0FBOEIsS0FBSyxDQUFuQztBQUNBQSwyQkFBQSxHQUE4QjtBQUMxQjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxjQUwwQix3QkFLYkMsT0FMYSxFQUtKQyxJQUxJLEVBS0U7QUFDeEJELFdBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0JDLE1BQXhCLEdBQWlDLEdBQWpDO0FBQ0FKLFdBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0JFLFVBQXhCO0FBQ0FMLFdBQU8sQ0FBQ00sU0FBUixDQUFrQkgsS0FBbEIsQ0FBd0JJ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LENBQTdDO0FBQ0FDLGNBQUEsR0FBaUIsS0FBSyxDQUF0QjtBQUNBQSxjQUFBLEdBQWlCO0FBQ2JtRSxNQUFJLEVBQUU7QUFDRk0sWUFBUSxFQUFFLE9BRFI7QUFFRkMsT0FBRyxRQUZEO0FBR0ZDLFNBQUssUUFISDtBQUlGQyxTQUFLO0FBSkgsR0FETztBQU9iMUUsU0FBTyxFQUFFO0FBQ0wwRSxTQUFLLEVBQUUsTUFERjtBQUVMQyxXQUFPLEVBQUUsTUFGSjtBQUdMQyxjQUFVLEVBQUU7QUFIUCxHQVBJO0FBWWJ0QyxTQUFPLEVBQUU7QUFDTHVDLFdBQU8sRUFBRSxNQURKO0FBRUxDLGNBQVUsRUFBRSxTQUZQO0FBR0xDLFNBQUssRUFBRSxNQUhGO0FBSUxDLGdCQUFZLEVBQUUsTUFKVDtBQUtMVCxZQUFRLEVBQUU7QUFMTCxHQVpJO0FBbUJiL0IsT0FBSyxFQUFFO0FBQ0h5QyxjQUFVLEVBQUU7QUFEVCxHQW5CTTtBQXNCYnhDLE1BQUksRUFBRTtBQUNGeUMsYUFBUyxFQUFFO0FBRFQsR0F0Qk87QUF5QmIzQyxPQUFLLEVBQUU7QUFDSG1DLFNBQUssRUFBRSxNQURKO0FBRUh0RSxVQUFNLEVBQUUsTUFGTDtBQUdIMEUsY0FBVSxFQUFFLFNBSFQ7QUFJSEUsZ0JBQVksRUFBRSxPQUpYO0FBS0hULFlBQVEsRUFBRSxVQUxQO0FBTUhDLE9BQUcsRUFBRSxNQU5GO0FBT0hDLFNBQUssRUFBRSxNQVBKO0FBUUhVLFVBQU0sRUFBRTtBQVJMO0FBekJNLENBQWpCLEM7Ozs7OztVQ0hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIk5vdGlmeVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJOb3RpZnlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTm90aWZ5XCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnID8gdGhpcyA6IHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuYW5pbWF0ZUxpa2VPbklwaG9uZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5hbmltYXRlTGlrZU9uSXBob25lID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQlNC+INC/0L7QvNC10YnQtdC90LjRjyDRjdC70LXQvNC10L3RgtCwINCyIERPTS5cclxuICAgICAqINCX0LTQtdGB0Ywg0L3Rg9C20L3QviDQvdCw0YHRgtGA0L7QuNGC0Ywg0LHQsNC30L7QstGL0LUg0YHRgtC40LvQuCDQv9C10YDQtdC0INGB0YLQsNGA0YLQvtC8INCw0L3QuNC80LDRhtC40LhcclxuICAgICAqL1xyXG4gICAgYmVmb3JlSW5zZXJ0KG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSAnMCc7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUudHJhbnNpdGlvbiA9IGA1MDBtcyBlYXNlYDtcclxuICAgICAgICBtZXNzYWdlLmVsQ29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxDb250ZW50LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0J/QvtGB0LvQtSDQv9C+0LzQtdGJ0LXQvdC40Y8g0Y3Qu9C10LzQtdC90YLQsCDQsiBET00uXHJcbiAgICAgKiDQl9C00LXRgdGMINC90YPQttC90L4g0L3QsNGB0YLRgNC+0LjRgtGMINGB0YLQuNC70Lgg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0L/QvtGP0LLQu9C10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIGFmdGVySW5zZXJ0KG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBgJHttZXNzYWdlLmVsQ29udGVudC5jbGllbnRIZWlnaHQgKyAyMH1weGA7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuYW5pbWF0ZShbXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAwLCB0cmFuc2Zvcm06IFwic2NhbGUoMClcIiwgXCJvcGFjaXR5XCI6IFwiMFwiIH0sXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAxLCB0cmFuc2Zvcm06IFwic2NhbGUoMSlcIiwgXCJvcGFjaXR5XCI6IFwiMVwiIH0sXHJcbiAgICAgICAgXSwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBmaWxsOiBcImZvcndhcmRzXCIsXHJcbiAgICAgICAgICAgIGVhc2luZzogXCJlYXNlXCJcclxuICAgICAgICB9KS5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsICgpID0+IHtcclxuICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0J/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0LDQvdC40LzQsNGG0LjRjyDQt9Cw0LLQtdGA0YjQuNGC0YzRgdGPLlxyXG4gICAgICog0JLQvtC30LzQvtC20L3QviDQstCw0Lwg0L/QvtGC0YDQtdCx0YPQtdGC0YHRjyDQv9GA0LjQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9GM0L3Ri9C5INGB0YLQuNC70Lgg0L/QvtGB0LvQtSDQvtC60L7QvdGH0LDQvdC40Y8g0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICovXHJcbiAgICBhZnRlckluQW5pbWF0ZUVuZChtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0J/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0LLRi9C50LTQtdGCINCy0YDQtdC80Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjy5cclxuICAgICAqINCf0L7QtNCz0L7RgtC+0LLRjNGC0LUg0LHQsNC30L7QstGL0LUg0YHRgtC40LvQuCDQv9C10YDQtdC0INC90LDRh9Cw0LvQvtC8INCw0L3QuNC80LDRhtC40Lgg0LjRgdGH0LXQt9C90L7QstC10L3QuNGPXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0T3V0QW5pbWF0ZShtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgY29uc3Qgb3V0QW5pbWF0aW9uRHVyYXRpb24gPSA4MjA7XHJcbiAgICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3Iob3V0QW5pbWF0aW9uRHVyYXRpb24gLyAyKTtcclxuICAgICAgICBtZXNzYWdlLmVsQ29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxDb250ZW50LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuYW5pbWF0ZShbXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAwLCBcIm9wYWNpdHlcIjogXCIxXCIgfSxcclxuICAgICAgICAgICAgeyBvZmZzZXQ6IDEsIFwib3BhY2l0eVwiOiBcIjBcIiB9LFxyXG4gICAgICAgIF0sIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IHQsXHJcbiAgICAgICAgICAgIGZpbGw6IFwiZm9yd2FyZHNcIixcclxuICAgICAgICAgICAgZWFzaW5nOiBcImVhc2VcIlxyXG4gICAgICAgIH0pLmFkZEV2ZW50TGlzdGVuZXIoXCJmaW5pc2hcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2l0aW9uID0gYCR7dH1tcyBlYXNlYDtcclxuICAgICAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgIH0sIHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBzZXRDU1NTdHlsZXNfMSA9IHJlcXVpcmUoXCIuLi9mdW5jdGlvbnMvc2V0Q1NTU3R5bGVzXCIpO1xyXG5jbGFzcyBNZXNzYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgbm90aWZ5KSB7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm90aWZ5ID0gbm90aWZ5O1xyXG4gICAgICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xyXG4gICAgICAgIHRoaXMuZWxNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsQ2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMubm90aWZ5LmdldFN0eWxlcygpO1xyXG4gICAgICAgIC8vIHNldCBzdHlsZXNcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXModGhpcy5lbE1lc3NhZ2UsIHN0eWxlcy5tZXNzYWdlKTtcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXModGhpcy5lbENvbnRlbnQsIHN0eWxlcy5jb250ZW50KTtcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXModGhpcy5lbENsb3NlQnRuLCBzdHlsZXMuY2xvc2UpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyh0aGlzLmVsVGl0bGUsIHN0eWxlcy50aXRsZSk7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKHRoaXMuZWxUZXh0LCBzdHlsZXMudGV4dCk7XHJcbiAgICAgICAgLy8gc2V0IGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLnN0b3BUaW1lb3V0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnN0YXJ0VGltZW91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmVsQ2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN0YXJ0T3V0QW5pbWF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvLyBzZXQgdGV4dCBkYXRhXHJcbiAgICAgICAgdGhpcy5lbFRpdGxlLmlubmVyVGV4dCA9IHBhcmFtcy50aXRsZTtcclxuICAgICAgICB0aGlzLmVsVGV4dC5pbm5lclRleHQgPSBwYXJhbXMudGV4dDtcclxuICAgICAgICAvLyBidWlsZFxyXG4gICAgICAgIHRoaXMuZWxNZXNzYWdlLmFwcGVuZCh0aGlzLmVsQ29udGVudCk7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQuYXBwZW5kKHRoaXMuZWxDbG9zZUJ0bik7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQuYXBwZW5kKHRoaXMuZWxUaXRsZSk7XHJcbiAgICAgICAgdGhpcy5lbENvbnRlbnQuYXBwZW5kKHRoaXMuZWxUZXh0KTtcclxuICAgICAgICB0aGlzLmJlZm9yZUluc2VydCgpO1xyXG4gICAgfVxyXG4gICAgYmVmb3JlSW5zZXJ0KCkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5LmdldEFuaW1hdGUoKS5iZWZvcmVJbnNlcnQodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFmdGVySW5zZXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZnRlckluc2VydCgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeS5yb290RWxlbWVudC5wcmVwZW5kKHRoaXMuZWxNZXNzYWdlKTtcclxuICAgICAgICB0aGlzLm5vdGlmeS5nZXRBbmltYXRlKCkuYWZ0ZXJJbnNlcnQodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFmdGVySW5BbmltYXRlRW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZnRlckluQW5pbWF0ZUVuZCgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeS5nZXRBbmltYXRlKCkuYWZ0ZXJJbkFuaW1hdGVFbmQodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZW91dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhcnRPdXRBbmltYXRlKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5LmdldEFuaW1hdGUoKS5zdGFydE91dEFuaW1hdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsTWVzc2FnZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0b3BUaW1lb3V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0VGltZW91dCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lb3V0KCk7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydE91dEFuaW1hdGUoKTtcclxuICAgICAgICB9LCB0aGlzLm5vdGlmeS5vcHRpb25zLnRpbWVvdXQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE1lc3NhZ2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc2V0Q1NTU3R5bGVzID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBzZXRDU1NTdHlsZXMoZWwsIHN0eWxlcykge1xyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIHN0eWxlcykge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3R5bGVzW3Byb3BdO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuc2V0Q1NTU3R5bGVzID0gc2V0Q1NTU3R5bGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNZXNzYWdlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY2xhc3Nlcy9NZXNzYWdlXCIpKTtcclxuY29uc3Qgc2V0Q1NTU3R5bGVzXzEgPSByZXF1aXJlKFwiLi9mdW5jdGlvbnMvc2V0Q1NTU3R5bGVzXCIpO1xyXG5jb25zdCBzdHlsZXNfMSA9IHJlcXVpcmUoXCIuL3N0eWxlc1wiKTtcclxuY29uc3QgYW5pbWF0ZUxpa2VPbklwaG9uZV8xID0gcmVxdWlyZShcIi4vYW5pbWF0ZS1mdW5jdGlvbnMvYW5pbWF0ZUxpa2VPbklwaG9uZVwiKTtcclxuY2xhc3MgTm90aWZ5IHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVJvb3RFbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVSb290RWxlbWVudCgpIHtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyhlbCwgdGhpcy5nZXRTdHlsZXMoKS5yb290KTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQoZWwpO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuICAgIHB1c2gocGFyYW1zKSB7XHJcbiAgICAgICAgbmV3IE1lc3NhZ2VfMS5kZWZhdWx0KHBhcmFtcywgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXRTdHlsZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZXMgPz8gTm90aWZ5LmRlZmF1bHRTdHlsZXM7XHJcbiAgICB9XHJcbiAgICBnZXRBbmltYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYW5pbWF0ZUZ1bmN0aW9uID8/IGFuaW1hdGVMaWtlT25JcGhvbmVfMS5hbmltYXRlTGlrZU9uSXBob25lO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE5vdGlmeTtcclxuTm90aWZ5LmFuaW1hdGVGdW5jdGlvbnMgPSB7IGFuaW1hdGVMaWtlT25JcGhvbmU6IGFuaW1hdGVMaWtlT25JcGhvbmVfMS5hbmltYXRlTGlrZU9uSXBob25lIH07XHJcbk5vdGlmeS5kZWZhdWx0U3R5bGVzID0gc3R5bGVzXzEuc3R5bGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnN0eWxlcyA9IHZvaWQgMDtcclxuZXhwb3J0cy5zdHlsZXMgPSB7XHJcbiAgICByb290OiB7XHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgdG9wOiBgMjBweGAsXHJcbiAgICAgICAgcmlnaHQ6IGA0MHB4YCxcclxuICAgICAgICB3aWR0aDogYDMwMHB4YCxcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2VuZCcsXHJcbiAgICB9LFxyXG4gICAgY29udGVudDoge1xyXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzJhMmEyYScsXHJcbiAgICAgICAgY29sb3I6ICcjZmZmJyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcclxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgIH0sXHJcbiAgICB0aXRsZToge1xyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgfSxcclxuICAgIHRleHQ6IHtcclxuICAgICAgICBtYXJnaW5Ub3A6ICcxMHB4J1xyXG4gICAgfSxcclxuICAgIGNsb3NlOiB7XHJcbiAgICAgICAgd2lkdGg6ICcxMHB4JyxcclxuICAgICAgICBoZWlnaHQ6ICcxMHB4JyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmMDAwMCcsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwcHgnLFxyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgIHRvcDogJzEwcHgnLFxyXG4gICAgICAgIHJpZ2h0OiAnMTBweCcsXHJcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgIH0sXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=