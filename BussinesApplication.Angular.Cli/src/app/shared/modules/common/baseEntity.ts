import { Injectable } from '@angular/core';

@Injectable()
export class BaseEntity {
    stateId: string = null;
    isDeleted: boolean = false;
    createdDate: string = null;
    createdUserId: string = null;
    updatedDate: string = null;
    updatedUserId: string = null;
}
