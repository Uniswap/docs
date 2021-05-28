"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Link = _interopRequireDefault(require("@docusaurus/Link"));

var _CodeBlock = _interopRequireDefault(require("@theme/CodeBlock"));

var _Heading = _interopRequireDefault(require("@theme/Heading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const MDXComponents = {
  code: props => {
    const {
      children
    } = props; // For retrocompatibility purposes (pretty rare use case)
    // See https://github.com/facebook/docusaurus/pull/1584

    if ((0, _react.isValidElement)(children)) {
      return children;
    }

    return !children.includes('\n') ? <code {...props} /> : <_CodeBlock.default {...props} />;
  },
  a: props => <_Link.default {...props} />,
  pre: props => {
    var _children$props;

    const {
      children
    } = props; // See comment for `code` above

    if ((0, _react.isValidElement)(children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children)) {
      return children === null || children === void 0 ? void 0 : children.props.children;
    }

    return <_CodeBlock.default {...(0, _react.isValidElement)(children) ? children === null || children === void 0 ? void 0 : children.props : {
      children
    }} />;
  },
  h1: (0, _Heading.default)('h1'),
  h2: (0, _Heading.default)('h2'),
  h3: (0, _Heading.default)('h3'),
  h4: (0, _Heading.default)('h4'),
  h5: (0, _Heading.default)('h5'),
  h6: (0, _Heading.default)('h6')
};
var _default = MDXComponents;
exports.default = _default;