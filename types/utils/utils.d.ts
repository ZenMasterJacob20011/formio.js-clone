/**
 * creates a random 7-digit id for components
 * @returns {string} the id
 */
export function getRandomComponentId(): string;
/**
 * lazy loads a cdn and returns a promise of the object
 * @param {string} path path to the cdn
 * @param {string} name name of the object given by the library
 * @returns {Promise<object>} a promise of the library
 */
export function requireLibrary(path: string, name: string): Promise<object>;
//# sourceMappingURL=utils.d.ts.map