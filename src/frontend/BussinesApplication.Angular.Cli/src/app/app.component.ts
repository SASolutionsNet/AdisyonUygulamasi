import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { RouterModule } from "@angular/router";


  @Component({
    selector: 'app-root',
    standalone: true,
    template: `<router-outlet></router-outlet>`,  // Burada router-outlet kullanılır
    imports: [RouterModule],  // RouterModule'i imports dizisine ekleyin
  })
export class AppComponent {
  title = 'SASOLUTIONNET ';
}
