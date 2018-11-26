// before
async function careteen() {
  await 100
  await 200
  return 300
}
careteen.then(_ => {
  console.log(_)
})


// after
"use strict";

var careteen = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return 100;

          case 2:
            _context.next = 4;
            return 200;

          case 4:
            return _context.abrupt("return", 300);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function careteen() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }
      return step("next");
    });
  };
}

careteen.then(function (_) {
  console.log(_);
});