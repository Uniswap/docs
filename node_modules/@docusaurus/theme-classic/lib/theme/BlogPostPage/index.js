"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Layout = _interopRequireDefault(require("@theme/Layout"));

var _BlogPostItem = _interopRequireDefault(require("@theme/BlogPostItem"));

var _BlogPostPaginator = _interopRequireDefault(require("@theme/BlogPostPaginator"));

var _BlogSidebar = _interopRequireDefault(require("@theme/BlogSidebar"));

var _TOC = _interopRequireDefault(require("@theme/TOC"));

var _EditThisPage = _interopRequireDefault(require("@theme/EditThisPage"));

var _themeCommon = require("@docusaurus/theme-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function BlogPostPage(props) {
  const {
    content: BlogPostContents,
    sidebar
  } = props;
  const {
    frontMatter,
    metadata
  } = BlogPostContents;
  const {
    title,
    description,
    nextItem,
    prevItem,
    editUrl
  } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents
  } = frontMatter;
  return <_Layout.default title={title} description={description} wrapperClassName={_themeCommon.ThemeClassNames.wrapper.blogPages} pageClassName={_themeCommon.ThemeClassNames.page.blogPostPage}>
      {BlogPostContents && <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--3">
              <_BlogSidebar.default sidebar={sidebar} />
            </div>
            <main className="col col--7">
              <_BlogPostItem.default frontMatter={frontMatter} metadata={metadata} isBlogPostPage>
                <BlogPostContents />
              </_BlogPostItem.default>
              <div>{editUrl && <_EditThisPage.default editUrl={editUrl} />}</div>
              {(nextItem || prevItem) && <div className="margin-vert--xl">
                  <_BlogPostPaginator.default nextItem={nextItem} prevItem={prevItem} />
                </div>}
            </main>
            {!hideTableOfContents && BlogPostContents.toc && <div className="col col--2">
                <_TOC.default toc={BlogPostContents.toc} />
              </div>}
          </div>
        </div>}
    </_Layout.default>;
}

var _default = BlogPostPage;
exports.default = _default;