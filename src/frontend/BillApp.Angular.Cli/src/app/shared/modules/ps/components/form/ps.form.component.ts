import { AfterViewChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'sasolution-ps-form',
  templateUrl: './ps.form.component.html',
  styleUrls: ['./ps.form.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PSFormComponent implements OnInit, AfterViewChecked {
    ngAfterViewChecked(): void {
      console.log('ngAfterViewChecked çalıştı');
    }
    ngOnInit(): void {
      console.log('ngOnInit çalıştı');
    }
 
}
