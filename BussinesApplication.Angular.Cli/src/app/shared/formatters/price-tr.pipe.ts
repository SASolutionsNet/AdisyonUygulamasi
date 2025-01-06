import { Pipe, PipeTransform } from "@angular/core";

// https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976

const PADDING = "0000";

@Pipe({ name: "price-pipe-tr" })
export class PricePipeTr implements PipeTransform {

    private PREFIX: string
    private DECIMAL_SEPARATOR: string;
    private THOUSANDS_SEPARATOR: string;
    private SUFFIX: string

    constructor() {
        // TODO comes from configuration settings
        this.PREFIX = ''
        this.DECIMAL_SEPARATOR = ",";
        this.THOUSANDS_SEPARATOR = ".";
        this.SUFFIX = ''
    }

    transform(value: string, fractionSize: number = 2): string {
        // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
        // https://stackoverflow.com/questions/628637/best-data-type-for-storing-currency-values-in-a-mysql-database

        let [integer, fraction = ""] = (value || "").toString()
            .split(this.DECIMAL_SEPARATOR);

        fraction = fractionSize > 0
            ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
            : "";

        integer = integer.replace(this.THOUSANDS_SEPARATOR, "");
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

        return this.PREFIX + integer + fraction + this.SUFFIX;

        // return value.toLocaleString("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2 });
    }

    parse(value: string, fractionSize: number = 2): string {
        let [integer, fraction = ""] = (value || "").replace(this.PREFIX, "")
            .replace(this.SUFFIX, "")
            .split(this.DECIMAL_SEPARATOR);

        //integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");
        integer = integer.replace(this.THOUSANDS_SEPARATOR, "");

        fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
            ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
            : "";

        return integer + fraction;
    }

}