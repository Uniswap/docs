"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireWildcard(require("react"));

var _themeCommon = require("@docusaurus/theme-common");

var _useDocusaurusContext = _interopRequireDefault(require("@docusaurus/useDocusaurusContext"));

var _clsx = _interopRequireDefault(require("clsx"));

var _stylesModule = _interopRequireDefault(require("./styles.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Dark = ({
  icon,
  style
}) => <span className={(0, _clsx.default)(_stylesModule.default.toggle, _stylesModule.default.dark)} style={style}>
    {icon}
  </span>;

const Light = ({
  icon,
  style
}) => <span className={(0, _clsx.default)(_stylesModule.default.toggle, _stylesModule.default.light)} style={style}>
    {icon}
  </span>; // Based on react-toggle (https://github.com/aaronshaf/react-toggle/).


const Toggle = (0, _react.memo)(({
  className,
  icons,
  checked: defaultChecked,
  disabled,
  onChange
}) => {
  const [checked, setChecked] = (0, _react.useState)(defaultChecked);
  const [focused, setFocused] = (0, _react.useState)(false);
  const inputRef = (0, _react.useRef)(null);

  const handleToggle = e => {
    const checkbox = inputRef.current;

    if (!checkbox) {
      return;
    }

    if (e.target !== checkbox) {
      e.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    setChecked(checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked);
  };

  return <div className={(0, _clsx.default)('react-toggle', className, {
    'react-toggle--checked': checked,
    'react-toggle--focus': focused,
    'react-toggle--disabled': disabled
  })} role="button" tabIndex={-1} onClick={handleToggle}>
        <div className="react-toggle-track">
          <div className="react-toggle-track-check">{icons.checked}</div>
          <div className="react-toggle-track-x">{icons.unchecked}</div>
        </div>
        <div className="react-toggle-thumb" />

        <input ref={inputRef} checked={checked} type="checkbox" className="react-toggle-screenreader-only" aria-label="Switch between dark and light mode" onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      </div>;
});

function _default(props) {
  const {
    colorMode: {
      switchConfig: {
        darkIcon,
        darkIconStyle,
        lightIcon,
        lightIconStyle
      }
    }
  } = (0, _themeCommon.useThemeConfig)();
  const {
    isClient
  } = (0, _useDocusaurusContext.default)();
  return <Toggle disabled={!isClient} icons={{
    checked: <Dark icon={darkIcon} style={darkIconStyle} />,
    unchecked: <Light icon={lightIcon} style={lightIconStyle} />
  }} {...props} />;
}