"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.windowSizes = void 0;

var _react = require("react");

var _ExecutionEnvironment = _interopRequireDefault(require("@docusaurus/ExecutionEnvironment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const desktopThresholdWidth = 996;
const windowSizes = {
  desktop: 'desktop',
  mobile: 'mobile'
};
exports.windowSizes = windowSizes;

function useWindowSize() {
  const isClient = _ExecutionEnvironment.default.canUseDOM;

  function getSize() {
    if (!isClient) {
      return undefined;
    }

    return window.innerWidth > desktopThresholdWidth ? windowSizes.desktop : windowSizes.mobile;
  }

  const [windowSize, setWindowSize] = (0, _react.useState)(getSize);
  (0, _react.useEffect)(() => {
    if (!isClient) {
      return undefined;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

var _default = useWindowSize;
exports.default = _default;