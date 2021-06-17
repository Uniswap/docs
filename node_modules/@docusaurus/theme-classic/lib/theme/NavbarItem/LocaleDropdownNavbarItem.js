"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LocaleDropdownNavbarItem;

var _react = _interopRequireDefault(require("react"));

var _DefaultNavbarItem = _interopRequireDefault(require("@theme/NavbarItem/DefaultNavbarItem"));

var _IconLanguage = _interopRequireDefault(require("@theme/IconLanguage"));

var _useDocusaurusContext = _interopRequireDefault(require("@docusaurus/useDocusaurusContext"));

var _themeCommon = require("@docusaurus/theme-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const {
    i18n: {
      currentLocale,
      locales,
      localeConfigs
    }
  } = (0, _useDocusaurusContext.default)();
  const alternatePageUtils = (0, _themeCommon.useAlternatePageUtils)();

  function getLocaleLabel(locale) {
    return localeConfigs[locale].label;
  }

  const localeItems = locales.map(locale => {
    const to = `pathname://${alternatePageUtils.createUrl({
      locale,
      fullyQualified: false
    })}`;
    return {
      isNavLink: true,
      label: getLocaleLabel(locale),
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className: locale === currentLocale ? 'dropdown__link--active' : '',
      style: {
        textTransform: 'capitalize'
      }
    };
  });
  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter]; // Mobile is handled a bit differently

  const dropdownLabel = mobile ? 'Languages' : getLocaleLabel(currentLocale);
  return <_DefaultNavbarItem.default {...props} href="#" mobile={mobile} label={<span>
          <_IconLanguage.default style={{
      verticalAlign: 'text-bottom',
      marginRight: 5
    }} />
          <span>{dropdownLabel}</span>
        </span>} items={items} />;
}