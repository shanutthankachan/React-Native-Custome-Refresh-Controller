"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var CustomRefreshControl = function CustomRefreshControl() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    refreshing = _useState2[0],
    setRefreshing = _useState2[1];
  var pullDown = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  var panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(_, gestureState) {
      return gestureState.dy > 0; // Start gesture if user pulls down
    },
    onPanResponderMove: function onPanResponderMove(_, gestureState) {
      if (gestureState.dy > 0 && !refreshing) {
        pullDown.setValue(gestureState.dy); // Update the position as the user pulls down
      }
    },
    onPanResponderRelease: function onPanResponderRelease(_, gestureState) {
      if (gestureState.dy > 100 && !refreshing) {
        // Threshold for triggering refresh
        handleRefresh();
      } else {
        resetPullDown();
      }
    }
  })).current;
  var handleRefresh = function handleRefresh() {
    setRefreshing(true);
    _reactNative.Animated.timing(pullDown, {
      toValue: 100,
      // Set the final position during refresh
      duration: 300,
      useNativeDriver: true
    }).start(function () {
      // Simulate a network request or async operation
      setTimeout(function () {
        setRefreshing(false);
        resetPullDown();
      }, 2000);
    });
  };
  var resetPullDown = function resetPullDown() {
    _reactNative.Animated.timing(pullDown, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, _extends({
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, panResponder.panHandlers), /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        translateY: pullDown
      }]
    }
  }, refreshing ? /*#__PURE__*/_react["default"].createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: "#0000ff"
  }) : /*#__PURE__*/_react["default"].createElement(_reactNative.Text, null, "Pull down to refresh")));
};
var _default = exports["default"] = CustomRefreshControl;