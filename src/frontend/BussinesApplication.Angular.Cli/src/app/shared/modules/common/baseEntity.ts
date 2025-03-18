import { Injectable } from "@angular/core";


@Injectable()
export class BaseEntity {

    id: string = "";
    isDel: boolean = false;
  createdDate: string |Date = "";
    createdUser: string = "";
    updatedDate: string = "";
    updatedUser: string = "";
}
