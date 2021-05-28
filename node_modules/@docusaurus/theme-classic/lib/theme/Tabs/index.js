"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useUserPreferencesContext = _interopRequireDefault(require("@theme/hooks/useUserPreferencesContext"));

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
function isInViewport(element) {
  const {
    top,
    left,
    bottom,
    right
  } = element.getBoundingClientRect();
  const {
    innerHeight,
    innerWidth
  } = window;
  return top >= 0 && right <= innerWidth && bottom <= innerHeight && left >= 0;
}

const keys = {
  left: 37,
  right: 39
};

function Tabs(props) {
  const {
    lazy,
    block,
    defaultValue,
    values,
    groupId,
    className
  } = props;
  const {
    tabGroupChoices,
    setTabGroupChoices
  } = (0, _useUserPreferencesContext.default)();
  const [selectedValue, setSelectedValue] = (0, _react.useState)(defaultValue);

  const children = _react.Children.toArray(props.children);

  const tabRefs = [];

  if (groupId != null) {
    const relevantTabGroupChoice = tabGroupChoices[groupId];

    if (relevantTabGroupChoice != null && relevantTabGroupChoice !== selectedValue && values.some(value => value.value === relevantTabGroupChoice)) {
      setSelectedValue(relevantTabGroupChoice);
    }
  }

  const handleTabChange = event => {
    const selectedTab = event.currentTarget;
    const selectedTabIndex = tabRefs.indexOf(selectedTab);
    const selectedTabValue = values[selectedTabIndex].value;
    setSelectedValue(selectedTabValue);

    if (groupId != null) {
      setTabGroupChoices(groupId, selectedTabValue);
      setTimeout(() => {
        if (isInViewport(selectedTab)) {
          return;
        }

        selectedTab.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
        selectedTab.classList.add(_stylesModule.default.tabItemActive);
        setTimeout(() => selectedTab.classList.remove(_stylesModule.default.tabItemActive), 2000);
      }, 150);
    }
  };

  const handleKeydown = event => {
    var _focusElement;

    let focusElement;

    switch (event.keyCode) {
      case keys.right:
        {
          const nextTab = tabRefs.indexOf(event.target) + 1;
          focusElement = tabRefs[nextTab] || tabRefs[0];
          break;
        }

      case keys.left:
        {
          const prevTab = tabRefs.indexOf(event.target) - 1;
          focusElement = tabRefs[prevTab] || tabRefs[tabRefs.length - 1];
          break;
        }

      default:
        break;
    }

    (_focusElement = focusElement) === null || _focusElement === void 0 ? void 0 : _focusElement.focus();
  };

  return <div className="tabs-container">
      <ul role="tablist" aria-orientation="horizontal" className={(0, _clsx.default)('tabs', {
      'tabs--block': block
    }, className)}>
        {values.map(({
        value,
        label
      }) => <li role="tab" tabIndex={selectedValue === value ? 0 : -1} aria-selected={selectedValue === value} className={(0, _clsx.default)('tabs__item', _stylesModule.default.tabItem, {
        'tabs__item--active': selectedValue === value
      })} key={value} ref={tabControl => tabRefs.push(tabControl)} onKeyDown={handleKeydown} onFocus={handleTabChange} onClick={handleTabChange}>
            {label}
          </li>)}
      </ul>

      {lazy ? (0, _react.cloneElement)(children.filter(tabItem => tabItem.props.value === selectedValue)[0], {
      className: 'margin-vert--md'
    }) : <div className="margin-vert--md">
          {children.map((tabItem, i) => (0, _react.cloneElement)(tabItem, {
        key: i,
        hidden: tabItem.props.value !== selectedValue
      }))}
        </div>}
    </div>;
}

var _default = Tabs;
exports.default = _default;