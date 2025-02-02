import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http'; // HttpClientModule'ı içe aktarın
import { CommonModule } from '@angular/common';  // CommonModule'ü import et
import { RouterModule} from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SalesOrderModule } from './shared/modules/sales/order/order.module';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { BidiModule } from '@angular/cdk/bidi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './sidebar/sidebar.module';
import { ContentModule } from './content/content.module';
import { SidebarRoutes } from './sidebar/sidebar.routing';
import { AppRoutes } from './app.routing';
import { AppHomeComponent } from './home/app-home.component';
import { CoreDataModule } from './coredata/coredata.module';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({

  declarations: [
    AppComponent,
    AppHomeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    CommonModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    MatProgressBarModule,
    BidiModule,
    SalesOrderModule,
    SidebarModule,
    ContentModule,
    RouterModule.forRoot(AppRoutes),
    CoreDataModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
/*  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // CUSTOM_ELEMENTS_SCHEMA ekle*/
})
export class AppModule { }
