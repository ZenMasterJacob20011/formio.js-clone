/**
 * creates a random 7-digit id for components
 * @returns {string} the id
 */
export function getRandomComponentId() {
    return ('' + Math.random()).substring(2,9);
}
