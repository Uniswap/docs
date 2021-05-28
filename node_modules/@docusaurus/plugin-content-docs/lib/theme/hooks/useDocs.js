"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocVersionSuggestions = exports.useActiveDocContext = exports.useActiveVersion = exports.useLatestVersion = exports.useVersions = exports.useActivePluginAndVersion = exports.useActivePlugin = exports.useDocsData = exports.useAllDocsData = void 0;
const router_1 = require("@docusaurus/router");
const useGlobalData_1 = require("@docusaurus/useGlobalData");
const docsClientUtils_1 = require("../../client/docsClientUtils");
const useAllDocsData = () => useGlobalData_1.useAllPluginInstancesData('docusaurus-plugin-content-docs');
exports.useAllDocsData = useAllDocsData;
const useDocsData = (pluginId) => useGlobalData_1.usePluginData('docusaurus-plugin-content-docs', pluginId);
exports.useDocsData = useDocsData;
const useActivePlugin = (options = {}) => {
    const data = exports.useAllDocsData();
    const { pathname } = router_1.useLocation();
    return docsClientUtils_1.getActivePlugin(data, pathname, options);
};
exports.useActivePlugin = useActivePlugin;
const useActivePluginAndVersion = (options = {}) => {
    const activePlugin = exports.useActivePlugin(options);
    const { pathname } = router_1.useLocation();
    if (activePlugin) {
        const activeVersion = docsClientUtils_1.getActiveVersion(activePlugin.pluginData, pathname);
        return {
            activePlugin,
            activeVersion,
        };
    }
    return undefined;
};
exports.useActivePluginAndVersion = useActivePluginAndVersion;
// versions are returned ordered (most recent first)
const useVersions = (pluginId) => {
    const data = exports.useDocsData(pluginId);
    return data.versions;
};
exports.useVersions = useVersions;
const useLatestVersion = (pluginId) => {
    const data = exports.useDocsData(pluginId);
    return docsClientUtils_1.getLatestVersion(data);
};
exports.useLatestVersion = useLatestVersion;
// Note: return undefined on doc-unrelated pages,
// because there's no version currently considered as active
const useActiveVersion = (pluginId) => {
    const data = exports.useDocsData(pluginId);
    const { pathname } = router_1.useLocation();
    return docsClientUtils_1.getActiveVersion(data, pathname);
};
exports.useActiveVersion = useActiveVersion;
const useActiveDocContext = (pluginId) => {
    const data = exports.useDocsData(pluginId);
    const { pathname } = router_1.useLocation();
    return docsClientUtils_1.getActiveDocContext(data, pathname);
};
exports.useActiveDocContext = useActiveDocContext;
// Useful to say "hey, you are not on the latest docs version, please switch"
const useDocVersionSuggestions = (pluginId) => {
    const data = exports.useDocsData(pluginId);
    const { pathname } = router_1.useLocation();
    return docsClientUtils_1.getDocVersionSuggestions(data, pathname);
};
exports.useDocVersionSuggestions = useDocVersionSuggestions;
