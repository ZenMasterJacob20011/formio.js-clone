/**
 * creates a random 7-digit id for components
 * @returns {string} the id
 */
export function getRandomComponentId() {
    return ('' + Math.random()).substring(2, 9);
}

/**
 * lazy loads a cdn and returns a promise of the object
 * @param {string} path path to the cdn
 * @param {string} name name of the object given by the library
 * @returns {Promise<object>} a promise of the library
 */
export async function requireLibrary(path, name) {
    if (window[name]) {
        return window[name];
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = path;
    document.querySelector('head').append(script);
    let lib = {};
    lib.ready = new Promise((resolve, reject) => {
        lib.resolve = resolve;
        lib.reject = reject;
    });
    let intervalCnt = 0;
    const interval = setInterval(() => {
        if (window[name]) {
            lib.resolve(window[name]);
            clearInterval(interval);
        } else if (intervalCnt >= 10) {
            lib.reject();
        }
    }, 500);
    return lib.ready;
}
