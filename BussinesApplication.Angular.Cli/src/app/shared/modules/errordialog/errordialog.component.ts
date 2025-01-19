
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sasolution-errordialog',
    templateUrl: './errordialog.component.html',
    styleUrls: ['./errordialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

    @Input() returnCode: string = "";
    @Input() status: string = "";
    @Input() message: string = "";
    @Input() title: string = "Hata / Sorun";

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
        this.cdRef.detectChanges();
    }

    public setContent(title: string, status: string, returnCode: string, message: string) {
        this.title = title;
        this.status = status;
        this.returnCode = returnCode;
        this.message = message;
    }
}
