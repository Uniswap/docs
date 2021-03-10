"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _react2 = require("@mdx-js/react");

var _Translate = _interopRequireWildcard(require("@docusaurus/Translate"));

var _Link = _interopRequireDefault(require("@docusaurus/Link"));

var _MDXComponents = _interopRequireDefault(require("@theme/MDXComponents"));

var _Seo = _interopRequireDefault(require("@theme/Seo"));

var _stylesModule = _interopRequireDefault(require("./styles.module.css"));

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
function useReadingTimePlural() {
  const {
    selectMessage
  } = (0, _themeCommon.usePluralForm)();
  return readingTimeFloat => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(readingTime, (0, _Translate.translate)({
      id: 'theme.blog.post.readingTime.plurals',
      description: 'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
      message: 'One min read|{readingTime} min read'
    }, {
      readingTime
    }));
  };
}

function BlogPostItem(props) {
  const readingTimePlural = useReadingTimePlural();
  const {
    children,
    frontMatter,
    metadata,
    truncated,
    isBlogPostPage = false
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime
  } = metadata;
  const {
    author,
    title,
    image,
    keywords
  } = frontMatter;
  const authorURL = frontMatter.author_url || frontMatter.authorURL;
  const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  const authorImageURL = frontMatter.author_image_url || frontMatter.authorImageURL;

  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
    return <header>
        <TitleHeading className={(0, _clsx.default)('margin-bottom--sm', _stylesModule.default.blogPostTitle)}>
          {isBlogPostPage ? title : <_Link.default to={permalink}>{title}</_Link.default>}
        </TitleHeading>
        <div className="margin-vert--md">
          <time dateTime={date} className={_stylesModule.default.blogPostDate}>
            {formattedDate}
            {readingTime && <>
                {' · '}
                {readingTimePlural(readingTime)}
              </>}
          </time>
        </div>
        <div className="avatar margin-vert--md">
          {authorImageURL && <_Link.default className="avatar__photo-link avatar__photo" href={authorURL}>
              <img src={authorImageURL} alt={author} />
            </_Link.default>}
          <div className="avatar__intro">
            {author && <>
                <h4 className="avatar__name">
                  <_Link.default href={authorURL}>{author}</_Link.default>
                </h4>
                <small className="avatar__subtitle">{authorTitle}</small>
              </>}
          </div>
        </div>
      </header>;
  };

  return <>
      <_Seo.default {...{
      keywords,
      image
    }} />

      <article className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}>
        {renderPostHeader()}
        <div className="markdown">
          <_react2.MDXProvider components={_MDXComponents.default}>{children}</_react2.MDXProvider>
        </div>
        {(tags.length > 0 || truncated) && <footer className="row margin-vert--lg">
            {tags.length > 0 && <div className="col">
                <strong>
                  <_Translate.default id="theme.tags.tagsListLabel" description="The label alongside a tag list">
                    Tags:
                  </_Translate.default>
                </strong>
                {tags.map(({
            label,
            permalink: tagPermalink
          }) => <_Link.default key={tagPermalink} className="margin-horiz--sm" to={tagPermalink}>
                    {label}
                  </_Link.default>)}
              </div>}
            {truncated && <div className="col text--right">
                <_Link.default to={metadata.permalink} aria-label={`Read more about ${title}`}>
                  <strong>
                    <_Translate.default id="theme.blog.post.readMore" description="The label used in blog post item excerpts to link to full blog posts">
                      Read More
                    </_Translate.default>
                  </strong>
                </_Link.default>
              </div>}
          </footer>}
      </article>
    </>;
}

var _default = BlogPostItem;
exports.default = _default;