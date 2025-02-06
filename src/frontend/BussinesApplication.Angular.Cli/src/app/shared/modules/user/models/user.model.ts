import { Injectable } from "@angular/core";

@Injectable()
export class ApplicationUser {
  role: string = "";
  appCode: number = 0;
  userName: string = "";
  email: string = "";
}

@Injectable()
export class IdentityUserClaim {
  id: number = 0;
  
  userId: string = "";
  claimType: string = "";
  claimValue: string = "";
}
