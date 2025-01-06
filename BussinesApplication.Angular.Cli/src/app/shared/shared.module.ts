import { NgModule } from "@angular/core";

import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//import { PlannedListComponent } from "./modules/planned/components/list/planned.list.component";
//import { RealizedListComponent } from "./modules/realized/components/list/realized.list.component";
//import { PlannedFormComponent } from "./modules/planned/components/form/planned.form.component";
//import { RealizedFormComponent } from "./modules/realized/components/form/realized.form.components";

//import { PlannedRealizedComparisonComponent } from "./modules/plannedrealizedComparison/components/list/plannedrealizedcomparison.list.component";


@NgModule({
  providers: [DatePipe],
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    FormsModule,
  ],

  declarations: [
  //  PlannedListComponent,
  //  RealizedListComponent,
  //  PlannedFormComponent,
  //  RealizedFormComponent,
   /* PlannedRealizedComparisonComponent*/
  ],
  exports: [
    //PlannedListComponent,
    //RealizedListComponent,
    //PlannedFormComponent,
    //RealizedFormComponent,
   /* PlannedRealizedComparisonComponent*/

  ]
})
export class SharedModule { }
