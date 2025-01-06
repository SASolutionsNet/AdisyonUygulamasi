import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { PricePipeTr } from "./price-tr.pipe";

// https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976

@Directive({ selector: "[price-formatter-tr]" })
export class PriceFormatterDirectiveTr implements OnInit {

    private el: any;

    constructor(
        private elementRef: ElementRef,
        private pricePipe: PricePipeTr
    ) {
        this.el = this.elementRef.nativeElement;

    }

    ngOnInit() {
        this.el.value = this.pricePipe.transform(this.el.value);
    }

    //@HostListener("focus", ["$event.target.value"])
    //onFocus(value) {
    //    this.el.value = this.pricePipe.parse(value); // opossite of transform
    //}

    //@HostListener("blur", ["$event.target.value"])
    //onBlur(value) {
    //    this.el.value = this.pricePipe.transform(value);
    //}

}
