/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="react" />
import { InterpolateProps, InterpolateValues } from '@docusaurus/Interpolate';
export declare type TranslateParam<Str extends string> = {
    message: Str;
    id?: string;
    description?: string;
    values?: InterpolateValues<Str, string | number>;
};
export declare function translate<Str extends string>({ message, id }: TranslateParam<Str>, values?: InterpolateValues<Str, string | number>): string;
export declare type TranslateProps<Str extends string> = InterpolateProps<Str> & {
    id?: string;
    description?: string;
};
export default function Translate<Str extends string>({ children, id, values, }: TranslateProps<Str>): JSX.Element;
//# sourceMappingURL=Translate.d.ts.map