'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var TimeoutError =
/*#__PURE__*/
function (_Error) {
  _inherits(TimeoutError, _Error);

  function TimeoutError(msg, request) {
    var _this;

    _classCallCheck(this, TimeoutError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeoutError).call(this, msg));
    _this.request = request;
    return _this;
  }

  return TimeoutError;
}(_wrapNativeSuper(Error));

function mergeHeaders() {
  var h1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var h2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var headers = new Headers();
  appendHeaders(headers, h1);
  appendHeaders(headers, h2);
  return headers;
}

function appendHeaders(headers, toAppend) {
  if (toAppend instanceof Headers) {
    toAppend.forEach(function (value, key) {
      return headers.append(key, value);
    });
    return;
  }

  Object.keys(toAppend).forEach(function (key) {
    return headers.append(key, toAppend[key]);
  });
}

function constructSearchParams() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var searchParams = new URLSearchParams();
  Object.keys(query).forEach(function (key) {
    return searchParams.append(key, query[key]);
  });
  return searchParams.toString();
}
function timeoutPromise(timeout, promise, requstData) {
  return new Promise(function (resolve, reject) {
    var timeoutId = setTimeout(function () {
      reject(new TimeoutError("Request ".concat(requstData.url, " reached timeout. Options: ").concat(JSON.stringify(requstData.options)), requstData));
    }, timeout);
    promise.then(function (res) {
      clearTimeout(timeoutId);
      resolve(res);
    }, function (err) {
      clearTimeout(timeoutId);
      reject(err);
    });
  });
}

var fetchxDefaults = {
  headers: {},
  options: {
    timeout: 60000,
    queryParser: constructSearchParams
  }
};
function fetchx() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return fetchWrapper.apply(void 0, [fetch, fetchxDefaults].concat(args));
}
function getFetchx() {
  var defaultHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defautlOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaults = {
    headers: mergeHeaders(fetchxDefaults.headers, defaultHeaders),
    options: Object.assign({}, fetchxDefaults.options, defautlOptions)
  };
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fetchWrapper.apply(void 0, [fetch, defaults].concat(args));
  };
}
function fetchWrapper(fetchImp, defaults, url) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var headers = mergeHeaders(defaults.headers, options.headers);
  var fetchOptions = Object.assign({}, defaults.options, options, {
    headers: headers
  });
  var searchParams = fetchOptions.queryParser(fetchOptions.query);
  var fetchURL = searchParams ? "".concat(url, "?").concat(searchParams) : url;
  var promise = fetchImp(fetchURL, fetchOptions);
  var timeout = fetchOptions.timeout;

  if (typeof timeout === 'number') {
    return timeoutPromise(timeout, promise, {
      url: fetchURL,
      options: fetchOptions
    });
  }

  return promise;
}

exports.default = fetchx;
exports.fetchx = fetchx;
exports.getFetchx = getFetchx;
exports.TimeoutError = TimeoutError;
