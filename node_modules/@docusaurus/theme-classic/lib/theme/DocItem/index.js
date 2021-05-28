"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DocPaginator = _interopRequireDefault(require("@theme/DocPaginator"));

var _DocVersionSuggestions = _interopRequireDefault(require("@theme/DocVersionSuggestions"));

var _Seo = _interopRequireDefault(require("@theme/Seo"));

var _LastUpdated = _interopRequireDefault(require("@theme/LastUpdated"));

var _TOC = _interopRequireDefault(require("@theme/TOC"));

var _EditThisPage = _interopRequireDefault(require("@theme/EditThisPage"));

var _clsx = _interopRequireDefault(require("clsx"));

var _stylesModule = _interopRequireDefault(require("./styles.module.css"));

var _useDocs = require("@theme/hooks/useDocs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function DocItem(props) {
  const {
    content: DocContent
  } = props;
  const {
    metadata,
    frontMatter
  } = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents
  } = frontMatter;
  const {
    description,
    title,
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy
  } = metadata;
  const {
    pluginId
  } = (0, _useDocs.useActivePlugin)({
    failfast: true
  });
  const versions = (0, _useDocs.useVersions)(pluginId);
  const version = (0, _useDocs.useActiveVersion)(pluginId); // If site is not versioned or only one version is included
  // we don't show the version badge
  // See https://github.com/facebook/docusaurus/issues/3362

  const showVersionBadge = versions.length > 1; // For meta title, using frontMatter.title in priority over a potential # title found in markdown
  // See https://github.com/facebook/docusaurus/issues/4665#issuecomment-825831367

  const metaTitle = frontMatter.title || title;
  return <>
      <_Seo.default {...{
      title: metaTitle,
      description,
      keywords,
      image
    }} />

      <div className="row">
        <div className={(0, _clsx.default)('col', {
        [_stylesModule.default.docItemCol]: !hideTableOfContents
      })}>
          <_DocVersionSuggestions.default />
          <div className={_stylesModule.default.docItemContainer}>
            <article>
              {showVersionBadge && <div>
                  <span className="badge badge--secondary">
                    Version: {version.label}
                  </span>
                </div>}
              {!hideTitle && <header>
                  <h1 className={_stylesModule.default.docTitle}>{title}</h1>
                </header>}
              <div className="markdown">
                <DocContent />
              </div>
            </article>
            {(editUrl || lastUpdatedAt || lastUpdatedBy) && <div className="margin-vert--xl">
                <div className="row">
                  <div className="col">
                    {editUrl && <_EditThisPage.default editUrl={editUrl} />}
                  </div>
                  {(lastUpdatedAt || lastUpdatedBy) && <_LastUpdated.default lastUpdatedAt={lastUpdatedAt} formattedLastUpdatedAt={formattedLastUpdatedAt} lastUpdatedBy={lastUpdatedBy} />}
                </div>
              </div>}
            <div className="margin-vert--lg">
              <_DocPaginator.default metadata={metadata} />
            </div>
          </div>
        </div>
        {!hideTableOfContents && DocContent.toc && <div className="col col--3">
            <_TOC.default toc={DocContent.toc} />
          </div>}
      </div>
    </>;
}

var _default = DocItem;
exports.default = _default;