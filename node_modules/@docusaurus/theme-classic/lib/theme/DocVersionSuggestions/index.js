"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useDocusaurusContext = _interopRequireDefault(require("@docusaurus/useDocusaurusContext"));

var _Link = _interopRequireDefault(require("@docusaurus/Link"));

var _Translate = _interopRequireDefault(require("@docusaurus/Translate"));

var _useDocs = require("@theme/hooks/useDocs");

var _themeCommon = require("@docusaurus/theme-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function UnreleasedVersionLabel({
  siteTitle,
  versionLabel
}) {
  return <_Translate.default id="theme.docs.versions.unreleasedVersionLabel" description="The label used to tell the user that he's browsing an unreleased doc version" values={{
    siteTitle,
    versionLabel: <strong>{versionLabel}</strong>
  }}>
      {'This is unreleased documentation for {siteTitle} {versionLabel} version.'}
    </_Translate.default>;
}

function UnmaintainedVersionLabel({
  siteTitle,
  versionLabel
}) {
  return <_Translate.default id="theme.docs.versions.unmaintainedVersionLabel" description="The label used to tell the user that he's browsing an unmaintained doc version" values={{
    siteTitle,
    versionLabel: <strong>{versionLabel}</strong>
  }}>
      {'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'}
    </_Translate.default>;
}

function LatestVersionSuggestionLabel({
  versionLabel,
  to,
  onClick
}) {
  return <_Translate.default id="theme.docs.versions.latestVersionSuggestionLabel" description="The label userd to tell the user that he's browsing an unmaintained doc version" values={{
    versionLabel,
    latestVersionLink: <strong>
            <_Link.default to={to} onClick={onClick}>
              <_Translate.default id="theme.docs.versions.latestVersionLinkLabel" description="The label used for the latest version suggestion link label">
                latest version
              </_Translate.default>
            </_Link.default>
          </strong>
  }}>
      {'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).'}
    </_Translate.default>;
}

const getVersionMainDoc = version => version.docs.find(doc => doc.id === version.mainDocId);

function DocVersionSuggestions() {
  const {
    siteConfig: {
      title: siteTitle
    }
  } = (0, _useDocusaurusContext.default)();
  const {
    pluginId
  } = (0, _useDocs.useActivePlugin)({
    failfast: true
  });
  const {
    savePreferredVersionName
  } = (0, _themeCommon.useDocsPreferredVersion)(pluginId);
  const activeVersion = (0, _useDocs.useActiveVersion)(pluginId);
  const {
    latestDocSuggestion,
    latestVersionSuggestion
  } = (0, _useDocs.useDocVersionSuggestions)(pluginId); // No suggestion to be made

  if (!latestVersionSuggestion) {
    return <></>;
  } // try to link to same doc in latest version (not always possible)
  // fallback to main doc of latest version


  const latestVersionSuggestedDoc = latestDocSuggestion !== null && latestDocSuggestion !== void 0 ? latestDocSuggestion : getVersionMainDoc(latestVersionSuggestion);
  return <div className="alert alert--warning margin-bottom--md" role="alert">
      <div>
        {activeVersion.name === 'current' ? <UnreleasedVersionLabel siteTitle={siteTitle} versionLabel={activeVersion.label} /> : <UnmaintainedVersionLabel siteTitle={siteTitle} versionLabel={activeVersion.label} />}
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel versionLabel={latestVersionSuggestion.label} to={latestVersionSuggestedDoc.path} onClick={() => savePreferredVersionName(latestVersionSuggestion.name)} />
      </div>
    </div>;
}

var _default = DocVersionSuggestions;
exports.default = _default;