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

/***/ "./src/animate-functions/inAnimate.ts":
/*!********************************************!*\
  !*** ./src/animate-functions/inAnimate.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function inAnimate(el) {
  return new Promise(function (resolve) {
    var innerEl = el.querySelector('div');
    if (!innerEl) throw new Error('Show: Not found element');
    var h = innerEl.clientHeight;
    var inAnimationDuration = 500;
    var gap = 20;
    el.style.transition = "".concat(inAnimationDuration, "ms ease");
    el.style.height = "".concat(h + gap, "px");
    innerEl.style.transform = 'scale(0)';
    innerEl.style.opacity = '0';
    innerEl.animate([{
      offset: 0,
      transform: "scale(0)",
      "opacity": "0"
    }, {
      offset: 1,
      transform: "scale(1)",
      "opacity": "1"
    }], {
      duration: inAnimationDuration,
      fill: "forwards",
      easing: "ease"
    }).addEventListener("finish", function () {
      resolve();
    });
  });
}

exports.default = inAnimate;

/***/ }),

/***/ "./src/animate-functions/outAnimate.ts":
/*!*********************************************!*\
  !*** ./src/animate-functions/outAnimate.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function outAnimate(el) {
  return new Promise(function (resolve) {
    var innerEl = el.querySelector('div');
    if (!innerEl) throw new Error('Hide: Not found element');
    var outAnimationDuration = 820;
    var t = Math.floor(outAnimationDuration / 2);
    innerEl.style.transform = 'scale(1)';
    innerEl.style.opacity = '1';
    innerEl.animate([{
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
      el.style.transition = "".concat(t, "ms ease");
      el.style.height = "0px";
      setTimeout(function () {
        resolve();
      }, t);
    });
  });
}

exports.default = outAnimate;

/***/ }),

/***/ "./src/classes/Message.ts":
/*!********************************!*\
  !*** ./src/classes/Message.ts ***!
  \********************************/
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

var inAnimate_1 = __importDefault(__webpack_require__(/*! ../animate-functions/inAnimate */ "./src/animate-functions/inAnimate.ts"));

var outAnimate_1 = __importDefault(__webpack_require__(/*! ../animate-functions/outAnimate */ "./src/animate-functions/outAnimate.ts"));

var setCSSStyles_1 = __webpack_require__(/*! ../functions/setCSSStyles */ "./src/functions/setCSSStyles.ts");

var Message = /*#__PURE__*/function () {
  function Message(params, notify) {
    var _this = this;

    _classCallCheck(this, Message);

    this.timeoutInterval = null;
    this.notify = notify;
    this.title = params.title;
    this.text = params.text;
    this.element = this.generateHtml();
    requestAnimationFrame(function () {
      _this.show().then(function () {
        _this.startTimeout();
      });
    });
  }

  _createClass(Message, [{
    key: "generateHtml",
    value: function generateHtml() {
      var styleClassNames = this.notify.getStyleClassNames();
      var styles = this.notify.getStyles();
      var elMessage = document.createElement('div');
      elMessage.classList.add(styleClassNames.message);
      setCSSStyles_1.setCSSStyles(elMessage, styles.message);
      var elContent = document.createElement('div');
      elContent.classList.add(styleClassNames.content);
      setCSSStyles_1.setCSSStyles(elContent, styles.content);
      elContent.addEventListener('mouseenter', this.stopTimeout.bind(this));
      elContent.addEventListener('mouseleave', this.startTimeout.bind(this));
      var elCloseBtn = document.createElement('div');
      elCloseBtn.classList.add(styleClassNames.close);
      setCSSStyles_1.setCSSStyles(elCloseBtn, styles.close);
      elCloseBtn.addEventListener('click', this.hide.bind(this));
      var elTitle = document.createElement('div');
      elTitle.classList.add(styleClassNames.title);
      setCSSStyles_1.setCSSStyles(elTitle, styles.title);
      elTitle.innerText = this.title;
      var elText = document.createElement('div');
      elText.classList.add(styleClassNames.text);
      setCSSStyles_1.setCSSStyles(elText, styles.text);
      elText.innerText = this.text;
      elMessage.append(elContent);
      elContent.append(elCloseBtn);
      elContent.append(elTitle);
      elContent.append(elText);
      return elMessage;
    }
  }, {
    key: "show",
    value: function show() {
      if (this.notify.options.functionShow !== undefined) {
        return this.notify.options.functionShow(this.element);
      }

      return inAnimate_1["default"](this.element);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.notify.options.functionHide !== undefined) {
        return this.notify.options.functionHide(this.element);
      }

      return outAnimate_1["default"](this.element);
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
      var _this2 = this;

      this.stopTimeout();
      this.timeoutInterval = setTimeout(function () {
        _this2.hide().then(function () {
          _this2.element.remove();
        });
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

var inAnimate_1 = __importDefault(__webpack_require__(/*! ./animate-functions/inAnimate */ "./src/animate-functions/inAnimate.ts"));

var outAnimate_1 = __importDefault(__webpack_require__(/*! ./animate-functions/outAnimate */ "./src/animate-functions/outAnimate.ts"));

var setCSSStyles_1 = __webpack_require__(/*! ./functions/setCSSStyles */ "./src/functions/setCSSStyles.ts");

var styles_1 = __webpack_require__(/*! ./styles */ "./src/styles.ts");

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
      el.classList.add(this.getStyleClassNames().root);
      setCSSStyles_1.setCSSStyles(el, this.getStyles().root);
      document.body.prepend(el);
      return el;
    }
  }, {
    key: "push",
    value: function push(params) {
      var message = new Message_1["default"](params, this);
      this.rootElement.prepend(message.element);
    }
  }, {
    key: "getStyleClassNames",
    value: function getStyleClassNames() {
      var _this$options$styleCl;

      return (_this$options$styleCl = this.options.styleClassNames) !== null && _this$options$styleCl !== void 0 ? _this$options$styleCl : styles_1.styleClassNames;
    }
  }, {
    key: "getStyles",
    value: function getStyles() {
      var _this$options$styles;

      return (_this$options$styles = this.options.styles) !== null && _this$options$styles !== void 0 ? _this$options$styles : styles_1.styles;
    }
  }]);

  return Notify;
}();

exports.default = Notify;
Notify.animateFunctions = {
  inAnimate: inAnimate_1["default"],
  outAnimate: outAnimate_1["default"]
};
Notify.defaultStyles = styles_1.styles;
Notify.defaultStyleClassNames = styles_1.styleClassNames;

/***/ }),

/***/ "./src/styles.ts":
/*!***********************!*\
  !*** ./src/styles.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.styles = exports.styleClassNames = void 0;
exports.styleClassNames = {
  root: 'notify',
  message: 'message',
  content: 'content',
  title: 'title',
  text: 'text',
  close: 'close'
};
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
    alignItems: 'end',
    height: '0px'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ob3RpZnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL05vdGlmeS8uL3NyYy9hbmltYXRlLWZ1bmN0aW9ucy9pbkFuaW1hdGUudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2FuaW1hdGUtZnVuY3Rpb25zL291dEFuaW1hdGUudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL2NsYXNzZXMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvLi9zcmMvZnVuY3Rpb25zL3NldENTU1N0eWxlcy50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTm90aWZ5Ly4vc3JjL3N0eWxlcy50cyIsIndlYnBhY2s6Ly9Ob3RpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTm90aWZ5L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJPYmplY3QiLCJ2YWx1ZSIsImluQW5pbWF0ZSIsImVsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpbm5lckVsIiwicXVlcnlTZWxlY3RvciIsIkVycm9yIiwiaCIsImNsaWVudEhlaWdodCIsImluQW5pbWF0aW9uRHVyYXRpb24iLCJnYXAiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJoZWlnaHQiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5IiwiYW5pbWF0ZSIsIm9mZnNldCIsImR1cmF0aW9uIiwiZmlsbCIsImVhc2luZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJleHBvcnRzIiwib3V0QW5pbWF0ZSIsIm91dEFuaW1hdGlvbkR1cmF0aW9uIiwidCIsIk1hdGgiLCJmbG9vciIsInNldFRpbWVvdXQiLCJfX2ltcG9ydERlZmF1bHQiLCJtb2QiLCJfX2VzTW9kdWxlIiwiaW5BbmltYXRlXzEiLCJyZXF1aXJlIiwib3V0QW5pbWF0ZV8xIiwic2V0Q1NTU3R5bGVzXzEiLCJNZXNzYWdlIiwicGFyYW1zIiwibm90aWZ5IiwidGltZW91dEludGVydmFsIiwidGl0bGUiLCJ0ZXh0IiwiZWxlbWVudCIsImdlbmVyYXRlSHRtbCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNob3ciLCJ0aGVuIiwic3RhcnRUaW1lb3V0Iiwic3R5bGVDbGFzc05hbWVzIiwiZ2V0U3R5bGVDbGFzc05hbWVzIiwic3R5bGVzIiwiZ2V0U3R5bGVzIiwiZWxNZXNzYWdlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibWVzc2FnZSIsInNldENTU1N0eWxlcyIsImVsQ29udGVudCIsImNvbnRlbnQiLCJzdG9wVGltZW91dCIsImJpbmQiLCJlbENsb3NlQnRuIiwiY2xvc2UiLCJoaWRlIiwiZWxUaXRsZSIsImlubmVyVGV4dCIsImVsVGV4dCIsImFwcGVuZCIsIm9wdGlvbnMiLCJmdW5jdGlvblNob3ciLCJ1bmRlZmluZWQiLCJmdW5jdGlvbkhpZGUiLCJjbGVhclRpbWVvdXQiLCJyZW1vdmUiLCJ0aW1lb3V0IiwicHJvcCIsIk1lc3NhZ2VfMSIsInN0eWxlc18xIiwiTm90aWZ5Iiwicm9vdEVsZW1lbnQiLCJjcmVhdGVSb290RWxlbWVudCIsInJvb3QiLCJib2R5IiwicHJlcGVuZCIsImFuaW1hdGVGdW5jdGlvbnMiLCJkZWZhdWx0U3R5bGVzIiwiZGVmYXVsdFN0eWxlQ2xhc3NOYW1lcyIsInBvc2l0aW9uIiwidG9wIiwicmlnaHQiLCJ3aWR0aCIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwicGFkZGluZyIsImJhY2tncm91bmQiLCJjb2xvciIsImJvcmRlclJhZGl1cyIsImZvbnRXZWlnaHQiLCJtYXJnaW5Ub3AiLCJjdXJzb3IiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7O0FDVmE7O0FBQ2JBLDhDQUE2QztBQUFFQyxPQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxTQUFTQyxTQUFULENBQW1CQyxFQUFuQixFQUF1QjtBQUNuQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDNUIsUUFBTUMsT0FBTyxHQUFHSCxFQUFFLENBQUNJLGFBQUgsQ0FBaUIsS0FBakIsQ0FBaEI7QUFDQSxRQUFJLENBQUNELE9BQUwsRUFDSSxNQUFNLElBQUlFLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ0osUUFBTUMsQ0FBQyxHQUFHSCxPQUFPLENBQUNJLFlBQWxCO0FBQ0EsUUFBTUMsbUJBQW1CLEdBQUcsR0FBNUI7QUFDQSxRQUFNQyxHQUFHLEdBQUcsRUFBWjtBQUNBVCxNQUFFLENBQUNVLEtBQUgsQ0FBU0MsVUFBVCxhQUF5QkgsbUJBQXpCO0FBQ0FSLE1BQUUsQ0FBQ1UsS0FBSCxDQUFTRSxNQUFULGFBQXFCTixDQUFDLEdBQUdHLEdBQXpCO0FBQ0FOLFdBQU8sQ0FBQ08sS0FBUixDQUFjRyxTQUFkLEdBQTBCLFVBQTFCO0FBQ0FWLFdBQU8sQ0FBQ08sS0FBUixDQUFjSSxPQUFkLEdBQXdCLEdBQXhCO0FBQ0FYLFdBQU8sQ0FBQ1ksT0FBUixDQUFnQixDQUNaO0FBQUVDLFlBQU0sRUFBRSxDQUFWO0FBQWFILGVBQVMsRUFBRSxVQUF4QjtBQUFvQyxpQkFBVztBQUEvQyxLQURZLEVBRVo7QUFBRUcsWUFBTSxFQUFFLENBQVY7QUFBYUgsZUFBUyxFQUFFLFVBQXhCO0FBQW9DLGlCQUFXO0FBQS9DLEtBRlksQ0FBaEIsRUFHRztBQUNDSSxjQUFRLEVBQUVULG1CQURYO0FBRUNVLFVBQUksRUFBRSxVQUZQO0FBR0NDLFlBQU0sRUFBRTtBQUhULEtBSEgsRUFPR0MsZ0JBUEgsQ0FPb0IsUUFQcEIsRUFPOEIsWUFBTTtBQUNoQ2xCLGFBQU87QUFDVixLQVREO0FBVUgsR0FyQk0sQ0FBUDtBQXNCSDs7QUFDRG1CLGVBQUEsR0FBa0J0QixTQUFsQixDOzs7Ozs7Ozs7O0FDMUJhOztBQUNiRiw4Q0FBNkM7QUFBRUMsT0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsU0FBU3dCLFVBQVQsQ0FBb0J0QixFQUFwQixFQUF3QjtBQUNwQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDNUIsUUFBTUMsT0FBTyxHQUFHSCxFQUFFLENBQUNJLGFBQUgsQ0FBaUIsS0FBakIsQ0FBaEI7QUFDQSxRQUFJLENBQUNELE9BQUwsRUFDSSxNQUFNLElBQUlFLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ0osUUFBTWtCLG9CQUFvQixHQUFHLEdBQTdCO0FBQ0EsUUFBTUMsQ0FBQyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsb0JBQW9CLEdBQUcsQ0FBbEMsQ0FBVjtBQUNBcEIsV0FBTyxDQUFDTyxLQUFSLENBQWNHLFNBQWQsR0FBMEIsVUFBMUI7QUFDQVYsV0FBTyxDQUFDTyxLQUFSLENBQWNJLE9BQWQsR0FBd0IsR0FBeEI7QUFDQVgsV0FBTyxDQUFDWSxPQUFSLENBQWdCLENBQ1o7QUFBRUMsWUFBTSxFQUFFLENBQVY7QUFBYSxpQkFBVztBQUF4QixLQURZLEVBRVo7QUFBRUEsWUFBTSxFQUFFLENBQVY7QUFBYSxpQkFBVztBQUF4QixLQUZZLENBQWhCLEVBR0c7QUFDQ0MsY0FBUSxFQUFFTyxDQURYO0FBRUNOLFVBQUksRUFBRSxVQUZQO0FBR0NDLFlBQU0sRUFBRTtBQUhULEtBSEgsRUFPR0MsZ0JBUEgsQ0FPb0IsUUFQcEIsRUFPOEIsWUFBTTtBQUNoQ3BCLFFBQUUsQ0FBQ1UsS0FBSCxDQUFTQyxVQUFULGFBQXlCYSxDQUF6QjtBQUNBeEIsUUFBRSxDQUFDVSxLQUFILENBQVNFLE1BQVQsR0FBa0IsS0FBbEI7QUFDQWUsZ0JBQVUsQ0FBQyxZQUFNO0FBQ2J6QixlQUFPO0FBQ1YsT0FGUyxFQUVQc0IsQ0FGTyxDQUFWO0FBR0gsS0FiRDtBQWNILEdBdEJNLENBQVA7QUF1Qkg7O0FBQ0RILGVBQUEsR0FBa0JDLFVBQWxCLEM7Ozs7Ozs7Ozs7QUMzQmE7Ozs7Ozs7O0FBQ2IsSUFBSU0sZUFBZSxHQUFJLFFBQVEsS0FBS0EsZUFBZCxJQUFrQyxVQUFVQyxHQUFWLEVBQWU7QUFDbkUsU0FBUUEsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVosR0FBMEJELEdBQTFCLEdBQWdDO0FBQUUsZUFBV0E7QUFBYixHQUF2QztBQUNILENBRkQ7O0FBR0FoQyw4Q0FBNkM7QUFBRUMsT0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsSUFBTWlDLFdBQVcsR0FBR0gsZUFBZSxDQUFDSSxtQkFBTyxDQUFDLDRFQUFELENBQVIsQ0FBbkM7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHTCxlQUFlLENBQUNJLG1CQUFPLENBQUMsOEVBQUQsQ0FBUixDQUFwQzs7QUFDQSxJQUFNRSxjQUFjLEdBQUdGLG1CQUFPLENBQUMsa0VBQUQsQ0FBOUI7O0lBQ01HLE87QUFDRixtQkFBWUMsTUFBWixFQUFvQkMsTUFBcEIsRUFBNEI7QUFBQTs7QUFBQTs7QUFDeEIsU0FBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtFLEtBQUwsR0FBYUgsTUFBTSxDQUFDRyxLQUFwQjtBQUNBLFNBQUtDLElBQUwsR0FBWUosTUFBTSxDQUFDSSxJQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFLQyxZQUFMLEVBQWY7QUFDQUMseUJBQXFCLENBQUMsWUFBTTtBQUN4QixXQUFJLENBQUNDLElBQUwsR0FBWUMsSUFBWixDQUFpQixZQUFNO0FBQ25CLGFBQUksQ0FBQ0MsWUFBTDtBQUNILE9BRkQ7QUFHSCxLQUpvQixDQUFyQjtBQUtIOzs7O1dBQ0Qsd0JBQWU7QUFDWCxVQUFNQyxlQUFlLEdBQUcsS0FBS1YsTUFBTCxDQUFZVyxrQkFBWixFQUF4QjtBQUNBLFVBQU1DLE1BQU0sR0FBRyxLQUFLWixNQUFMLENBQVlhLFNBQVosRUFBZjtBQUNBLFVBQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0FGLGVBQVMsQ0FBQ0csU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0JSLGVBQWUsQ0FBQ1MsT0FBeEM7QUFDQXRCLG9CQUFjLENBQUN1QixZQUFmLENBQTRCTixTQUE1QixFQUF1Q0YsTUFBTSxDQUFDTyxPQUE5QztBQUNBLFVBQU1FLFNBQVMsR0FBR04sUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0FLLGVBQVMsQ0FBQ0osU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0JSLGVBQWUsQ0FBQ1ksT0FBeEM7QUFDQXpCLG9CQUFjLENBQUN1QixZQUFmLENBQTRCQyxTQUE1QixFQUF1Q1QsTUFBTSxDQUFDVSxPQUE5QztBQUNBRCxlQUFTLENBQUN0QyxnQkFBVixDQUEyQixZQUEzQixFQUF5QyxLQUFLd0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBekM7QUFDQUgsZUFBUyxDQUFDdEMsZ0JBQVYsQ0FBMkIsWUFBM0IsRUFBeUMsS0FBSzBCLFlBQUwsQ0FBa0JlLElBQWxCLENBQXVCLElBQXZCLENBQXpDO0FBQ0EsVUFBTUMsVUFBVSxHQUFHVixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDQVMsZ0JBQVUsQ0FBQ1IsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUJSLGVBQWUsQ0FBQ2dCLEtBQXpDO0FBQ0E3QixvQkFBYyxDQUFDdUIsWUFBZixDQUE0QkssVUFBNUIsRUFBd0NiLE1BQU0sQ0FBQ2MsS0FBL0M7QUFDQUQsZ0JBQVUsQ0FBQzFDLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLEtBQUs0QyxJQUFMLENBQVVILElBQVYsQ0FBZSxJQUFmLENBQXJDO0FBQ0EsVUFBTUksT0FBTyxHQUFHYixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQVksYUFBTyxDQUFDWCxTQUFSLENBQWtCQyxHQUFsQixDQUFzQlIsZUFBZSxDQUFDUixLQUF0QztBQUNBTCxvQkFBYyxDQUFDdUIsWUFBZixDQUE0QlEsT0FBNUIsRUFBcUNoQixNQUFNLENBQUNWLEtBQTVDO0FBQ0EwQixhQUFPLENBQUNDLFNBQVIsR0FBb0IsS0FBSzNCLEtBQXpCO0FBQ0EsVUFBTTRCLE1BQU0sR0FBR2YsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWY7QUFDQWMsWUFBTSxDQUFDYixTQUFQLENBQWlCQyxHQUFqQixDQUFxQlIsZUFBZSxDQUFDUCxJQUFyQztBQUNBTixvQkFBYyxDQUFDdUIsWUFBZixDQUE0QlUsTUFBNUIsRUFBb0NsQixNQUFNLENBQUNULElBQTNDO0FBQ0EyQixZQUFNLENBQUNELFNBQVAsR0FBbUIsS0FBSzFCLElBQXhCO0FBQ0FXLGVBQVMsQ0FBQ2lCLE1BQVYsQ0FBaUJWLFNBQWpCO0FBQ0FBLGVBQVMsQ0FBQ1UsTUFBVixDQUFpQk4sVUFBakI7QUFDQUosZUFBUyxDQUFDVSxNQUFWLENBQWlCSCxPQUFqQjtBQUNBUCxlQUFTLENBQUNVLE1BQVYsQ0FBaUJELE1BQWpCO0FBQ0EsYUFBT2hCLFNBQVA7QUFDSDs7O1dBQ0QsZ0JBQU87QUFDSCxVQUFJLEtBQUtkLE1BQUwsQ0FBWWdDLE9BQVosQ0FBb0JDLFlBQXBCLEtBQXFDQyxTQUF6QyxFQUFvRDtBQUNoRCxlQUFPLEtBQUtsQyxNQUFMLENBQVlnQyxPQUFaLENBQW9CQyxZQUFwQixDQUFpQyxLQUFLN0IsT0FBdEMsQ0FBUDtBQUNIOztBQUNELGFBQU9WLFdBQVcsV0FBWCxDQUFvQixLQUFLVSxPQUF6QixDQUFQO0FBQ0g7OztXQUNELGdCQUFPO0FBQ0gsVUFBSSxLQUFLSixNQUFMLENBQVlnQyxPQUFaLENBQW9CRyxZQUFwQixLQUFxQ0QsU0FBekMsRUFBb0Q7QUFDaEQsZUFBTyxLQUFLbEMsTUFBTCxDQUFZZ0MsT0FBWixDQUFvQkcsWUFBcEIsQ0FBaUMsS0FBSy9CLE9BQXRDLENBQVA7QUFDSDs7QUFDRCxhQUFPUixZQUFZLFdBQVosQ0FBcUIsS0FBS1EsT0FBMUIsQ0FBUDtBQUNIOzs7V0FDRCx1QkFBYztBQUNWLFVBQUksS0FBS0gsZUFBVCxFQUEwQjtBQUN0Qm1DLG9CQUFZLENBQUMsS0FBS25DLGVBQU4sQ0FBWjtBQUNIO0FBQ0o7OztXQUNELHdCQUFlO0FBQUE7O0FBQ1gsV0FBS3NCLFdBQUw7QUFDQSxXQUFLdEIsZUFBTCxHQUF1QlgsVUFBVSxDQUFDLFlBQU07QUFDcEMsY0FBSSxDQUFDcUMsSUFBTCxHQUFZbkIsSUFBWixDQUFpQixZQUFNO0FBQ25CLGdCQUFJLENBQUNKLE9BQUwsQ0FBYWlDLE1BQWI7QUFDSCxTQUZEO0FBR0gsT0FKZ0MsRUFJOUIsS0FBS3JDLE1BQUwsQ0FBWWdDLE9BQVosQ0FBb0JNLE9BSlUsQ0FBakM7QUFLSDs7Ozs7O0FBRUx0RCxlQUFBLEdBQWtCYyxPQUFsQixDOzs7Ozs7Ozs7O0FDNUVhOztBQUNidEMsOENBQTZDO0FBQUVDLE9BQUssRUFBRTtBQUFULENBQTdDO0FBQ0F1QixvQkFBQSxHQUF1QixLQUFLLENBQTVCOztBQUNBLFNBQVNvQyxZQUFULENBQXNCekQsRUFBdEIsRUFBMEJpRCxNQUExQixFQUFrQztBQUM5QixPQUFLLElBQU0yQixJQUFYLElBQW1CM0IsTUFBbkIsRUFBMkI7QUFDdkIsUUFBTW5ELEtBQUssR0FBR21ELE1BQU0sQ0FBQzJCLElBQUQsQ0FBcEI7O0FBQ0EsUUFBSTlFLEtBQUssS0FBS3lFLFNBQWQsRUFBeUI7QUFDckJ2RSxRQUFFLENBQUNVLEtBQUgsQ0FBU2tFLElBQVQsSUFBaUI5RSxLQUFqQjtBQUNIO0FBQ0o7QUFDSjs7QUFDRHVCLG9CQUFBLEdBQXVCb0MsWUFBdkIsQzs7Ozs7Ozs7OztBQ1hhOzs7Ozs7OztBQUNiLElBQUk3QixlQUFlLEdBQUksUUFBUSxLQUFLQSxlQUFkLElBQWtDLFVBQVVDLEdBQVYsRUFBZTtBQUNuRSxTQUFRQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsVUFBWixHQUEwQkQsR0FBMUIsR0FBZ0M7QUFBRSxlQUFXQTtBQUFiLEdBQXZDO0FBQ0gsQ0FGRDs7QUFHQWhDLDhDQUE2QztBQUFFQyxPQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxJQUFNK0UsU0FBUyxHQUFHakQsZUFBZSxDQUFDSSxtQkFBTyxDQUFDLG1EQUFELENBQVIsQ0FBakM7O0FBQ0EsSUFBTUQsV0FBVyxHQUFHSCxlQUFlLENBQUNJLG1CQUFPLENBQUMsMkVBQUQsQ0FBUixDQUFuQzs7QUFDQSxJQUFNQyxZQUFZLEdBQUdMLGVBQWUsQ0FBQ0ksbUJBQU8sQ0FBQyw2RUFBRCxDQUFSLENBQXBDOztBQUNBLElBQU1FLGNBQWMsR0FBR0YsbUJBQU8sQ0FBQyxpRUFBRCxDQUE5Qjs7QUFDQSxJQUFNOEMsUUFBUSxHQUFHOUMsbUJBQU8sQ0FBQyxpQ0FBRCxDQUF4Qjs7SUFDTStDLE07QUFDRixrQkFBWVYsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLVyxXQUFMLEdBQW1CLEtBQUtDLGlCQUFMLEVBQW5CO0FBQ0g7Ozs7V0FDRCw2QkFBb0I7QUFDaEIsVUFBTWpGLEVBQUUsR0FBR29ELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0FyRCxRQUFFLENBQUNzRCxTQUFILENBQWFDLEdBQWIsQ0FBaUIsS0FBS1Asa0JBQUwsR0FBMEJrQyxJQUEzQztBQUNBaEQsb0JBQWMsQ0FBQ3VCLFlBQWYsQ0FBNEJ6RCxFQUE1QixFQUFnQyxLQUFLa0QsU0FBTCxHQUFpQmdDLElBQWpEO0FBQ0E5QixjQUFRLENBQUMrQixJQUFULENBQWNDLE9BQWQsQ0FBc0JwRixFQUF0QjtBQUNBLGFBQU9BLEVBQVA7QUFDSDs7O1dBQ0QsY0FBS29DLE1BQUwsRUFBYTtBQUNULFVBQU1vQixPQUFPLEdBQUcsSUFBSXFCLFNBQVMsV0FBYixDQUFzQnpDLE1BQXRCLEVBQThCLElBQTlCLENBQWhCO0FBQ0EsV0FBSzRDLFdBQUwsQ0FBaUJJLE9BQWpCLENBQXlCNUIsT0FBTyxDQUFDZixPQUFqQztBQUNIOzs7V0FDRCw4QkFBcUI7QUFBQTs7QUFDakIsc0NBQU8sS0FBSzRCLE9BQUwsQ0FBYXRCLGVBQXBCLHlFQUF1QytCLFFBQVEsQ0FBQy9CLGVBQWhEO0FBQ0g7OztXQUNELHFCQUFZO0FBQUE7O0FBQ1IscUNBQU8sS0FBS3NCLE9BQUwsQ0FBYXBCLE1BQXBCLHVFQUE4QjZCLFFBQVEsQ0FBQzdCLE1BQXZDO0FBQ0g7Ozs7OztBQUVMNUIsZUFBQSxHQUFrQjBELE1BQWxCO0FBQ0FBLE1BQU0sQ0FBQ00sZ0JBQVAsR0FBMEI7QUFBRXRGLFdBQVMsRUFBRWdDLFdBQVcsV0FBeEI7QUFBa0NULFlBQVUsRUFBRVcsWUFBWTtBQUExRCxDQUExQjtBQUNBOEMsTUFBTSxDQUFDTyxhQUFQLEdBQXVCUixRQUFRLENBQUM3QixNQUFoQztBQUNBOEIsTUFBTSxDQUFDUSxzQkFBUCxHQUFnQ1QsUUFBUSxDQUFDL0IsZUFBekMsQzs7Ozs7Ozs7OztBQ3BDYTs7QUFDYmxELDhDQUE2QztBQUFFQyxPQUFLLEVBQUU7QUFBVCxDQUE3QztBQUNBdUIsY0FBQSxHQUFpQkEsdUJBQUEsR0FBMEIsS0FBSyxDQUFoRDtBQUNBQSx1QkFBQSxHQUEwQjtBQUN0QjZELE1BQUksRUFBRSxRQURnQjtBQUV0QjFCLFNBQU8sRUFBRSxTQUZhO0FBR3RCRyxTQUFPLEVBQUUsU0FIYTtBQUl0QnBCLE9BQUssRUFBRSxPQUplO0FBS3RCQyxNQUFJLEVBQUUsTUFMZ0I7QUFNdEJ1QixPQUFLLEVBQUU7QUFOZSxDQUExQjtBQVFBMUMsY0FBQSxHQUFpQjtBQUNiNkQsTUFBSSxFQUFFO0FBQ0ZNLFlBQVEsRUFBRSxPQURSO0FBRUZDLE9BQUcsUUFGRDtBQUdGQyxTQUFLLFFBSEg7QUFJRkMsU0FBSztBQUpILEdBRE87QUFPYm5DLFNBQU8sRUFBRTtBQUNMbUMsU0FBSyxFQUFFLE1BREY7QUFFTEMsV0FBTyxFQUFFLE1BRko7QUFHTEMsY0FBVSxFQUFFLEtBSFA7QUFJTGpGLFVBQU0sRUFBRTtBQUpILEdBUEk7QUFhYitDLFNBQU8sRUFBRTtBQUNMbUMsV0FBTyxFQUFFLE1BREo7QUFFTEMsY0FBVSxFQUFFLFNBRlA7QUFHTEMsU0FBSyxFQUFFLE1BSEY7QUFJTEMsZ0JBQVksRUFBRSxNQUpUO0FBS0xULFlBQVEsRUFBRTtBQUxMLEdBYkk7QUFvQmJqRCxPQUFLLEVBQUU7QUFDSDJELGNBQVUsRUFBRTtBQURULEdBcEJNO0FBdUJiMUQsTUFBSSxFQUFFO0FBQ0YyRCxhQUFTLEVBQUU7QUFEVCxHQXZCTztBQTBCYnBDLE9BQUssRUFBRTtBQUNINEIsU0FBSyxFQUFFLE1BREo7QUFFSC9FLFVBQU0sRUFBRSxNQUZMO0FBR0htRixjQUFVLEVBQUUsU0FIVDtBQUlIRSxnQkFBWSxFQUFFLE9BSlg7QUFLSFQsWUFBUSxFQUFFLFVBTFA7QUFNSEMsT0FBRyxFQUFFLE1BTkY7QUFPSEMsU0FBSyxFQUFFLE1BUEo7QUFRSFUsVUFBTSxFQUFFO0FBUkw7QUExQk0sQ0FBakIsQzs7Ozs7O1VDWEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiTm90aWZ5XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk5vdGlmeVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJOb3RpZnlcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzIDogc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gaW5BbmltYXRlKGVsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICBjb25zdCBpbm5lckVsID0gZWwucXVlcnlTZWxlY3RvcignZGl2Jyk7XHJcbiAgICAgICAgaWYgKCFpbm5lckVsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3c6IE5vdCBmb3VuZCBlbGVtZW50Jyk7XHJcbiAgICAgICAgY29uc3QgaCA9IGlubmVyRWwuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGluQW5pbWF0aW9uRHVyYXRpb24gPSA1MDA7XHJcbiAgICAgICAgY29uc3QgZ2FwID0gMjA7XHJcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IGAke2luQW5pbWF0aW9uRHVyYXRpb259bXMgZWFzZWA7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aCArIGdhcH1weGA7XHJcbiAgICAgICAgaW5uZXJFbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xyXG4gICAgICAgIGlubmVyRWwuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICBpbm5lckVsLmFuaW1hdGUoW1xyXG4gICAgICAgICAgICB7IG9mZnNldDogMCwgdHJhbnNmb3JtOiBcInNjYWxlKDApXCIsIFwib3BhY2l0eVwiOiBcIjBcIiB9LFxyXG4gICAgICAgICAgICB7IG9mZnNldDogMSwgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsIFwib3BhY2l0eVwiOiBcIjFcIiB9LFxyXG4gICAgICAgIF0sIHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGluQW5pbWF0aW9uRHVyYXRpb24sXHJcbiAgICAgICAgICAgIGZpbGw6IFwiZm9yd2FyZHNcIixcclxuICAgICAgICAgICAgZWFzaW5nOiBcImVhc2VcIlxyXG4gICAgICAgIH0pLmFkZEV2ZW50TGlzdGVuZXIoXCJmaW5pc2hcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBpbkFuaW1hdGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIG91dEFuaW1hdGUoZWwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlubmVyRWwgPSBlbC5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcclxuICAgICAgICBpZiAoIWlubmVyRWwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSGlkZTogTm90IGZvdW5kIGVsZW1lbnQnKTtcclxuICAgICAgICBjb25zdCBvdXRBbmltYXRpb25EdXJhdGlvbiA9IDgyMDtcclxuICAgICAgICBjb25zdCB0ID0gTWF0aC5mbG9vcihvdXRBbmltYXRpb25EdXJhdGlvbiAvIDIpO1xyXG4gICAgICAgIGlubmVyRWwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcclxuICAgICAgICBpbm5lckVsLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgaW5uZXJFbC5hbmltYXRlKFtcclxuICAgICAgICAgICAgeyBvZmZzZXQ6IDAsIFwib3BhY2l0eVwiOiBcIjFcIiB9LFxyXG4gICAgICAgICAgICB7IG9mZnNldDogMSwgXCJvcGFjaXR5XCI6IFwiMFwiIH0sXHJcbiAgICAgICAgXSwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogdCxcclxuICAgICAgICAgICAgZmlsbDogXCJmb3J3YXJkc1wiLFxyXG4gICAgICAgICAgICBlYXNpbmc6IFwiZWFzZVwiXHJcbiAgICAgICAgfSkuYWRkRXZlbnRMaXN0ZW5lcihcImZpbmlzaFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBgJHt0fW1zIGVhc2VgO1xyXG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSwgdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBvdXRBbmltYXRlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbkFuaW1hdGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYW5pbWF0ZS1mdW5jdGlvbnMvaW5BbmltYXRlXCIpKTtcclxuY29uc3Qgb3V0QW5pbWF0ZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9hbmltYXRlLWZ1bmN0aW9ucy9vdXRBbmltYXRlXCIpKTtcclxuY29uc3Qgc2V0Q1NTU3R5bGVzXzEgPSByZXF1aXJlKFwiLi4vZnVuY3Rpb25zL3NldENTU1N0eWxlc1wiKTtcclxuY2xhc3MgTWVzc2FnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMsIG5vdGlmeSkge1xyXG4gICAgICAgIHRoaXMudGltZW91dEludGVydmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5vdGlmeSA9IG5vdGlmeTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gcGFyYW1zLnRpdGxlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHBhcmFtcy50ZXh0O1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2VuZXJhdGVIdG1sKCk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlSHRtbCgpIHtcclxuICAgICAgICBjb25zdCBzdHlsZUNsYXNzTmFtZXMgPSB0aGlzLm5vdGlmeS5nZXRTdHlsZUNsYXNzTmFtZXMoKTtcclxuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLm5vdGlmeS5nZXRTdHlsZXMoKTtcclxuICAgICAgICBjb25zdCBlbE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBlbE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChzdHlsZUNsYXNzTmFtZXMubWVzc2FnZSk7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKGVsTWVzc2FnZSwgc3R5bGVzLm1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnN0IGVsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVsQ29udGVudC5jbGFzc0xpc3QuYWRkKHN0eWxlQ2xhc3NOYW1lcy5jb250ZW50KTtcclxuICAgICAgICBzZXRDU1NTdHlsZXNfMS5zZXRDU1NTdHlsZXMoZWxDb250ZW50LCBzdHlsZXMuY29udGVudCk7XHJcbiAgICAgICAgZWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLnN0b3BUaW1lb3V0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGVsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5zdGFydFRpbWVvdXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgY29uc3QgZWxDbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVsQ2xvc2VCdG4uY2xhc3NMaXN0LmFkZChzdHlsZUNsYXNzTmFtZXMuY2xvc2UpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyhlbENsb3NlQnRuLCBzdHlsZXMuY2xvc2UpO1xyXG4gICAgICAgIGVsQ2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgY29uc3QgZWxUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVsVGl0bGUuY2xhc3NMaXN0LmFkZChzdHlsZUNsYXNzTmFtZXMudGl0bGUpO1xyXG4gICAgICAgIHNldENTU1N0eWxlc18xLnNldENTU1N0eWxlcyhlbFRpdGxlLCBzdHlsZXMudGl0bGUpO1xyXG4gICAgICAgIGVsVGl0bGUuaW5uZXJUZXh0ID0gdGhpcy50aXRsZTtcclxuICAgICAgICBjb25zdCBlbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBlbFRleHQuY2xhc3NMaXN0LmFkZChzdHlsZUNsYXNzTmFtZXMudGV4dCk7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKGVsVGV4dCwgc3R5bGVzLnRleHQpO1xyXG4gICAgICAgIGVsVGV4dC5pbm5lclRleHQgPSB0aGlzLnRleHQ7XHJcbiAgICAgICAgZWxNZXNzYWdlLmFwcGVuZChlbENvbnRlbnQpO1xyXG4gICAgICAgIGVsQ29udGVudC5hcHBlbmQoZWxDbG9zZUJ0bik7XHJcbiAgICAgICAgZWxDb250ZW50LmFwcGVuZChlbFRpdGxlKTtcclxuICAgICAgICBlbENvbnRlbnQuYXBwZW5kKGVsVGV4dCk7XHJcbiAgICAgICAgcmV0dXJuIGVsTWVzc2FnZTtcclxuICAgIH1cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm90aWZ5Lm9wdGlvbnMuZnVuY3Rpb25TaG93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm90aWZ5Lm9wdGlvbnMuZnVuY3Rpb25TaG93KHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbkFuaW1hdGVfMS5kZWZhdWx0KHRoaXMuZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vdGlmeS5vcHRpb25zLmZ1bmN0aW9uSGlkZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vdGlmeS5vcHRpb25zLmZ1bmN0aW9uSGlkZSh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0QW5pbWF0ZV8xLmRlZmF1bHQodGhpcy5lbGVtZW50KTtcclxuICAgIH1cclxuICAgIHN0b3BUaW1lb3V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0VGltZW91dCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lb3V0KCk7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHRoaXMubm90aWZ5Lm9wdGlvbnMudGltZW91dCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gTWVzc2FnZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zZXRDU1NTdHlsZXMgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIHNldENTU1N0eWxlcyhlbCwgc3R5bGVzKSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gc3R5bGVzKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBzdHlsZXNbcHJvcF07XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWwuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5zZXRDU1NTdHlsZXMgPSBzZXRDU1NTdHlsZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1lc3NhZ2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jbGFzc2VzL01lc3NhZ2VcIikpO1xyXG5jb25zdCBpbkFuaW1hdGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9hbmltYXRlLWZ1bmN0aW9ucy9pbkFuaW1hdGVcIikpO1xyXG5jb25zdCBvdXRBbmltYXRlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vYW5pbWF0ZS1mdW5jdGlvbnMvb3V0QW5pbWF0ZVwiKSk7XHJcbmNvbnN0IHNldENTU1N0eWxlc18xID0gcmVxdWlyZShcIi4vZnVuY3Rpb25zL3NldENTU1N0eWxlc1wiKTtcclxuY29uc3Qgc3R5bGVzXzEgPSByZXF1aXJlKFwiLi9zdHlsZXNcIik7XHJcbmNsYXNzIE5vdGlmeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVSb290RWxlbWVudCgpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUm9vdEVsZW1lbnQoKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0U3R5bGVDbGFzc05hbWVzKCkucm9vdCk7XHJcbiAgICAgICAgc2V0Q1NTU3R5bGVzXzEuc2V0Q1NTU3R5bGVzKGVsLCB0aGlzLmdldFN0eWxlcygpLnJvb3QpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChlbCk7XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfVxyXG4gICAgcHVzaChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gbmV3IE1lc3NhZ2VfMS5kZWZhdWx0KHBhcmFtcywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5wcmVwZW5kKG1lc3NhZ2UuZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBnZXRTdHlsZUNsYXNzTmFtZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZUNsYXNzTmFtZXMgPz8gc3R5bGVzXzEuc3R5bGVDbGFzc05hbWVzO1xyXG4gICAgfVxyXG4gICAgZ2V0U3R5bGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3R5bGVzID8/IHN0eWxlc18xLnN0eWxlcztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBOb3RpZnk7XHJcbk5vdGlmeS5hbmltYXRlRnVuY3Rpb25zID0geyBpbkFuaW1hdGU6IGluQW5pbWF0ZV8xLmRlZmF1bHQsIG91dEFuaW1hdGU6IG91dEFuaW1hdGVfMS5kZWZhdWx0IH07XHJcbk5vdGlmeS5kZWZhdWx0U3R5bGVzID0gc3R5bGVzXzEuc3R5bGVzO1xyXG5Ob3RpZnkuZGVmYXVsdFN0eWxlQ2xhc3NOYW1lcyA9IHN0eWxlc18xLnN0eWxlQ2xhc3NOYW1lcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zdHlsZXMgPSBleHBvcnRzLnN0eWxlQ2xhc3NOYW1lcyA9IHZvaWQgMDtcclxuZXhwb3J0cy5zdHlsZUNsYXNzTmFtZXMgPSB7XHJcbiAgICByb290OiAnbm90aWZ5JyxcclxuICAgIG1lc3NhZ2U6ICdtZXNzYWdlJyxcclxuICAgIGNvbnRlbnQ6ICdjb250ZW50JyxcclxuICAgIHRpdGxlOiAndGl0bGUnLFxyXG4gICAgdGV4dDogJ3RleHQnLFxyXG4gICAgY2xvc2U6ICdjbG9zZScsXHJcbn07XHJcbmV4cG9ydHMuc3R5bGVzID0ge1xyXG4gICAgcm9vdDoge1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIHRvcDogYDIwcHhgLFxyXG4gICAgICAgIHJpZ2h0OiBgNDBweGAsXHJcbiAgICAgICAgd2lkdGg6IGAzMDBweGAsXHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZToge1xyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdlbmQnLFxyXG4gICAgICAgIGhlaWdodDogJzBweCcsXHJcbiAgICB9LFxyXG4gICAgY29udGVudDoge1xyXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzJhMmEyYScsXHJcbiAgICAgICAgY29sb3I6ICcjZmZmJyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcclxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgIH0sXHJcbiAgICB0aXRsZToge1xyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgfSxcclxuICAgIHRleHQ6IHtcclxuICAgICAgICBtYXJnaW5Ub3A6ICcxMHB4J1xyXG4gICAgfSxcclxuICAgIGNsb3NlOiB7XHJcbiAgICAgICAgd2lkdGg6ICcxMHB4JyxcclxuICAgICAgICBoZWlnaHQ6ICcxMHB4JyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmMDAwMCcsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwcHgnLFxyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgIHRvcDogJzEwcHgnLFxyXG4gICAgICAgIHJpZ2h0OiAnMTBweCcsXHJcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgIH0sXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=