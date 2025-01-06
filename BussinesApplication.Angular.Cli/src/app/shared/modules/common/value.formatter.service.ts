import { Injectable } from '@angular/core';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
import * as moment from 'moment';
import 'moment/locale/tr';

@Injectable()
export class ValueFormatterService {
  getDurationStringFromSeconds(durationInSeconds: number) {
    let hours = Math.floor(durationInSeconds / 3600);
    durationInSeconds %= 3600;
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = durationInSeconds % 60;

    if (hours == 0) {
      return hours + " saat " + minutes + " dak. " + seconds + " san.";
    }
    return hours + " saat " + minutes + " dak. " + seconds + " san.";
  }
  getDDMMYYYYhhmmssFormatStringFromYYYYMMDDhhmmssKKKKKKFormatString(dateValue: string) {
    // dateValue is "YYYY-MM-DDThh:mm:ss+03:00"
    if (dateValue != null && dateValue != undefined && dateValue.length > 0) {
      return moment.utc(dateValue).local().format("DD.MM.YYYY HH:mm:ss");
    }
    else {
      return '';
    }
  }
  getDDMMYYYYhhmmssFormatStringFromYYYYMMDDhhmmssUTCFormatString(dateInUtc: string) {
    // dateInUtc is like: "YYYY-MM-DD hh:mm:ss" in UTC
    return moment(dateInUtc.replace(' ', 'T') + '+00:00').local().format("DD.MM.YYYY hh:mm:ss");
  }
  getDateDDMMYYYYFormat(dateValue: string) {
    if (dateValue != null && dateValue != undefined && dateValue.length > 0) {
      return moment.utc(dateValue).local().format("DD.MM.YYYY");
    }
    else {
      return '';
    }
  }
  getDateDDMMYYYYhhmmFormat(dateValue: string) {
    if (dateValue != null && dateValue != undefined && dateValue.length > 0) {
      return moment.utc(dateValue).local().format("DD.MM.YYYY HH:mm");
    }
    else {
      return '';
    }
  }
  getDateDDMMYYYYFormatFromDate(date: Date) {
    if (date != null && date != undefined) {
      return moment.utc(date).local().format("DD.MM.YYYY");
    }
    else {
      return '';
    }
  }

  getYYYYMMDDhhmmssKKKKKKFormatStringFromDDMMYYYYFormatString(dateDDMMYYYY: string) {
    let day = dateDDMMYYYY.substring(0, 2);
    let month = dateDDMMYYYY.substring(3, 5);
    let year = dateDDMMYYYY.substring(6, 10);
    return moment.utc(year + "-" + month + "-" + day).local().format();
  }

  parseDoubleValueFromTrString(numberInTr: string): number {
    var resultNumber = 0;
    if ((numberInTr == null || numberInTr == undefined || numberInTr == '')) {
      return resultNumber;
    }
    var splitByComma = numberInTr.split(',');
    if (splitByComma.length == 1) {
      var resultNumberIntegerPart: number = 0;
      var resultNumberIntegerPartString = splitByComma[0];

      if ((resultNumberIntegerPartString == null || resultNumberIntegerPartString == undefined || resultNumberIntegerPartString == '')) {
        resultNumberIntegerPart = 0;
      }
      else {
        resultNumberIntegerPart = parseInt(resultNumberIntegerPartString.replace('.', '').replace('.', '').replace('.', ''));
      }
      resultNumber = resultNumberIntegerPart;
      return resultNumber;
    }
    else {
      var resultNumberIntegerPart: number = 0;
      var resultNumberIntegerPartString = splitByComma[0];
      var resultNumberDecimalPart: number = 0;
      var resultNumberDecimalPartString = splitByComma[1];

      if ((resultNumberIntegerPartString == null || resultNumberIntegerPartString == undefined || resultNumberIntegerPartString == '')) {
        resultNumberIntegerPart = 0;
      }
      else {
        resultNumberIntegerPart = parseInt(resultNumberIntegerPartString.replace('.', '').replace('.', '').replace('.', ''));
      }
      if ((resultNumberDecimalPartString == null || resultNumberDecimalPartString == undefined || resultNumberDecimalPartString == '')) {
        resultNumberDecimalPart = 0;
      }
      else {
        resultNumberDecimalPart = parseFloat('0.' + resultNumberDecimalPartString);
      }
      resultNumber = resultNumberIntegerPart + resultNumberDecimalPart;
      return resultNumber;
    }
  }

  toDecimalNumberStringFromFloat(floatNumberValue: number, fractionSize: number = 2, decimalSeparator: string = ",", thousandsSeparator: string = ".", prefix: string = '', suffix: string = ''): string {
    var resultDecimalNumberString = "0,00";
    if (fractionSize == 0) {
      resultDecimalNumberString = "0";
    }
    if (floatNumberValue == 0) {
      return resultDecimalNumberString;
    }
    else {
      var PADDING: string = "0000";

      // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
      // https://stackoverflow.com/questions/628637/best-data-type-for-storing-currency-values-in-a-mysql-database

      let [integer, fraction = ""] = (floatNumberValue || "").toString().split(".");

      fraction = fractionSize > 0
        ? decimalSeparator + (fraction + PADDING).substring(0, fractionSize)
        : "";

      integer = integer.replace(thousandsSeparator, "");
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

      return prefix + integer + fraction + suffix;
    }
  }
}
