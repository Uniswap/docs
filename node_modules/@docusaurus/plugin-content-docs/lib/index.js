"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const constants_1 = require("@docusaurus/core/lib/constants");
const utils_1 = require("@docusaurus/utils");
const sidebars_1 = require("./sidebars");
const docs_1 = require("./docs");
const versions_1 = require("./versions");
const cli_1 = require("./cli");
const constants_2 = require("./constants");
const lodash_1 = require("lodash");
const globalData_1 = require("./globalData");
const props_1 = require("./props");
const translations_1 = require("./translations");
const sidebarItemsGenerator_1 = require("./sidebarItemsGenerator");
function pluginContentDocs(context, options) {
    var _a;
    const { siteDir, generatedFilesDir, baseUrl, siteConfig } = context;
    const versionsMetadata = versions_1.readVersionsMetadata({ context, options });
    const sourceToPermalink = {};
    const pluginId = (_a = options.id) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_PLUGIN_ID;
    const pluginDataDirRoot = path_1.default.join(generatedFilesDir, 'docusaurus-plugin-content-docs');
    const dataDir = path_1.default.join(pluginDataDirRoot, pluginId);
    const aliasedSource = (source) => `~docs/${utils_1.posixPath(path_1.default.relative(pluginDataDirRoot, source))}`;
    return {
        name: 'docusaurus-plugin-content-docs',
        getThemePath() {
            return path_1.default.resolve(__dirname, './theme');
        },
        getTypeScriptThemePath() {
            return path_1.default.resolve(__dirname, '..', 'src', 'theme');
        },
        extendCli(cli) {
            const isDefaultPluginId = pluginId === constants_1.DEFAULT_PLUGIN_ID;
            // Need to create one distinct command per plugin instance
            // otherwise 2 instances would try to execute the command!
            const command = isDefaultPluginId
                ? 'docs:version'
                : `docs:version:${pluginId}`;
            const commandDescription = isDefaultPluginId
                ? 'Tag a new docs version'
                : `Tag a new docs version (${pluginId})`;
            cli
                .command(command)
                .arguments('<version>')
                .description(commandDescription)
                .action((version) => {
                cli_1.cliDocsVersionCommand(version, siteDir, pluginId, {
                    path: options.path,
                    sidebarPath: options.sidebarPath,
                });
            });
        },
        async getTranslationFiles({ content }) {
            return translations_1.getLoadedContentTranslationFiles(content);
        },
        getClientModules() {
            const modules = [];
            if (options.admonitions) {
                modules.push(require.resolve('remark-admonitions/styles/infima.css'));
            }
            return modules;
        },
        getPathsToWatch() {
            function getVersionPathsToWatch(version) {
                return [
                    version.sidebarFilePath,
                    ...lodash_1.flatten(options.include.map((pattern) => versions_1.getDocsDirPaths(version).map((docsDirPath) => `${docsDirPath}/${pattern}`))),
                    `${version.contentPath}/**/${sidebarItemsGenerator_1.CategoryMetadataFilenamePattern}`,
                ];
            }
            return lodash_1.flatten(versionsMetadata.map(getVersionPathsToWatch));
        },
        async loadContent() {
            async function loadVersionDocsBase(versionMetadata) {
                const docFiles = await docs_1.readVersionDocs(versionMetadata, options);
                if (docFiles.length === 0) {
                    throw new Error(`Docs version ${versionMetadata.versionName} has no docs! At least one doc should exist at path=[${path_1.default.relative(siteDir, versionMetadata.contentPath)}]`);
                }
                async function processVersionDoc(docFile) {
                    return docs_1.processDocMetadata({
                        docFile,
                        versionMetadata,
                        context,
                        options,
                    });
                }
                return Promise.all(docFiles.map(processVersionDoc));
            }
            async function loadVersion(versionMetadata) {
                const unprocessedSidebars = sidebars_1.loadSidebars(versionMetadata.sidebarFilePath);
                const docsBase = await loadVersionDocsBase(versionMetadata);
                const docsBaseById = lodash_1.keyBy(docsBase, (doc) => doc.id);
                const sidebars = await sidebars_1.processSidebars({
                    sidebarItemsGenerator: options.sidebarItemsGenerator,
                    numberPrefixParser: options.numberPrefixParser,
                    unprocessedSidebars,
                    docs: docsBase,
                    version: versionMetadata,
                });
                const sidebarsUtils = sidebars_1.createSidebarsUtils(sidebars);
                const validDocIds = Object.keys(docsBaseById);
                sidebarsUtils.checkSidebarsDocIds(validDocIds);
                // Add sidebar/next/previous to the docs
                function addNavData(doc) {
                    const { sidebarName, previousId, nextId, } = sidebarsUtils.getDocNavigation(doc.id);
                    const toDocNavLink = (navDocId) => ({
                        title: docsBaseById[navDocId].title,
                        permalink: docsBaseById[navDocId].permalink,
                    });
                    return {
                        ...doc,
                        sidebar: sidebarName,
                        previous: previousId ? toDocNavLink(previousId) : undefined,
                        next: nextId ? toDocNavLink(nextId) : undefined,
                    };
                }
                const docs = docsBase.map(addNavData);
                // sort to ensure consistent output for tests
                docs.sort((a, b) => a.id.localeCompare(b.id));
                // TODO annoying side effect!
                Object.values(docs).forEach((loadedDoc) => {
                    const { source, permalink } = loadedDoc;
                    sourceToPermalink[source] = permalink;
                });
                // TODO really useful? replace with global state logic?
                const permalinkToSidebar = {};
                Object.values(docs).forEach((doc) => {
                    if (doc.sidebar) {
                        permalinkToSidebar[doc.permalink] = doc.sidebar;
                    }
                });
                // The "main doc" is the "version entry point"
                // We browse this doc by clicking on a version:
                // - the "home" doc (at '/docs/')
                // - the first doc of the first sidebar
                // - a random doc (if no docs are in any sidebar... edge case)
                function getMainDoc() {
                    const versionHomeDoc = docs.find((doc) => doc.unversionedId === options.homePageId || doc.slug === '/');
                    const firstDocIdOfFirstSidebar = sidebarsUtils.getFirstDocIdOfFirstSidebar();
                    if (versionHomeDoc) {
                        return versionHomeDoc;
                    }
                    else if (firstDocIdOfFirstSidebar) {
                        return docs.find((doc) => doc.id === firstDocIdOfFirstSidebar);
                    }
                    else {
                        return docs[0];
                    }
                }
                return {
                    ...versionMetadata,
                    mainDocId: getMainDoc().unversionedId,
                    sidebars,
                    permalinkToSidebar,
                    docs: docs.map(addNavData),
                };
            }
            return {
                loadedVersions: await Promise.all(versionsMetadata.map(loadVersion)),
            };
        },
        translateContent({ content, translationFiles }) {
            return translations_1.translateLoadedContent(content, translationFiles);
        },
        async contentLoaded({ content, actions }) {
            const { loadedVersions } = content;
            const { docLayoutComponent, docItemComponent } = options;
            const { addRoute, createData, setGlobalData } = actions;
            const createDocRoutes = async (docs) => {
                const routes = await Promise.all(docs.map(async (metadataItem) => {
                    await createData(
                    // Note that this created data path must be in sync with
                    // metadataPath provided to mdx-loader.
                    `${utils_1.docuHash(metadataItem.source)}.json`, JSON.stringify(metadataItem, null, 2));
                    return {
                        path: metadataItem.permalink,
                        component: docItemComponent,
                        exact: true,
                        modules: {
                            content: metadataItem.source,
                        },
                    };
                }));
                return routes.sort((a, b) => a.path.localeCompare(b.path));
            };
            async function handleVersion(loadedVersion) {
                const versionMetadataPropPath = await createData(`${utils_1.docuHash(`version-${loadedVersion.versionName}-metadata-prop`)}.json`, JSON.stringify(props_1.toVersionMetadataProp(pluginId, loadedVersion), null, 2));
                addRoute({
                    path: loadedVersion.versionPath,
                    // allow matching /docs/* as well
                    exact: false,
                    // main docs component (DocPage)
                    component: docLayoutComponent,
                    // sub-routes for each doc
                    routes: await createDocRoutes(loadedVersion.docs),
                    modules: {
                        versionMetadata: aliasedSource(versionMetadataPropPath),
                    },
                    priority: loadedVersion.routePriority,
                });
            }
            await Promise.all(loadedVersions.map(handleVersion));
            setGlobalData({
                path: utils_1.normalizeUrl([baseUrl, options.routeBasePath]),
                versions: loadedVersions.map(globalData_1.toGlobalDataVersion),
            });
        },
        configureWebpack(_config, isServer, utils) {
            const { getJSLoader } = utils;
            const { rehypePlugins, remarkPlugins, beforeDefaultRehypePlugins, beforeDefaultRemarkPlugins, } = options;
            const docsMarkdownOptions = {
                siteDir,
                sourceToPermalink,
                versionsMetadata,
                onBrokenMarkdownLink: (brokenMarkdownLink) => {
                    if (siteConfig.onBrokenMarkdownLinks === 'ignore') {
                        return;
                    }
                    utils_1.reportMessage(`Docs markdown link couldn't be resolved: (${brokenMarkdownLink.link}) in ${brokenMarkdownLink.filePath} for version ${brokenMarkdownLink.contentPaths.versionName}`, siteConfig.onBrokenMarkdownLinks);
                },
            };
            function createMDXLoaderRule() {
                return {
                    test: /(\.mdx?)$/,
                    include: lodash_1.flatten(versionsMetadata.map(versions_1.getDocsDirPaths))
                        // Trailing slash is important, see https://github.com/facebook/docusaurus/pull/3970
                        .map(utils_1.addTrailingPathSeparator),
                    use: lodash_1.compact([
                        getJSLoader({ isServer }),
                        {
                            loader: require.resolve('@docusaurus/mdx-loader'),
                            options: {
                                remarkPlugins,
                                rehypePlugins,
                                beforeDefaultRehypePlugins,
                                beforeDefaultRemarkPlugins,
                                staticDir: path_1.default.join(siteDir, constants_1.STATIC_DIR_NAME),
                                metadataPath: (mdxPath) => {
                                    // Note that metadataPath must be the same/in-sync as
                                    // the path from createData for each MDX.
                                    const aliasedPath = utils_1.aliasedSitePath(mdxPath, siteDir);
                                    return path_1.default.join(dataDir, `${utils_1.docuHash(aliasedPath)}.json`);
                                },
                            },
                        },
                        {
                            loader: path_1.default.resolve(__dirname, './markdown/index.js'),
                            options: docsMarkdownOptions,
                        },
                    ]),
                };
            }
            return {
                ignoreWarnings: [
                    // Suppress warnings about non-existing of versions file.
                    (e) => e.message.includes("Can't resolve") &&
                        e.message.includes(constants_2.VERSIONS_JSON_FILE),
                ],
                resolve: {
                    alias: {
                        '~docs': pluginDataDirRoot,
                    },
                },
                module: {
                    rules: [createMDXLoaderRule()],
                },
            };
        },
    };
}
exports.default = pluginContentDocs;
var options_1 = require("./options");
Object.defineProperty(exports, "validateOptions", { enumerable: true, get: function () { return options_1.validateOptions; } });
