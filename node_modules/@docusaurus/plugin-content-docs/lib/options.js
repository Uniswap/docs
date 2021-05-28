"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = exports.OptionsSchema = exports.DEFAULT_OPTIONS = void 0;
const tslib_1 = require("tslib");
const utils_validation_1 = require("@docusaurus/utils-validation");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const remark_admonitions_1 = tslib_1.__importDefault(require("remark-admonitions"));
const sidebarItemsGenerator_1 = require("./sidebarItemsGenerator");
const numberPrefix_1 = require("./numberPrefix");
exports.DEFAULT_OPTIONS = {
    path: 'docs',
    routeBasePath: 'docs',
    homePageId: undefined,
    include: ['**/*.{md,mdx}'],
    sidebarPath: 'sidebars.json',
    sidebarItemsGenerator: sidebarItemsGenerator_1.DefaultSidebarItemsGenerator,
    numberPrefixParser: numberPrefix_1.DefaultNumberPrefixParser,
    docLayoutComponent: '@theme/DocPage',
    docItemComponent: '@theme/DocItem',
    remarkPlugins: [],
    rehypePlugins: [],
    beforeDefaultRemarkPlugins: [],
    beforeDefaultRehypePlugins: [],
    showLastUpdateTime: false,
    showLastUpdateAuthor: false,
    admonitions: {},
    excludeNextVersionDocs: false,
    includeCurrentVersion: true,
    disableVersioning: false,
    lastVersion: undefined,
    versions: {},
    editCurrentVersion: false,
    editLocalizedFiles: false,
};
const VersionOptionsSchema = utils_validation_1.Joi.object({
    path: utils_validation_1.Joi.string().allow('').optional(),
    label: utils_validation_1.Joi.string().optional(),
});
const VersionsOptionsSchema = utils_validation_1.Joi.object()
    .pattern(utils_validation_1.Joi.string().required(), VersionOptionsSchema)
    .default(exports.DEFAULT_OPTIONS.versions);
exports.OptionsSchema = utils_validation_1.Joi.object({
    path: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.path),
    editUrl: utils_validation_1.Joi.alternatives().try(utils_validation_1.URISchema, utils_validation_1.Joi.function()),
    editCurrentVersion: utils_validation_1.Joi.boolean().default(exports.DEFAULT_OPTIONS.editCurrentVersion),
    editLocalizedFiles: utils_validation_1.Joi.boolean().default(exports.DEFAULT_OPTIONS.editLocalizedFiles),
    routeBasePath: utils_validation_1.Joi.string()
        // '' not allowed, see https://github.com/facebook/docusaurus/issues/3374
        // .allow('') ""
        .default(exports.DEFAULT_OPTIONS.routeBasePath),
    homePageId: utils_validation_1.Joi.string().optional(),
    include: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string()).default(exports.DEFAULT_OPTIONS.include),
    sidebarPath: utils_validation_1.Joi.string().allow('').default(exports.DEFAULT_OPTIONS.sidebarPath),
    sidebarItemsGenerator: utils_validation_1.Joi.function().default(() => exports.DEFAULT_OPTIONS.sidebarItemsGenerator),
    numberPrefixParser: utils_validation_1.Joi.alternatives()
        .try(utils_validation_1.Joi.function(), 
    // Convert boolean values to functions
    utils_validation_1.Joi.alternatives().conditional(utils_validation_1.Joi.boolean(), {
        then: utils_validation_1.Joi.custom((val) => val ? numberPrefix_1.DefaultNumberPrefixParser : numberPrefix_1.DisabledNumberPrefixParser),
    }))
        .default(() => exports.DEFAULT_OPTIONS.numberPrefixParser),
    docLayoutComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.docLayoutComponent),
    docItemComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.docItemComponent),
    remarkPlugins: utils_validation_1.RemarkPluginsSchema.default(exports.DEFAULT_OPTIONS.remarkPlugins),
    rehypePlugins: utils_validation_1.RehypePluginsSchema.default(exports.DEFAULT_OPTIONS.rehypePlugins),
    beforeDefaultRemarkPlugins: utils_validation_1.RemarkPluginsSchema.default(exports.DEFAULT_OPTIONS.beforeDefaultRemarkPlugins),
    beforeDefaultRehypePlugins: utils_validation_1.RehypePluginsSchema.default(exports.DEFAULT_OPTIONS.beforeDefaultRehypePlugins),
    admonitions: utils_validation_1.Joi.alternatives()
        .try(utils_validation_1.AdmonitionsSchema, utils_validation_1.Joi.boolean().invalid(true))
        .default(exports.DEFAULT_OPTIONS.admonitions),
    showLastUpdateTime: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.showLastUpdateTime),
    showLastUpdateAuthor: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.showLastUpdateAuthor),
    excludeNextVersionDocs: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.excludeNextVersionDocs),
    includeCurrentVersion: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.includeCurrentVersion),
    onlyIncludeVersions: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string().required()).optional(),
    disableVersioning: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.disableVersioning),
    lastVersion: utils_validation_1.Joi.string().optional(),
    versions: VersionsOptionsSchema,
});
function validateOptions({ validate, options, }) {
    // TODO remove homePageId before end of 2020
    // "slug: /" is better because the home doc can be different across versions
    if (options.homePageId) {
        console.log(chalk_1.default.red(`The docs plugin option homePageId=${options.homePageId} is deprecated. To make a doc the "home", prefer frontmatter: "slug: /"`));
    }
    if (typeof options.excludeNextVersionDocs !== 'undefined') {
        console.log(chalk_1.default.red(`The docs plugin option excludeNextVersionDocs=${options.excludeNextVersionDocs} is deprecated. Use the includeCurrentVersion=${!options.excludeNextVersionDocs} option instead!"`));
        options.includeCurrentVersion = !options.excludeNextVersionDocs;
    }
    const normalizedOptions = validate(exports.OptionsSchema, options);
    if (normalizedOptions.admonitions) {
        normalizedOptions.remarkPlugins = normalizedOptions.remarkPlugins.concat([
            [remark_admonitions_1.default, normalizedOptions.admonitions],
        ]);
    }
    return normalizedOptions;
}
exports.validateOptions = validateOptions;
