import { Injectable } from "@angular/core";


@Injectable()
export class BaseEntity {
    stateId: string = "";
    isDeleted: boolean = false;
    createdDate: string = "";
    createdUserId: string = "";
    updatedDate: string = "";
    updatedUserId: string = "";
}
