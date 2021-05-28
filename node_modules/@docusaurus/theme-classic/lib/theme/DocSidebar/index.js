"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _themeCommon = require("@docusaurus/theme-common");

var _useUserPreferencesContext = _interopRequireDefault(require("@theme/hooks/useUserPreferencesContext"));

var _useLockBodyScroll = _interopRequireDefault(require("@theme/hooks/useLockBodyScroll"));

var _useWindowSize = _interopRequireWildcard(require("@theme/hooks/useWindowSize"));

var _useScrollPosition = _interopRequireDefault(require("@theme/hooks/useScrollPosition"));

var _Link = _interopRequireDefault(require("@docusaurus/Link"));

var _isInternalUrl = _interopRequireDefault(require("@docusaurus/isInternalUrl"));

var _Logo = _interopRequireDefault(require("@theme/Logo"));

var _IconArrow = _interopRequireDefault(require("@theme/IconArrow"));

var _IconMenu = _interopRequireDefault(require("@theme/IconMenu"));

var _Translate = require("@docusaurus/Translate");

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
const MOBILE_TOGGLE_SIZE = 24;

function usePrevious(value) {
  const ref = (0, _react.useRef)(value);
  (0, _react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const isActiveSidebarItem = (item, activePath) => {
  if (item.type === 'link') {
    return (0, _themeCommon.isSamePath)(item.href, activePath);
  }

  if (item.type === 'category') {
    return item.items.some(subItem => isActiveSidebarItem(subItem, activePath));
  }

  return false;
}; // Optimize sidebar at each "level"
// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation


const DocSidebarItems = (0, _react.memo)(function DocSidebarItems({
  items,
  ...props
}) {
  return items.map((item, index) => <DocSidebarItem key={index} // sidebar is static, the index does not change
  item={item} {...props} />);
});

function DocSidebarItem(props) {
  switch (props.item.type) {
    case 'category':
      return <DocSidebarItemCategory {...props} />;

    case 'link':
    default:
      return <DocSidebarItemLink {...props} />;
  }
}

function DocSidebarItemCategory({
  item,
  onItemClick,
  collapsible,
  activePath,
  ...props
}) {
  const {
    items,
    label
  } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const wasActive = usePrevious(isActive); // active categories are always initialized as expanded
  // the default (item.collapsed) is only used for non-active categories

  const [collapsed, setCollapsed] = (0, _react.useState)(() => {
    if (!collapsible) {
      return false;
    }

    return isActive ? false : item.collapsed;
  });
  const menuListRef = (0, _react.useRef)(null);
  const [menuListHeight, setMenuListHeight] = (0, _react.useState)(undefined);

  const handleMenuListHeight = (calc = true) => {
    var _menuListRef$current;

    setMenuListHeight(calc ? `${(_menuListRef$current = menuListRef.current) === null || _menuListRef$current === void 0 ? void 0 : _menuListRef$current.scrollHeight}px` : undefined);
  }; // If we navigate to a category, it should automatically expand itself


  (0, _react.useEffect)(() => {
    const justBecameActive = isActive && !wasActive;

    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed]);
  const handleItemClick = (0, _react.useCallback)(e => {
    e.preventDefault();

    if (!menuListHeight) {
      handleMenuListHeight();
    }

    setTimeout(() => setCollapsed(state => !state), 100);
  }, [menuListHeight]);

  if (items.length === 0) {
    return null;
  }

  return <li className={(0, _clsx.default)('menu__list-item', {
    'menu__list-item--collapsed': collapsed
  })}>
      <a className={(0, _clsx.default)('menu__link', {
      'menu__link--sublist': collapsible,
      'menu__link--active': collapsible && isActive,
      [_stylesModule.default.menuLinkText]: !collapsible
    })} onClick={collapsible ? handleItemClick : undefined} href={collapsible ? '#!' : undefined} {...props}>
        {label}
      </a>
      <ul className="menu__list" ref={menuListRef} style={{
      height: menuListHeight
    }} onTransitionEnd={() => {
      if (!collapsed) {
        handleMenuListHeight(false);
      }
    }}>
        <DocSidebarItems items={items} tabIndex={collapsed ? '-1' : '0'} onItemClick={onItemClick} collapsible={collapsible} activePath={activePath} />
      </ul>
    </li>;
}

function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  collapsible: _collapsible,
  ...props
}) {
  const {
    href,
    label
  } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  return <li className="menu__list-item" key={label}>
      <_Link.default className={(0, _clsx.default)('menu__link', {
      'menu__link--active': isActive,
      [_stylesModule.default.menuLinkExternal]: !(0, _isInternalUrl.default)(href)
    })} to={href} {...(0, _isInternalUrl.default)(href) && {
      isNavLink: true,
      exact: true,
      onClick: onItemClick
    }} {...props}>
        {label}
      </_Link.default>
    </li>;
}

function useShowAnnouncementBar() {
  const {
    isAnnouncementBarClosed
  } = (0, _useUserPreferencesContext.default)();
  const [showAnnouncementBar, setShowAnnouncementBar] = (0, _react.useState)(!isAnnouncementBarClosed);
  (0, _useScrollPosition.default)(({
    scrollY
  }) => {
    if (!isAnnouncementBarClosed) {
      setShowAnnouncementBar(scrollY === 0);
    }
  });
  return showAnnouncementBar;
}

function useResponsiveSidebar() {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = (0, _react.useState)(false);
  (0, _useLockBodyScroll.default)(showResponsiveSidebar);
  const windowSize = (0, _useWindowSize.default)();
  (0, _react.useEffect)(() => {
    if (windowSize === _useWindowSize.windowSizes.desktop) {
      setShowResponsiveSidebar(false);
    }
  }, [windowSize]);
  const closeResponsiveSidebar = (0, _react.useCallback)(e => {
    e.target.blur();
    setShowResponsiveSidebar(false);
  }, [setShowResponsiveSidebar]);
  const toggleResponsiveSidebar = (0, _react.useCallback)(() => {
    setShowResponsiveSidebar(value => !value);
  }, [setShowResponsiveSidebar]);
  return {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar
  };
}

function HideableSidebarButton({
  onClick
}) {
  return <button type="button" title={(0, _Translate.translate)({
    id: 'theme.docs.sidebar.collapseButtonTitle',
    message: 'Collapse sidebar',
    description: 'The title attribute for collapse button of doc sidebar'
  })} aria-label={(0, _Translate.translate)({
    id: 'theme.docs.sidebar.collapseButtonAriaLabel',
    message: 'Collapse sidebar',
    description: 'The title attribute for collapse button of doc sidebar'
  })} className={(0, _clsx.default)('button button--secondary button--outline', _stylesModule.default.collapseSidebarButton)} onClick={onClick}>
      <_IconArrow.default className={_stylesModule.default.collapseSidebarButtonIcon} />
    </button>;
}

function ResponsiveSidebarButton({
  responsiveSidebarOpened,
  onClick
}) {
  return <button aria-label={responsiveSidebarOpened ? (0, _Translate.translate)({
    id: 'theme.docs.sidebar.responsiveCloseButtonLabel',
    message: 'Close menu',
    description: 'The ARIA label for close button of mobile doc sidebar'
  }) : (0, _Translate.translate)({
    id: 'theme.docs.sidebar.responsiveOpenButtonLabel',
    message: 'Open menu',
    description: 'The ARIA label for open button of mobile doc sidebar'
  })} aria-haspopup="true" className="button button--secondary button--sm menu__button" type="button" onClick={onClick}>
      {responsiveSidebarOpened ? <span className={(0, _clsx.default)(_stylesModule.default.sidebarMenuIcon, _stylesModule.default.sidebarMenuCloseIcon)}>
          &times;
        </span> : <_IconMenu.default className={_stylesModule.default.sidebarMenuIcon} height={MOBILE_TOGGLE_SIZE} width={MOBILE_TOGGLE_SIZE} />}
    </button>;
}

function DocSidebar({
  path,
  sidebar,
  sidebarCollapsible = true,
  onCollapse,
  isHidden
}) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: {
      hideOnScroll
    },
    hideableSidebar
  } = (0, _themeCommon.useThemeConfig)();
  const {
    isAnnouncementBarClosed
  } = (0, _useUserPreferencesContext.default)();
  const {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar
  } = useResponsiveSidebar();
  return <div className={(0, _clsx.default)(_stylesModule.default.sidebar, {
    [_stylesModule.default.sidebarWithHideableNavbar]: hideOnScroll,
    [_stylesModule.default.sidebarHidden]: isHidden
  })}>
      {hideOnScroll && <_Logo.default tabIndex={-1} className={_stylesModule.default.sidebarLogo} />}
      <div className={(0, _clsx.default)('menu', 'menu--responsive', 'thin-scrollbar', _stylesModule.default.menu, {
      'menu--show': showResponsiveSidebar,
      [_stylesModule.default.menuWithAnnouncementBar]: !isAnnouncementBarClosed && showAnnouncementBar
    })}>
        <ResponsiveSidebarButton responsiveSidebarOpened={showResponsiveSidebar} onClick={toggleResponsiveSidebar} />
        <ul className="menu__list">
          <DocSidebarItems items={sidebar} onItemClick={closeResponsiveSidebar} collapsible={sidebarCollapsible} activePath={path} />
        </ul>
      </div>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>;
}

var _default = DocSidebar;
exports.default = _default;