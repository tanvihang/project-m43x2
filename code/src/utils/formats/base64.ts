// @flow
// Inspired by: https://github.com/davidchambers/Base64.js/blob/master/base64.js

/**
 * Base64 encoding and decoding utility
 * 
 * Provides methods to encode and decode strings using Base64 encoding,
 * similar to the browser's native btoa() and atob() functions.
 */

// Characters used in Base64 encoding. (64 character)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';


const Base64 = {

  /**
   * Encodes a string to Base64 (Binary to ASCII)
   * 
   * @param input - The string to encode
   * @returns The Base64 encoded string
   * @throws Error if the string contains characters outside the Latin1 range (char code > 0xFF)
   * 
   * @example
   * ```typescript
   * const encoded = Base64.btoa('Hello World');
   * // Returns: 'SGVsbG8gV29ybGQ='
   * ```
   */
  btoa: (input: string = '') => {
    let str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  /**
   * Decodes a Base64 encoded string (ASCII to Binary)
   * 
   * @param input - The Base64 encoded string to decode
   * @returns The decoded string
   * @throws Error if the string is not correctly encoded (invalid Base64 format)
   * 
   * @example
   * ```typescript
   * const decoded = Base64.atob('SGVsbG8gV29ybGQ=');
   * // Returns: 'Hello World'
   * ```
   */
  atob: (input: string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
};

export default Base64;
