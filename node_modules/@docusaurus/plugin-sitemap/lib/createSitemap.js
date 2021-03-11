"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sitemap_1 = require("sitemap");
const utils_1 = require("@docusaurus/utils");
async function createSitemap(siteConfig, routesPaths, options) {
    const { url: hostname } = siteConfig;
    if (!hostname) {
        throw new Error('url in docusaurus.config.js cannot be empty/undefined');
    }
    const { changefreq, priority, trailingSlash } = options;
    const sitemapStream = new sitemap_1.SitemapStream({
        hostname,
    });
    routesPaths
        .filter((route) => !route.endsWith('404.html'))
        .map((routePath) => sitemapStream.write({
        url: trailingSlash ? utils_1.addTrailingSlash(routePath) : routePath,
        changefreq,
        priority,
    }));
    sitemapStream.end();
    const generatedSitemap = await sitemap_1.streamToPromise(sitemapStream).then((sm) => sm.toString());
    return generatedSitemap;
}
exports.default = createSitemap;
