"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var useThemeConfig_1 = require("./utils/useThemeConfig");
Object.defineProperty(exports, "useThemeConfig", { enumerable: true, get: function () { return useThemeConfig_1.useThemeConfig; } });
var useAlternatePageUtils_1 = require("./utils/useAlternatePageUtils");
Object.defineProperty(exports, "useAlternatePageUtils", { enumerable: true, get: function () { return useAlternatePageUtils_1.useAlternatePageUtils; } });
var searchUtils_1 = require("./utils/searchUtils");
Object.defineProperty(exports, "docVersionSearchTag", { enumerable: true, get: function () { return searchUtils_1.docVersionSearchTag; } });
Object.defineProperty(exports, "DEFAULT_SEARCH_TAG", { enumerable: true, get: function () { return searchUtils_1.DEFAULT_SEARCH_TAG; } });
var docsUtils_1 = require("./utils/docsUtils");
Object.defineProperty(exports, "isDocsPluginEnabled", { enumerable: true, get: function () { return docsUtils_1.isDocsPluginEnabled; } });
var pathUtils_1 = require("./utils/pathUtils");
Object.defineProperty(exports, "isSamePath", { enumerable: true, get: function () { return pathUtils_1.isSamePath; } });
var generalUtils_1 = require("./utils/generalUtils");
Object.defineProperty(exports, "useTitleFormatter", { enumerable: true, get: function () { return generalUtils_1.useTitleFormatter; } });
var usePluralForm_1 = require("./utils/usePluralForm");
Object.defineProperty(exports, "usePluralForm", { enumerable: true, get: function () { return usePluralForm_1.usePluralForm; } });
var useDocsPreferredVersion_1 = require("./utils/docsPreferredVersion/useDocsPreferredVersion");
Object.defineProperty(exports, "useDocsPreferredVersion", { enumerable: true, get: function () { return useDocsPreferredVersion_1.useDocsPreferredVersion; } });
Object.defineProperty(exports, "useDocsPreferredVersionByPluginId", { enumerable: true, get: function () { return useDocsPreferredVersion_1.useDocsPreferredVersionByPluginId; } });
var DocsPreferredVersionProvider_1 = require("./utils/docsPreferredVersion/DocsPreferredVersionProvider");
Object.defineProperty(exports, "DocsPreferredVersionContextProvider", { enumerable: true, get: function () { return DocsPreferredVersionProvider_1.DocsPreferredVersionContextProvider; } });
