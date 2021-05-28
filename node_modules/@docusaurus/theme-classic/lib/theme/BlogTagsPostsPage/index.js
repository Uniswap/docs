"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Layout = _interopRequireDefault(require("@theme/Layout"));

var _BlogPostItem = _interopRequireDefault(require("@theme/BlogPostItem"));

var _Link = _interopRequireDefault(require("@docusaurus/Link"));

var _BlogSidebar = _interopRequireDefault(require("@theme/BlogSidebar"));

var _Translate = _interopRequireWildcard(require("@docusaurus/Translate"));

var _themeCommon = require("@docusaurus/theme-common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const {
    selectMessage
  } = (0, _themeCommon.usePluralForm)();
  return count => selectMessage(count, (0, _Translate.translate)({
    id: 'theme.blog.post.plurals',
    description: 'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
    message: 'One post|{count} posts'
  }, {
    count
  }));
}

function BlogTagsPostPageTitle({
  tagName,
  count
}) {
  const blogPostsPlural = useBlogPostsPlural();
  return <_Translate.default id="theme.blog.tagTitle" description="The title of the page for a blog tag" values={{
    nPosts: blogPostsPlural(count),
    tagName
  }}>
      {'{nPosts} tagged with "{tagName}"'}
    </_Translate.default>;
}

function BlogTagsPostPage(props) {
  const {
    metadata,
    items,
    sidebar
  } = props;
  const {
    allTagsPath,
    name: tagName,
    count
  } = metadata;
  return <_Layout.default title={`Posts tagged "${tagName}"`} description={`Blog | Tagged "${tagName}"`} wrapperClassName={_themeCommon.ThemeClassNames.wrapper.blogPages} pageClassName={_themeCommon.ThemeClassNames.page.blogTagsPostPage} searchMetadatas={{
    // assign unique search tag to exclude this page from search results!
    tag: 'blog_tags_posts'
  }}>
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--3">
            <_BlogSidebar.default sidebar={sidebar} />
          </div>
          <main className="col col--7">
            <h1>
              <BlogTagsPostPageTitle count={count} tagName={tagName} />
            </h1>
            <_Link.default href={allTagsPath}>
              <_Translate.default id="theme.tags.tagsPageLink" description="The label of the link targeting the tag list page">
                View All Tags
              </_Translate.default>
            </_Link.default>
            <div className="margin-vert--xl">
              {items.map(({
              content: BlogPostContent
            }) => <_BlogPostItem.default key={BlogPostContent.metadata.permalink} frontMatter={BlogPostContent.frontMatter} metadata={BlogPostContent.metadata} truncated>
                  <BlogPostContent />
                </_BlogPostItem.default>)}
            </div>
          </main>
        </div>
      </div>
    </_Layout.default>;
}

var _default = BlogTagsPostPage;
exports.default = _default;