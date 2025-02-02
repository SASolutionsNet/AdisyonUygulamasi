import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, OnInit, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'sasolution-ps-form',
  templateUrl: './ps.form.component.html',
  styleUrls: ['./ps.form.component.scss'],
  imports: [CommonModule,MatCheckboxModule,MatFormFieldModule, MatInputModule,  MatSelectModule, MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PSFormComponent implements OnInit, AfterViewChecked {

  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);


  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked çalıştı');
  }
  ngOnInit(): void {
    console.log('ngOnInit çalıştı');
  }
  kategoriler = [
    { id: 1, kod: 'A001', FAV: false },
    { id: 2, kod: 'B002', FAV: false },
    { id: 3, kod: 'C003', FAV: false }
  ];

}
