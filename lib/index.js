"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  version: function version() {
    return 1;
  },
  formatText: function formatText(templateFn, data) {
    return templateFn.bind(data)();
  },
  createLogger: function createLogger(templateFn, loggerName) {
    var i = 0;
    return function (data) {
      return ++i + ' - ' + loggerName + ' - ' + templateFn.bind(data)();
    };
  }
};
exports.default = _default;