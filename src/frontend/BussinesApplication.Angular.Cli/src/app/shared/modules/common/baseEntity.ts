import { Injectable } from "@angular/core";


@Injectable()
export class BaseEntity {

    id: string = "";
    isDel: boolean = false;
    createdDate: string = "";
    createdUser: string = "";
    updatedDate: string = "";
    updatedUser: string = "";
}
