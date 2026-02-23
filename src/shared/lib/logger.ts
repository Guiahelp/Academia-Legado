export const apiLogger = {
    info: (...args: any[]) => console.log('[API INFO]', ...args),
    error: (...args: any[]) => console.error('[API ERROR]', ...args),
    warn: (...args: any[]) => console.warn('[API WARN]', ...args),
    debug: (...args: any[]) => console.debug('[API DEBUG]', ...args),
};

export const mediaLogger = {
    info: (...args: any[]) => console.log('[MEDIA INFO]', ...args),
    error: (...args: any[]) => console.error('[MEDIA ERROR]', ...args),
    warn: (...args: any[]) => console.warn('[MEDIA WARN]', ...args),
    debug: (...args: any[]) => console.debug('[MEDIA DEBUG]', ...args),
};
