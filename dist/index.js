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

/***/ "./src/animate-functions/iphone.ts":
/*!*****************************************!*\
  !*** ./src/animate-functions/iphone.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.iphone = void 0;
exports.iphone = {
  /**
   * Before the element is placed in the DOM.
   * Here you need to set up basic styles before starting the animation
   */
  beforeInsert: function beforeInsert(message, done) {
    message.elMessage.style.height = '0';
    message.elMessage.style.transition = "500ms ease";
    message.elContent.style.transform = 'scale(0)';
    message.elContent.style.opacity = '0';
    done();
  },

  /**
   * After placing an element in the DOM.
   * Here you need to set up styles for the appearance animation
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
   * After the animation is over.
   * You may need to apply final styles after the animation ends
   */
  afterInAnimateEnd: function afterInAnimateEnd(message, done) {
    done();
  },

  /**
   * After the display time is up.
   * Prepare the base styles before starting the fade animation
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

/***/ "./src/animate-functions/slideAngle.ts":
/*!*********************************************!*\
  !*** ./src/animate-functions/slideAngle.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.slideAngle = void 0;
exports.slideAngle = {
  beforeInsert: function beforeInsert(message, done) {
    message.elMessage.style.height = '0';
    message.elMessage.style.transition = "500ms ease";
    message.elMessage.style.transform = 'translate(600px, -300px)';
    done();
  },
  afterInsert: function afterInsert(message, done) {
    message.elMessage.style.height = "".concat(message.elContent.clientHeight + 20, "px");
    message.elMessage.style.transform = 'translate(0, 0)';
    setTimeout(function () {
      done();
    }, 500);
  },
  afterInAnimateEnd: function afterInAnimateEnd(message, done) {
    done();
  },
  startOutAnimate: function startOutAnimate(message, done) {
    message.elMessage.style.transform = 'translate(600px, 300px)';
    setTimeout(function () {
      message.elMessage.style.height = "0px";
      setTimeout(function () {
        done();
      }, 500);
    }, 500);
  }
};

/***/ }),

/***/ "./src/animate-functions/slideRight.ts":
/*!*********************************************!*\
  !*** ./src/animate-functions/slideRight.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.slideRight = void 0;
exports.slideRight = {
  beforeInsert: function beforeInsert(message, done) {
    message.elMessage.style.height = '0';
    message.elMessage.style.transition = "500ms ease";
    message.elMessage.style.transform = 'translateX(600px)';
    done();
  },
  afterInsert: function afterInsert(message, done) {
    message.elMessage.style.height = "".concat(message.elContent.clientHeight + 20, "px");
    message.elMessage.style.transform = 'translateX(0)';
    setTimeout(function () {
      done();
    }, 500);
  },
  afterInAnimateEnd: function afterInAnimateEnd(message, done) {
    done();
  },
  startOutAnimate: function startOutAnimate(message, done) {
    message.elMessage.style.transform = 'translateX(600px)';
    setTimeout(function () {
      message.elMessage.style.height = "0px";
      setTimeout(function () {
        done();
      }, 500);
    }, 500);
  }
};

/***/ }),

/***/ "./src/classes/Dispatcher.ts":
/*!***********************************!*\
  !*** ./src/classes/Dispatcher.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Dispatcher = /*#__PURE__*/function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this.observers = [];
  }

  _createClass(Dispatcher, [{
    key: "subscribe",
    value: function subscribe(observer) {
      this.observers.push(observer);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(observer) {
      this.observers = this.observers.filter(function (item) {
        return item !== observer;
      });
    }
  }, {
    key: "fire",
    value: function fire(changes) {
      this.observers.forEach(function (observer) {
        observer.update(changes);
      });
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;

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
    this.text = params.text; // create elements

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

        _this4.notify.dispatcher.unsubscribe(_this4);
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
  }, {
    key: "update",
    value: function update(changes) {
      switch (changes.action) {
        case "changeOrder":
          this.changeOrder();
          break;
      }
    }
  }, {
    key: "changeOrder",
    value: function changeOrder() {
      var _this6 = this;

      var index = this.notify.messages.findIndex(function (item) {
        return item === _this6;
      });
      console.log(index);
    }
  }]);

  return Message;
}();

exports.default = Message;

/***/ }),

/***/ "./src/classes/Notify.ts":
/*!*******************************!*\
  !*** ./src/classes/Notify.ts ***!
  \*******************************/
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

var iphone_1 = __webpack_require__(/*! ../animate-functions/iphone */ "./src/animate-functions/iphone.ts");

var slideRight_1 = __webpack_require__(/*! ../animate-functions/slideRight */ "./src/animate-functions/slideRight.ts");

var slideAngle_1 = __webpack_require__(/*! ../animate-functions/slideAngle */ "./src/animate-functions/slideAngle.ts");

var styles_1 = __webpack_require__(/*! ../styles */ "./src/styles.ts");

var setCSSStyles_1 = __webpack_require__(/*! ../functions/setCSSStyles */ "./src/functions/setCSSStyles.ts");

var Message_1 = __importDefault(__webpack_require__(/*! ./Message */ "./src/classes/Message.ts"));

var Dispatcher_1 = __importDefault(__webpack_require__(/*! ./Dispatcher */ "./src/classes/Dispatcher.ts"));

var Notify = /*#__PURE__*/function () {
  function Notify(options) {
    _classCallCheck(this, Notify);

    this.dispatcher = new Dispatcher_1["default"]();
    this.messages = [];
    this.options = options;
    this.rootElement = this.createRootElement();
  }

  _createClass(Notify, [{
    key: "createRootElement",
    value: function createRootElement() {
      var el = document.createElement('div');
      setCSSStyles_1.setCSSStyles(el, this.getStyles().root);
      document.addEventListener('DOMContentLoaded', function () {
        document.body.prepend(el);
      });
      return el;
    }
  }, {
    key: "push",
    value: function push(params) {
      var message = new Message_1["default"](params, this);
      this.messages.unshift(message);
      this.dispatcher.subscribe(message);
      this.dispatcher.fire({
        action: "changeOrder",
        payload: null
      });
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

      return (_this$options$animate = this.options.animateFunction) !== null && _this$options$animate !== void 0 ? _this$options$animate : iphone_1.iphone;
    }
  }]);

  return Notify;
}();

exports.default = Notify;
Notify.animateFunctions = {
  iphone: iphone_1.iphone,
  slideRight: slideRight_1.slideRight,
  slideAngle: slideAngle_1.slideAngle
};
Notify.defaultStyles = styles_1.styles;

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



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Notify_1 = __importDefault(__webpack_require__(/*! ./classes/Notify */ "./src/classes/Notify.ts"));

exports.default = Notify_1["default"];

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
    width: '100%',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ob3RpZnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9hbmltYXRlLWZ1bmN0aW9ucy9pcGhvbmUudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2FuaW1hdGUtZnVuY3Rpb25zL3NsaWRlQW5nbGUudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2FuaW1hdGUtZnVuY3Rpb25zL3NsaWRlUmlnaHQudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2NsYXNzZXMvRGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvLi9zcmMvY2xhc3Nlcy9NZXNzYWdlLnRzIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9jbGFzc2VzL05vdGlmeS50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvLi9zcmMvZnVuY3Rpb25zL3NldENTU1N0eWxlcy50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL3N0eWxlcy50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTm90aWZ5L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJPYmplY3QiLCJ2YWx1ZSIsImV4cG9ydHMiLCJiZWZvcmVJbnNlcnQiLCJtZXNzYWdlIiwiZG9uZSIsImVsTWVzc2FnZSIsInN0eWxlIiwiaGVpZ2h0IiwidHJhbnNpdGlvbiIsImVsQ29udGVudCIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJhZnRlckluc2VydCIsImNsaWVudEhlaWdodCIsImFuaW1hdGUiLCJvZmZzZXQiLCJkdXJhdGlvbiIsImZpbGwiLCJlYXNpbmciLCJhZGRFdmVudExpc3RlbmVyIiwiYWZ0ZXJJbkFuaW1hdGVFbmQiLCJzdGFydE91dEFuaW1hdGUiLCJvdXRBbmltYXRpb25EdXJhdGlvbiIsInQiLCJNYXRoIiwiZmxvb3IiLCJzZXRUaW1lb3V0IiwiRGlzcGF0Y2hlciIsIm9ic2VydmVycyIsIm9ic2VydmVyIiwicHVzaCIsImZpbHRlciIsIml0ZW0iLCJjaGFuZ2VzIiwiZm9yRWFjaCIsInVwZGF0ZSIsInNldENTU1N0eWxlc18xIiwicmVxdWlyZSIsIk1lc3NhZ2UiLCJwYXJhbXMiLCJub3RpZnkiLCJ0aW1lb3V0SW50ZXJ2YWwiLCJ0aXRsZSIsInRleHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbENsb3NlQnRuIiwiZWxUaXRsZSIsImVsVGV4dCIsInN0eWxlcyIsImdldFN0eWxlcyIsInNldENTU1N0eWxlcyIsImNvbnRlbnQiLCJjbG9zZSIsInN0b3BUaW1lb3V0IiwiYmluZCIsInN0YXJ0VGltZW91dCIsImlubmVyVGV4dCIsImFwcGVuZCIsImdldEFuaW1hdGUiLCJyb290RWxlbWVudCIsInByZXBlbmQiLCJyZW1vdmUiLCJkaXNwYXRjaGVyIiwidW5zdWJzY3JpYmUiLCJjbGVhclRpbWVvdXQiLCJvcHRpb25zIiwidGltZW91dCIsImFjdGlvbiIsImNoYW5nZU9yZGVyIiwiaW5kZXgiLCJtZXNzYWdlcyIsImZpbmRJbmRleCIsImNvbnNvbGUiLCJsb2ciLCJfX2ltcG9ydERlZmF1bHQiLCJtb2QiLCJfX2VzTW9kdWxlIiwiaXBob25lXzEiLCJzbGlkZVJpZ2h0XzEiLCJzbGlkZUFuZ2xlXzEiLCJzdHlsZXNfMSIsIk1lc3NhZ2VfMSIsIkRpc3BhdGNoZXJfMSIsIk5vdGlmeSIsImNyZWF0ZVJvb3RFbGVtZW50IiwiZWwiLCJyb290IiwiYm9keSIsInVuc2hpZnQiLCJzdWJzY3JpYmUiLCJmaXJlIiwicGF5bG9hZCIsImRlZmF1bHRTdHlsZXMiLCJhbmltYXRlRnVuY3Rpb24iLCJpcGhvbmUiLCJhbmltYXRlRnVuY3Rpb25zIiwic2xpZGVSaWdodCIsInNsaWRlQW5nbGUiLCJwcm9wIiwidW5kZWZpbmVkIiwiTm90aWZ5XzEiLCJwb3NpdGlvbiIsInRvcCIsInJpZ2h0Iiwid2lkdGgiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsInBhZGRpbmciLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJib3JkZXJSYWRpdXMiLCJmb250V2VpZ2h0IiwibWFyZ2luVG9wIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZhOztBQUNiQSw4Q0FBNkM7QUFBRUMsT0FBSyxFQUFFO0FBQVQsQ0FBN0M7QUFDQUMsY0FBQSxHQUFpQixLQUFLLENBQXRCO0FBQ0FBLGNBQUEsR0FBaUI7QUFDYjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxjQUxhLHdCQUtBQyxPQUxBLEVBS1NDLElBTFQsRUFLZTtBQUN4QkQsV0FBTyxDQUFDRSxTQUFSLENBQWtCQyxLQUFsQixDQUF3QkMsTUFBeEIsR0FBaUMsR0FBakM7QUFDQUosV0FBTyxDQUFDRSxTQUFSLENBQWtCQyxLQUFsQixDQUF3QkUsVUFBeEI7QUFDQUwsV0FBTyxDQUFDTSxTQUFSLENBQWtCSCxLQUFsQixDQUF3QkksU0FBeEIsR0FBb0MsVUFBcEM7QUFDQVAsV0FBTyxDQUFDTSxTQUFSLENBQWtCSCxLQUFsQixDQUF3QkssT0FBeEIsR0FBa0MsR0FBbEM7QUFDQVAsUUFBSTtBQUNQLEdBWFk7O0FBWWI7QUFDSjtBQUNBO0FBQ0E7QUFDSVEsYUFoQmEsdUJBZ0JEVCxPQWhCQyxFQWdCUUMsSUFoQlIsRUFnQmM7QUFDdkJELFdBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0JDLE1BQXhCLGFBQW9DSixPQUFPLENBQUNNLFNBQVIsQ0FBa0JJLFlBQWxCLEdBQWlDLEVBQXJFO0FBQ0FWLFdBQU8sQ0FBQ00sU0FBUixDQUFrQkssT0FBbEIsQ0FBMEIsQ0FDdEI7QUFBRUMsWUFBTSxFQUFFLENBQVY7QUFBYUwsZUFBUyxFQUFFLFVBQXhCO0FBQW9DLGlCQUFXO0FBQS9DLEtBRHNCLEVBRXRCO0FBQUVLLFlBQU0sRUFBRSxDQUFWO0FBQWFMLGVBQVMsRUFBRSxVQUF4QjtBQUFvQyxp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QyxTQUFLLEVBQUUsTUFKRjtBQUtMQyxnQkFBWSxFQUFFLE1BTFQ7QUFNTFQsWUFBUSxFQUFFO0FBTkwsR0FaSTtBQW9CYjVELE9BQUssRUFBRTtBQUNIc0UsY0FBVSxFQUFFO0FBRFQsR0FwQk07QUF1QmJyRSxNQUFJLEVBQUU7QUFDRnNFLGFBQVMsRUFBRTtBQURULEdBdkJPO0FBMEJiNUQsT0FBSyxFQUFFO0FBQ0hvRCxTQUFLLEVBQUUsTUFESjtBQUVIbEcsVUFBTSxFQUFFLE1BRkw7QUFHSHNHLGNBQVUsRUFBRSxTQUhUO0FBSUhFLGdCQUFZLEVBQUUsT0FKWDtBQUtIVCxZQUFRLEVBQUUsVUFMUDtBQU1IQyxPQUFHLEVBQUUsTUFORjtBQU9IQyxTQUFLLEVBQUUsTUFQSjtBQVFIVSxVQUFNLEVBQUU7QUFSTDtBQTFCTSxDQUFqQixDOzs7Ozs7VUNIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJOb3RpZnlcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTm90aWZ5XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk5vdGlmeVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyA/IHRoaXMgOiBzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmlwaG9uZSA9IHZvaWQgMDtcclxuZXhwb3J0cy5pcGhvbmUgPSB7XHJcbiAgICAvKipcclxuICAgICAqIEJlZm9yZSB0aGUgZWxlbWVudCBpcyBwbGFjZWQgaW4gdGhlIERPTS5cclxuICAgICAqIEhlcmUgeW91IG5lZWQgdG8gc2V0IHVwIGJhc2ljIHN0eWxlcyBiZWZvcmUgc3RhcnRpbmcgdGhlIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICBiZWZvcmVJbnNlcnQobWVzc2FnZSwgZG9uZSkge1xyXG4gICAgICAgIG1lc3NhZ2UuZWxNZXNzYWdlLnN0eWxlLmhlaWdodCA9ICcwJztcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2l0aW9uID0gYDUwMG1zIGVhc2VgO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxDb250ZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZnRlciBwbGFjaW5nIGFuIGVsZW1lbnQgaW4gdGhlIERPTS5cclxuICAgICAqIEhlcmUgeW91IG5lZWQgdG8gc2V0IHVwIHN0eWxlcyBmb3IgdGhlIGFwcGVhcmFuY2UgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFmdGVySW5zZXJ0KG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBgJHttZXNzYWdlLmVsQ29udGVudC5jbGllbnRIZWlnaHQgKyAyMH1weGA7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuYW5pbWF0ZShbXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAwLCB0cmFuc2Zvcm06IFwic2NhbGUoMClcIiwgXCJvcGFjaXR5XCI6IFwiMFwiIH0sXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAxLCB0cmFuc2Zvcm06IFwic2NhbGUoMSlcIiwgXCJvcGFjaXR5XCI6IFwiMVwiIH0sXHJcbiAgICAgICAgXSwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBmaWxsOiBcImZvcndhcmRzXCIsXHJcbiAgICAgICAgICAgIGVhc2luZzogXCJlYXNlXCJcclxuICAgICAgICB9KS5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsICgpID0+IHtcclxuICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQWZ0ZXIgdGhlIGFuaW1hdGlvbiBpcyBvdmVyLlxyXG4gICAgICogWW91IG1heSBuZWVkIHRvIGFwcGx5IGZpbmFsIHN0eWxlcyBhZnRlciB0aGUgYW5pbWF0aW9uIGVuZHNcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJJbkFuaW1hdGVFbmQobWVzc2FnZSwgZG9uZSkge1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIHRoZSBkaXNwbGF5IHRpbWUgaXMgdXAuXHJcbiAgICAgKiBQcmVwYXJlIHRoZSBiYXNlIHN0eWxlcyBiZWZvcmUgc3RhcnRpbmcgdGhlIGZhZGUgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0T3V0QW5pbWF0ZShtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgY29uc3Qgb3V0QW5pbWF0aW9uRHVyYXRpb24gPSA4MjA7XHJcbiAgICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3Iob3V0QW5pbWF0aW9uRHVyYXRpb24gLyAyKTtcclxuICAgICAgICBtZXNzYWdlLmVsQ29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxDb250ZW50LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgbWVzc2FnZS5lbENvbnRlbnQuYW5pbWF0ZShbXHJcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAwLCBcIm9wYWNpdHlcIjogXCIxXCIgfSxcclxuICAgICAgICAgICAgeyBvZmZzZXQ6IDEsIFwib3BhY2l0eVwiOiBcIjBcIiB9LFxyXG4gICAgICAgIF0sIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IHQsXHJcbiAgICAgICAgICAgIGZpbGw6IFwiZm9yd2FyZHNcIixcclxuICAgICAgICAgICAgZWFzaW5nOiBcImVhc2VcIlxyXG4gICAgICAgIH0pLmFkZEV2ZW50TGlzdGVuZXIoXCJmaW5pc2hcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2l0aW9uID0gYCR7dH1tcyBlYXNlYDtcclxuICAgICAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgIH0sIHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNsaWRlQW5nbGUgPSB2b2lkIDA7XHJcbmV4cG9ydHMuc2xpZGVBbmdsZSA9IHtcclxuICAgIGJlZm9yZUluc2VydChtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUuaGVpZ2h0ID0gJzAnO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxNZXNzYWdlLnN0eWxlLnRyYW5zaXRpb24gPSBgNTAwbXMgZWFzZWA7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSg2MDBweCwgLTMwMHB4KSc7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSxcclxuICAgIGFmdGVySW5zZXJ0KG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBgJHttZXNzYWdlLmVsQ29udGVudC5jbGllbnRIZWlnaHQgKyAyMH1weGA7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSxcclxuICAgIGFmdGVySW5BbmltYXRlRW5kKG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnRPdXRBbmltYXRlKG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDYwMHB4LCAzMDBweCknO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNsaWRlUmlnaHQgPSB2b2lkIDA7XHJcbmV4cG9ydHMuc2xpZGVSaWdodCA9IHtcclxuICAgIGJlZm9yZUluc2VydChtZXNzYWdlLCBkb25lKSB7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUuaGVpZ2h0ID0gJzAnO1xyXG4gICAgICAgIG1lc3NhZ2UuZWxNZXNzYWdlLnN0eWxlLnRyYW5zaXRpb24gPSBgNTAwbXMgZWFzZWA7XHJcbiAgICAgICAgbWVzc2FnZS5lbE1lc3NhZ2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoNjAwcHgpJztcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9LFxyXG4gICAgYWZ0ZXJJbnNlcnQobWVzc2FnZSwgZG9uZSkge1xyXG4gICAgICAgIG1lc3NhZ2UuZWxNZXNzYWdlLnN0eWxlLmhlaWdodCA9IGAke21lc3NhZ2UuZWxDb250ZW50LmNsaWVudEhlaWdodCArIDIwfXB4YDtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSxcclxuICAgIGFmdGVySW5BbmltYXRlRW5kKG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnRPdXRBbmltYXRlKG1lc3NhZ2UsIGRvbmUpIHtcclxuICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCg2MDBweCknO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmVsTWVzc2FnZS5zdHlsZS5oZWlnaHQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XHJcbiAgICB9XHJcbiAgICBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIHVuc3Vic2NyaWJlKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICBmaXJlKGNoYW5nZXMpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5mb3JFYWNoKG9ic2VydmVyID0+IHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKGNoYW5nZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IERpc3BhdGNoZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHNldENTU1N0eWxlc18xID0gcmVxdWlyZShcIi4uL2Z1bmN0aW9ucy9zZXRDU1NTdHlsZXNcIik7XHJcbmNsYXNzIE1lc3NhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zLCBub3RpZnkpIHtcclxuICAgICAgICB0aGlzLnRpbWVvdXRJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkgPSBub3RpZnk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHBhcmFtcy50aXRsZTtcclxuICAgICAgICB0aGlzLnRleHQgPSBwYXJhbXMudGV4dDtcclxuICAgICAgICAvLyBjcmVhdGUgZWxlbWVudHNcclxuICAgICAgICB0aGlzLmVsTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5lbENsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5lbFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5lbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLm5vdGlmeS5nZXRTdHlsZXMoKTtcclxuICAgICAgICAvLyBzZXQgc3R5bGVzXHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKHRoaXMuZWxNZXNzYWdlLCBzdHlsZXMubWVzc2FnZSk7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKHRoaXMuZWxDb250ZW50LCBzdHlsZXMuY29udGVudCk7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKHRoaXMuZWxDbG9zZUJ0biwgc3R5bGVzLmNsb3NlKTtcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXModGhpcy5lbFRpdGxlLCBzdHlsZXMudGl0bGUpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyh0aGlzLmVsVGV4dCwgc3R5bGVzLnRleHQpO1xyXG4gICAgICAgIC8vIHNldCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLmVsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5zdG9wVGltZW91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmVsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5zdGFydFRpbWVvdXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5lbENsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdGFydE91dEFuaW1hdGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLy8gc2V0IHRleHQgZGF0YVxyXG4gICAgICAgIHRoaXMuZWxUaXRsZS5pbm5lclRleHQgPSBwYXJhbXMudGl0bGU7XHJcbiAgICAgICAgdGhpcy5lbFRleHQuaW5uZXJUZXh0ID0gcGFyYW1zLnRleHQ7XHJcbiAgICAgICAgLy8gYnVpbGRcclxuICAgICAgICB0aGlzLmVsTWVzc2FnZS5hcHBlbmQodGhpcy5lbENvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFwcGVuZCh0aGlzLmVsQ2xvc2VCdG4pO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFwcGVuZCh0aGlzLmVsVGl0bGUpO1xyXG4gICAgICAgIHRoaXMuZWxDb250ZW50LmFwcGVuZCh0aGlzLmVsVGV4dCk7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVJbnNlcnQoKTtcclxuICAgIH1cclxuICAgIGJlZm9yZUluc2VydCgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeS5nZXRBbmltYXRlKCkuYmVmb3JlSW5zZXJ0KHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZnRlckluc2VydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWZ0ZXJJbnNlcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkucm9vdEVsZW1lbnQucHJlcGVuZCh0aGlzLmVsTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkuZ2V0QW5pbWF0ZSgpLmFmdGVySW5zZXJ0KHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZnRlckluQW5pbWF0ZUVuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWZ0ZXJJbkFuaW1hdGVFbmQoKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkuZ2V0QW5pbWF0ZSgpLmFmdGVySW5BbmltYXRlRW5kKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVvdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXJ0T3V0QW5pbWF0ZSgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeS5nZXRBbmltYXRlKCkuc3RhcnRPdXRBbmltYXRlKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbE1lc3NhZ2UucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5LmRpc3BhdGNoZXIudW5zdWJzY3JpYmUodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wVGltZW91dCgpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lb3V0SW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydFRpbWVvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wVGltZW91dCgpO1xyXG4gICAgICAgIHRoaXMudGltZW91dEludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRPdXRBbmltYXRlKCk7XHJcbiAgICAgICAgfSwgdGhpcy5ub3RpZnkub3B0aW9ucy50aW1lb3V0KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShjaGFuZ2VzKSB7XHJcbiAgICAgICAgc3dpdGNoIChjaGFuZ2VzLmFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2hhbmdlT3JkZXJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlT3JkZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoYW5nZU9yZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ub3RpZnkubWVzc2FnZXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbSA9PT0gdGhpcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE1lc3NhZ2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGlwaG9uZV8xID0gcmVxdWlyZShcIi4uL2FuaW1hdGUtZnVuY3Rpb25zL2lwaG9uZVwiKTtcclxuY29uc3Qgc2xpZGVSaWdodF8xID0gcmVxdWlyZShcIi4uL2FuaW1hdGUtZnVuY3Rpb25zL3NsaWRlUmlnaHRcIik7XHJcbmNvbnN0IHNsaWRlQW5nbGVfMSA9IHJlcXVpcmUoXCIuLi9hbmltYXRlLWZ1bmN0aW9ucy9zbGlkZUFuZ2xlXCIpO1xyXG5jb25zdCBzdHlsZXNfMSA9IHJlcXVpcmUoXCIuLi9zdHlsZXNcIik7XHJcbmNvbnN0IHNldENTU1N0eWxlc18xID0gcmVxdWlyZShcIi4uL2Z1bmN0aW9ucy9zZXRDU1NTdHlsZXNcIik7XHJcbmNvbnN0IE1lc3NhZ2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NZXNzYWdlXCIpKTtcclxuY29uc3QgRGlzcGF0Y2hlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0Rpc3BhdGNoZXJcIikpO1xyXG5jbGFzcyBOb3RpZnkge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVJvb3RFbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVSb290RWxlbWVudCgpIHtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyhlbCwgdGhpcy5nZXRTdHlsZXMoKS5yb290KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQoZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuICAgIHB1c2gocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBNZXNzYWdlXzEuZGVmYXVsdChwYXJhbXMsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXMudW5zaGlmdChtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlci5maXJlKHtcclxuICAgICAgICAgICAgYWN0aW9uOiBcImNoYW5nZU9yZGVyXCIsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IG51bGxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldFN0eWxlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN0eWxlcyA/PyBOb3RpZnkuZGVmYXVsdFN0eWxlcztcclxuICAgIH1cclxuICAgIGdldEFuaW1hdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbmltYXRlRnVuY3Rpb24gPz8gaXBob25lXzEuaXBob25lO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE5vdGlmeTtcclxuTm90aWZ5LmFuaW1hdGVGdW5jdGlvbnMgPSB7IGlwaG9uZTogaXBob25lXzEuaXBob25lLCBzbGlkZVJpZ2h0OiBzbGlkZVJpZ2h0XzEuc2xpZGVSaWdodCwgc2xpZGVBbmdsZTogc2xpZGVBbmdsZV8xLnNsaWRlQW5nbGUgfTtcclxuTm90aWZ5LmRlZmF1bHRTdHlsZXMgPSBzdHlsZXNfMS5zdHlsZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc2V0Q1NTU3R5bGVzID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBzZXRDU1NTdHlsZXMoZWwsIHN0eWxlcykge1xyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIHN0eWxlcykge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3R5bGVzW3Byb3BdO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuc2V0Q1NTU3R5bGVzID0gc2V0Q1NTU3R5bGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBOb3RpZnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jbGFzc2VzL05vdGlmeVwiKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE5vdGlmeV8xLmRlZmF1bHQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc3R5bGVzID0gdm9pZCAwO1xyXG5leHBvcnRzLnN0eWxlcyA9IHtcclxuICAgIHJvb3Q6IHtcclxuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICB0b3A6IGAyMHB4YCxcclxuICAgICAgICByaWdodDogYDQwcHhgLFxyXG4gICAgICAgIHdpZHRoOiBgMzAwcHhgLFxyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6IHtcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICBhbGlnbkl0ZW1zOiAnZW5kJyxcclxuICAgIH0sXHJcbiAgICBjb250ZW50OiB7XHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBwYWRkaW5nOiAnMTBweCcsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJyMyYTJhMmEnLFxyXG4gICAgICAgIGNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgIH0sXHJcbiAgICB0ZXh0OiB7XHJcbiAgICAgICAgbWFyZ2luVG9wOiAnMTBweCdcclxuICAgIH0sXHJcbiAgICBjbG9zZToge1xyXG4gICAgICAgIHdpZHRoOiAnMTBweCcsXHJcbiAgICAgICAgaGVpZ2h0OiAnMTBweCcsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJyNmZjAwMDAnLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzEwMHB4JyxcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICB0b3A6ICcxMHB4JyxcclxuICAgICAgICByaWdodDogJzEwcHgnLFxyXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICB9LFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9