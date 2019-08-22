import { AnyPlainObj } from '../declare/type';
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export default function buildURL(url: string, params: object, paramsSerializer?: ((params: AnyPlainObj) => string) | null): string;
