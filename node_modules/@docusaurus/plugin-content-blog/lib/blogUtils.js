"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentPathList = exports.linkify = exports.generateBlogPosts = exports.generateBlogFeed = exports.getPostsBySource = exports.truncate = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const globby_1 = __importDefault(require("globby"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const reading_time_1 = __importDefault(require("reading-time"));
const feed_1 = require("feed");
const lodash_1 = require("lodash");
const utils_1 = require("@docusaurus/utils");
function truncate(fileString, truncateMarker) {
    return fileString.split(truncateMarker, 1).shift();
}
exports.truncate = truncate;
function getPostsBySource(blogPosts) {
    return lodash_1.keyBy(blogPosts, (item) => item.metadata.source);
}
exports.getPostsBySource = getPostsBySource;
// YYYY-MM-DD-{name}.mdx?
// Prefer named capture, but older Node versions do not support it.
const FILENAME_PATTERN = /^(\d{4}-\d{1,2}-\d{1,2})-?(.*?).mdx?$/;
function toUrl({ date, link }) {
    return `${date
        .toISOString()
        .substring(0, '2019-01-01'.length)
        .replace(/-/g, '/')}/${link}`;
}
async function generateBlogFeed(contentPaths, context, options) {
    if (!options.feedOptions) {
        throw new Error('Invalid options - `feedOptions` is not expected to be null.');
    }
    const { siteConfig } = context;
    const blogPosts = await generateBlogPosts(contentPaths, context, options);
    if (blogPosts == null) {
        return null;
    }
    const { feedOptions, routeBasePath } = options;
    const { url: siteUrl, title, favicon } = siteConfig;
    const blogBaseUrl = utils_1.normalizeUrl([siteUrl, routeBasePath]);
    const updated = (blogPosts[0] && blogPosts[0].metadata.date) ||
        new Date('2015-10-25T16:29:00.000-07:00');
    const feed = new feed_1.Feed({
        id: blogBaseUrl,
        title: feedOptions.title || `${title} Blog`,
        updated,
        language: feedOptions.language,
        link: blogBaseUrl,
        description: feedOptions.description || `${siteConfig.title} Blog`,
        favicon: utils_1.normalizeUrl([siteUrl, favicon]),
        copyright: feedOptions.copyright,
    });
    blogPosts.forEach((post) => {
        const { id, metadata: { title: metadataTitle, permalink, date, description }, } = post;
        feed.addItem({
            title: metadataTitle,
            id,
            link: utils_1.normalizeUrl([siteUrl, permalink]),
            date,
            description,
        });
    });
    return feed;
}
exports.generateBlogFeed = generateBlogFeed;
async function generateBlogPosts(contentPaths, { siteConfig, siteDir, i18n }, options) {
    const { include, routeBasePath, truncateMarker, showReadingTime, editUrl, } = options;
    if (!fs_extra_1.default.existsSync(contentPaths.contentPath)) {
        return [];
    }
    const { baseUrl = '' } = siteConfig;
    const blogSourceFiles = await globby_1.default(include, {
        cwd: contentPaths.contentPath,
    });
    const blogPosts = [];
    await Promise.all(blogSourceFiles.map(async (blogSourceFile) => {
        // Lookup in localized folder in priority
        const blogDirPath = await utils_1.getFolderContainingFile(getContentPathList(contentPaths), blogSourceFile);
        const source = path_1.default.join(blogDirPath, blogSourceFile);
        const aliasedSource = utils_1.aliasedSitePath(source, siteDir);
        const blogFileName = path_1.default.basename(blogSourceFile);
        const { frontMatter, content, excerpt } = await utils_1.parseMarkdownFile(source);
        if (frontMatter.draft && process.env.NODE_ENV === 'production') {
            return;
        }
        if (frontMatter.id) {
            console.warn(chalk_1.default.yellow(`${blogFileName} - 'id' header option is deprecated. Please use 'slug' option instead.`));
        }
        let date;
        // Extract date and title from filename.
        const match = blogFileName.match(FILENAME_PATTERN);
        let linkName = blogFileName.replace(/\.mdx?$/, '');
        if (match) {
            const [, dateString, name] = match;
            date = new Date(dateString);
            linkName = name;
        }
        // Prefer user-defined date.
        if (frontMatter.date) {
            date = new Date(frontMatter.date);
        }
        // Use file create time for blog.
        date = date || (await fs_extra_1.default.stat(source)).birthtime;
        const formattedDate = utils_1.getDateTimeFormat(i18n.currentLocale)(i18n.currentLocale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
        const slug = frontMatter.slug || (match ? toUrl({ date, link: linkName }) : linkName);
        frontMatter.title = frontMatter.title || linkName;
        const permalink = utils_1.normalizeUrl([baseUrl, routeBasePath, slug]);
        function getBlogEditUrl() {
            const blogPathRelative = path_1.default.relative(blogDirPath, path_1.default.resolve(source));
            if (typeof editUrl === 'function') {
                return editUrl({
                    blogDirPath: utils_1.posixPath(path_1.default.relative(siteDir, blogDirPath)),
                    blogPath: utils_1.posixPath(blogPathRelative),
                    permalink,
                    locale: i18n.currentLocale,
                });
            }
            else if (typeof editUrl === 'string') {
                const isLocalized = blogDirPath === contentPaths.contentPathLocalized;
                const fileContentPath = isLocalized && options.editLocalizedFiles
                    ? contentPaths.contentPathLocalized
                    : contentPaths.contentPath;
                const contentPathEditUrl = utils_1.normalizeUrl([
                    editUrl,
                    utils_1.posixPath(path_1.default.relative(siteDir, fileContentPath)),
                ]);
                return utils_1.getEditUrl(blogPathRelative, contentPathEditUrl);
            }
            else {
                return undefined;
            }
        }
        blogPosts.push({
            id: frontMatter.slug || frontMatter.title,
            metadata: {
                permalink,
                editUrl: getBlogEditUrl(),
                source: aliasedSource,
                description: frontMatter.description || excerpt,
                date,
                formattedDate,
                tags: frontMatter.tags,
                title: frontMatter.title,
                readingTime: showReadingTime
                    ? reading_time_1.default(content).minutes
                    : undefined,
                truncated: (truncateMarker === null || truncateMarker === void 0 ? void 0 : truncateMarker.test(content)) || false,
            },
        });
    }));
    blogPosts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());
    return blogPosts;
}
exports.generateBlogPosts = generateBlogPosts;
function linkify({ filePath, contentPaths, fileContent, siteDir, blogPostsBySource, onBrokenMarkdownLink, }) {
    // TODO temporary, should consider the file being in localized folder!
    const folderPath = contentPaths.contentPath;
    let fencedBlock = false;
    const lines = fileContent.split('\n').map((line) => {
        if (line.trim().startsWith('```')) {
            fencedBlock = !fencedBlock;
        }
        if (fencedBlock) {
            return line;
        }
        let modifiedLine = line;
        const mdRegex = /(?:(?:\]\()|(?:\]:\s?))(?!https)([^'")\]\s>]+\.mdx?)/g;
        let mdMatch = mdRegex.exec(modifiedLine);
        while (mdMatch !== null) {
            const mdLink = mdMatch[1];
            const aliasedSource = (source) => utils_1.aliasedSitePath(source, siteDir);
            const blogPost = blogPostsBySource[aliasedSource(url_1.resolve(filePath, mdLink))] ||
                blogPostsBySource[aliasedSource(`${contentPaths.contentPathLocalized}/${mdLink}`)] ||
                blogPostsBySource[aliasedSource(`${contentPaths.contentPath}/${mdLink}`)];
            if (blogPost) {
                modifiedLine = modifiedLine.replace(mdLink, blogPost.metadata.permalink);
            }
            else {
                const brokenMarkdownLink = {
                    folderPath,
                    filePath,
                    link: mdLink,
                };
                onBrokenMarkdownLink(brokenMarkdownLink);
            }
            mdMatch = mdRegex.exec(modifiedLine);
        }
        return modifiedLine;
    });
    return lines.join('\n');
}
exports.linkify = linkify;
// Order matters: we look in priority in localized folder
function getContentPathList(contentPaths) {
    return [contentPaths.contentPathLocalized, contentPaths.contentPath];
}
exports.getContentPathList = getContentPathList;
