import { Injectable } from '@angular/core';

@Injectable()
export class TurkishStringService {

  // normal javascript code taken from:
  // https://github.com/scokmen/turkish-string/blob/master/src/turkish-string.js
  constructor() {

  }

  /**
  * Turkish special letters to english letters mapping table.
  */
  TURKISH_TO_ENGLISH_TRANSFORM_MAP: any = {
    'ç': 'c', 'ı': 'i', 'ğ': 'g', 'ş': 's', 'ö': 'o', 'ü': 'u',
    'Ç': 'C', 'İ': 'I', 'Ğ': 'G', 'Ş': 'S', 'Ö': 'O', 'Ü': 'U'
  };

  /**
   * Turkish special letters virtual ascii codes.
   */
  VIRTUAL_ASCII_CODES: any = {
    'ç': '099.5',
    'Ç': '67.5',
    'ğ': '103.5',
    'Ğ': '71.5',
    'ı': '104.5',
    'İ': '74.5',
    'ş': '115.5',
    'Ş': '83.5',
    'ö': '111.5',
    'Ö': '79.5',
    'ü': '117.5',
    'Ü': '85.5'
  };

  /**
   * Turkish special letters to lower and to upper mapping table.
   */
  LETTER_TRANSFORM_MAP:any = {
    'İ': 'i', 'I': 'ı', 'Ş': 'ş', 'Ğ': 'ğ', 'Ü': 'ü', 'Ö': 'ö', 'Ç': 'ç',
    'i': 'İ', 'ş': 'Ş', 'ğ': 'Ğ', 'ü': 'Ü', 'ö': 'Ö', 'ç': 'Ç', 'ı': 'I'
  };

  LOWER_CASE_REGEX = /[\u00C7\u011E\u0049\u0130\u00D6\u015E\u00DC]/g;
  UPPER_CASE_REGEX = /[\u00E7\u011F\u0131\u0069\u00F6\u015F\u00FC]/g;
  CLEAR_LETTER_REGEX = /[\u00E7\u011F\u0131\u00F6\u015F\u00FC\u00C7\u011E\u0130\u00D6\u015E\u00DC]/g;

  COMPARISON_RESULT: any = {
    LESS_THAN: -1, EQUAL: 0, GREATER_THAN: 1
  };

  /**
     * Is parameter a valid string?
     * @param  {string} str
     * @return {boolean}
     */
  isString(str: any) {
    return str !== null && typeof str === 'string';
  }

  /**
   * Get ascii code for given letter.
   * @param {string} letter
   * @returns {number}
   */
  getCharCode(letter:string) {
    return (letter === '' ? null : (this.VIRTUAL_ASCII_CODES[letter] || letter.charCodeAt(0)));
  }

  /**
   * Transform turkish special letters to lower or to upper
   * by using LETTER_TRANSFORM_MAP
   * mapping table.
   * @param {string} letter
   * @returns {string}
   */
  transformLetter(letter: string) {
    return this.LETTER_TRANSFORM_MAP[letter];
  }

  /**
   * Transform turkish special letters to english
   * letters by using TURKISH_TO_ENGLISH_TRANSFORM_MAP
   * mapping table.
   * @param {string} letter
   * @returns {string}
   */
  clearLetter(letter: string) {
    return this.TURKISH_TO_ENGLISH_TRANSFORM_MAP[letter];
  }

  /**
 * Turkish lowercase.
 * @param {string, TurkishString} source
 * @returns {string}
 * @throws {Error}
 */
  toLowerCase(source: string) {
    return source.replace(this.LOWER_CASE_REGEX, this.transformLetter).toLowerCase();
  };

  /**
 * Turkish uppercase.
 * @param {string, TurkishString} source
 * @returns {string}
 * @throws {Error}
 */
  toUpperCase(source: string) {
    return source.replace(this.UPPER_CASE_REGEX, this.transformLetter).toUpperCase();
  };

  /**
  * Compare the given strings or TurkishString instances.
  * @param {string, TurkishString} source
  * @param {string, TurkishString} destination
  * @returns {number} standard js comparison result: -1, 0, 1
  * @throws {Error}
  */
  compare(source: string, destination: string) {
    let sourceStr: string = source;
    let destinationStr: string = destination;
    if (sourceStr !== destinationStr) {
      var sourceCharCode;
      var destinationCharCode;
      var maxLength = Math.max(sourceStr.length, destinationStr.length);
      for (var i = 0; i < maxLength; i++) {
        sourceCharCode = this.getCharCode(sourceStr.charAt(i));
        destinationCharCode = this.getCharCode(destinationStr.charAt(i));
        if (sourceCharCode === null) {
          return destinationCharCode === null ? this.COMPARISON_RESULT.EQUAL : this.COMPARISON_RESULT.LESS_THAN;
        }
        else if (destinationCharCode === null) {
          return this.COMPARISON_RESULT.GREATER_THAN;
        }
        else if (sourceCharCode !== destinationCharCode) {
          return (sourceCharCode - destinationCharCode < 0 ? this.COMPARISON_RESULT.LESS_THAN : this.COMPARISON_RESULT.GREATER_THAN);
        }
      }
    }
    return this.COMPARISON_RESULT.EQUAL;
  };

  /**
 * Is source greater than destination?
 * @param {string, TurkishString} source
 * @param {string, TurkishString} destination
 * @returns {boolean}
 * @throws {Error}
 */
  isGreaterThan(source: any, destination: any) {
    return this.compare(source, destination) === this.COMPARISON_RESULT.GREATER_THAN;
  };

  /**
 * Is source less than destination?
 * @param {string, TurkishString} source
 * @param {string, TurkishString} destination
 * @returns {boolean}
 * @throws {Error}
 */
  isLessThan =  (source:any, destination:any) => {
    return this.compare(source, destination) === this.COMPARISON_RESULT.LESS_THAN;
  };
}
