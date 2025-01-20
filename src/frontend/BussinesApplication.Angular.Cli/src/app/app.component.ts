import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { RouterModule } from "@angular/router";


//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.scss'],
//  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Burada CUSTOM_ELEMENTS_SCHEMA ekleniyor
//})
  @Component({
    selector: 'app-root',
    standalone: true,
    template: `<router-outlet></router-outlet>`,  // Burada router-outlet kullanılır
    imports: [RouterModule],  // RouterModule'i imports dizisine ekleyin
  })
export class AppComponent {
  title = 'SASOLUTOINNET ';
}
