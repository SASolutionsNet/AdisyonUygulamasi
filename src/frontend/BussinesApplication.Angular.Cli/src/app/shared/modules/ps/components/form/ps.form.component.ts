import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sasolution-ps-form',
  templateUrl: './ps.form.component.html',
  styleUrls: ['./ps.form.component.scss']
})
export class PSFormComponent implements OnInit, AfterViewChecked {
    ngAfterViewChecked(): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
