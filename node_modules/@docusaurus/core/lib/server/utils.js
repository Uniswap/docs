"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFinalRoutes = void 0;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const lodash_1 = require("lodash");
// Recursively get the final routes (routes with no subroutes)
function getAllFinalRoutes(routeConfig) {
    function getFinalRoutes(route) {
        return route.routes ? lodash_1.flatMap(route.routes, getFinalRoutes) : [route];
    }
    return lodash_1.flatMap(routeConfig, getFinalRoutes);
}
exports.getAllFinalRoutes = getAllFinalRoutes;
