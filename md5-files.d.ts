/**
 *
 * @param {string[]} filenames
 * @param {object} options
 * @param {string} options.cwd
 * @returns
 */
export function md5Files(filenames: string[], options: {
    cwd: string;
}): Promise<Record<string, string>>;
/**
 *
 * @param {string[]} filenames
 * @param {object} options
 * @param {string} options.cwd
 * @returns
 */
export function commandMD5(filenames: string[], { cwd }?: {
    cwd: string;
}): Promise<Record<string, string>>;
/**
 *
 * @param {string[]} filenames
 * @param {object} options
 * @param {string} options.cwd
 * @returns
 */
export function commandMD5Sum(filenames: string[], { cwd }?: {
    cwd: string;
}): Promise<Record<string, string>>;
/**
 *
 * @param {string[]} filenames
 * @param {object} options
 * @param {string} options.cwd
 * @returns
 */
export function jsMd5(filenames: string[], { cwd }?: {
    cwd: string;
}): Promise<Record<string, string>>;
export function jsMd5One(filename: string, { cwd }?: {
    cwd: string;
}): Promise<Record<string, string>>;
//# sourceMappingURL=md5-files.d.ts.map