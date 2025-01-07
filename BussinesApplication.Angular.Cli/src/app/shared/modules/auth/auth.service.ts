import { Injectable, EventEmitter } from '@angular/core';

/*import { environment } from '../../../../environments/environment';*/

const settings: any = {
/*  authority: environment.urls.identityserver,*/
  client_id: "webapp.aysanraf.com",
  redirect_uri: window.location.protocol + "//" + window.location.host + "/callback.html",
  post_logout_redirect_uri: window.location.protocol + "//" + window.location.host,

  // these two will be done dynamically from the buttons clicked, but are
  // needed if you want to use the silent_renew
  response_type: "id_token token",
  scope: "openid profile email tenant.profile netakil.popsep.web.api.fullaccess",

  // this will toggle if profile endpoint is used
  loadUserInfo: true,

  // silent renew will get a new access_token via an iframe 
  // just prior to the old access_token expiring (60 seconds prior)
  silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/silent.html",
  automaticSilentRenew: true,

  // will revoke (reference) access tokens at logout time
  revokeAccessTokenOnSignout: true,

  // this will allow all the OIDC protocol claims to be visible in the window. normally a client app 
  // wouldn't care about them or want them taking up space
  filterProtocolClaims: false

  // IMPORTANT: 2021-03-21 for new tab opening
 /* , userStore: new WebStorageStateStore({ store: window.localStorage })*/
};

@Injectable()
export class AuthService {
  //mgr: UserManager = new UserManager(settings);
  //userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  //currentUser: User;
  //loggedIn: boolean = false;

  //authHeaders: Headers;

  constructor() {
    //if (!environment.production) {
    //  console.log("auth.service.constructor called");
    //}
    //this.mgr.events.addUserLoaded((user) => {
    //  if (!environment.production) {
    //    console.log("auth.service.mgr.events.UserLoaded: user: ", user);
    //  }
    //  if (user) {
    //    this.loggedIn = true;
    //  }
    //  else {
    //    this.loggedIn = false;
    //  }
    //  this.currentUser = user;
    //  this.userLoadededEvent.emit(user);
    //});

    //this.mgr.events.addUserUnloaded((e) => {
    //  if (!environment.production) {
    //    console.log("auth.service.mgr.events.UserUnloaded");
    //  }
    //  this.loggedIn = false;
    //  this.currentUser = null;
    //  this.userLoadededEvent.emit(null);
    //});

    //this.mgr.events.addUserSignedOut((e) => {
    //  if (!environment.production) {
    //    console.log("auth.service.mgr.events.addUserSignedOut");
    //  }
    //  this.loggedIn = false;
    //  this.currentUser = null;
    //  this.userLoadededEvent.emit(null);
    //  this.removeUser();
    //});

    //this.getUser();
  }

  getUserId() {
    //if (this.currentUser) {
    //  if (this.currentUser.profile) {
    //    return this.currentUser.profile.sub;
    //  }
    //}
    return null;
  }

  //isLoggedIn(): Observable<boolean> {
  //  return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
  //    if (user && !user.expired) {
  //      return true;
  //    } else {
  //      return false;
  //    }
  //  });
  //}

  getUser() {
    //if (!environment.production) {
    //  console.log("auth.service.getUser() called");
    //}
    //this.mgr.getUser()
    //  .then((user) => {
    //    if (user) {
    //      if (!environment.production) {
    //        console.log("auth.service.getUser(): user: ", user);
    //      }
    //      this.loggedIn = true;
    //      this.currentUser = user;
    //      this.userLoadededEvent.emit(user);
    //    }
    //    else {
    //      if (!environment.production) {
    //        console.log("auth.service.getUser(): user: ", user);
    //      }
    //      this.loggedIn = false;
    //      this.currentUser = null;
    //      this.userLoadededEvent.emit(null);
    //    }
    //  })
    //  .catch((err) => {
    //    console.log("auth.service.getUser().exception: err: ", err);
    //    this.loggedIn = false;
    //    this.currentUser = null;
    //    this.userLoadededEvent.emit(null);
    //  });
  }

  //getUserManager(): UserManager {
  //  return this.mgr;
  //}

  signInSilent() {
    //if (!environment.production) {
    //  console.log("auth.service.signInSilent() called");
    //}
    //this.mgr.signinSilent()
    //  .then(function (user) {
    //    if (user) {
    //      if (!environment.production) {
    //        console.log("auth.service.signInSilent(): user: ", user);
    //      }
    //    }
    //    else {
    //      if (!environment.production) {
    //        console.log("auth.service.signInSilent(): user: ", user);
    //      }
    //    }

    //  }).catch(function (err) {
    //    console.log("auth.service.signInSilent().exception: err: ", err);
    //  });
  }

  clearState() {
    //this.mgr.clearStaleState().then(function () {
    //  console.log("auth.service.clearState(): success");
    //}).catch(function (e) {
    //  console.log("auth.service.clearState(): error: ", e);
    //});
  }

  removeUser() {
    //this.mgr.removeUser().then(() => {
    //  this.loggedIn = false;
    //  this.currentUser = null;
    //  this.userLoadededEvent.emit(null);
    //  if (!environment.production) {
    //    console.log("auth.service.removeUser(): success");
    //  }
    //}).catch(function (err) {
    //  console.log("auth.service.removeUser().exception: err: ", err);
    //});
  }

  startSigninMainWindow() {
    //this.mgr.signinRedirect({ data: 'some data' }).then(function () {
    //  console.log('auth.service.startSigninMainWindow()');
    //}).catch(function (err) {
    //  console.log("auth.service.startSigninMainWindow().exception: err: ", err);
    //});
  }

  endSigninMainWindow() {
    //this.mgr.signinRedirectCallback().then(function (user) {
    //  console.log('auth.service.endSigninMainWindow(): user: ' + user);
    //}).catch(function (err) {
    //  console.log("auth.service.endSigninMainWindow().exception: err: ", err);
    //});
  }

  startSignoutMainWindow() {
    //this.mgr.signoutRedirect().then(function (resp) {
    //  console.log('auth.service.startSignoutMainWindow(): resp: ' + resp);
    //}).catch(function (err) {
    //  console.log("auth.service.startSignoutMainWindow().exception: err: ", err);
    //});
  };

  endSignoutMainWindow() {
    //this.mgr.signoutRedirectCallback().then(function (resp) {
    //  if (!environment.production) {
    //    console.log("auth.service.endSignoutMainWindow(): resp: ", resp);
    //  }
    //}).catch(function (err) {
    //  console.log("auth.service.endSignoutMainWindow().exception: err: ", err);
    //});
  };


  isPowerUser() {
    //if (this.currentUser) {
    //  if (this.currentUser.profile) {
    //    if (this.currentUser.profile.role) {
    //      if (Array.isArray(this.currentUser.profile.role)) {
    //        for (var ur = 0; ur < this.currentUser.profile.role.length; ++ur) {
    //          let userRole = this.currentUser.profile.role[ur];

    //          if (userRole == 'power.user') {
    //            return true;
    //          }
    //        }
    //      }
    //      else {
    //        // if there is only 1 role, identity server returns not array, it returns single string
    //        var userRole = this.currentUser.profile.role;

    //        if (userRole == 'power.user') {
    //          return true;
    //        }
    //      }
    //    }
    //  }
    //}

    return false;
  }

  hasRoleClaim(roleClaimName: string) {
    //if (this.currentUser) {
    //  if (this.currentUser.profile) {
    //    if (this.currentUser.profile.role) {
    //      if (Array.isArray(this.currentUser.profile.role)) {
    //        for (var ur = 0; ur < this.currentUser.profile.role.length; ++ur) {
    //          let userRole = this.currentUser.profile.role[ur];

    //          if (userRole == roleClaimName) {
    //            return true;
    //          }
    //        }
    //      }
    //      else {
    //        // if there is only 1 role, identity server returns not array, it returns single string
    //        var userRole = this.currentUser.profile.role;

    //        if (userRole == roleClaimName) {
    //          return true;
    //        }
    //      }
    //    }
    //  }
    //}

    return false;
  }

  isUserAllowed(moduleName: string, virtualPath: string) {
    //if (this.currentUser) {
    //  if (this.currentUser.profile) {
    //    if (this.currentUser.profile.role) {
    //      for (var m = 0; m < AuthorizedModulesRoles.length; ++m) {
    //        var authorizedModuleRole = AuthorizedModulesRoles[m];

    //        if (moduleName == authorizedModuleRole.modulename && virtualPath == authorizedModuleRole.virtualpath) {

    //          if (Array.isArray(this.currentUser.profile.role)) {
    //            for (var ur = 0; ur < this.currentUser.profile.role.length; ++ur) {
    //              let userRole = this.currentUser.profile.role[ur];

    //              if (authorizedModuleRole.roles.indexOf(userRole) != -1) {
    //                return true;
    //              }
    //            }
    //          }
    //          else {
    //            // if there is only 1 role, identity server returns not array, it returns single string
    //            let userRole = this.currentUser.profile.role;

    //            if (authorizedModuleRole.roles.indexOf(userRole) != -1) {
    //              return true;
    //            }
    //          }
    //        }
    //      }
    //      return false;
    //    }
    //    else {
    //      return false;
    //    }
    //  }
    //  else {
    //    return false;
    //  }
    //}
    //else {
    //  return false;
    //}
  }

  isUserAllowedPath(url: string) {
    //if (this.currentUser) {
    //  if (this.currentUser.profile) {
    //    if (this.currentUser.profile.role) {
    //      for (var m = 0; m < AuthorizedModulesRoles.length; ++m) {
    //        var authorizedModuleRole = AuthorizedModulesRoles[m];

    //        if (('/' + authorizedModuleRole.modulename + '/' + authorizedModuleRole.virtualpath) == url) {

    //          if (Array.isArray(this.currentUser.profile.role)) {
    //            for (var ur = 0; ur < this.currentUser.profile.role.length; ++ur) {
    //              let userRole = this.currentUser.profile.role[ur];

    //              if (authorizedModuleRole.roles.indexOf(userRole) != -1) {
    //                return true;
    //              }
    //            }
    //          }
    //          else {
    //            // if there is only 1 role, identity server returns not array, it returns single string
    //            let userRole = this.currentUser.profile.role;

    //            if (authorizedModuleRole.roles.indexOf(userRole) != -1) {
    //              return true;
    //            }
    //          }
    //        }
    //      }
    //      return false;
    //    }
    //    else {
    //      return false;
    //    }
    //  }
    //  else {
    //    return false;
    //  }
    //}
    //else {
    //  return false;
    //}
  }

  isUserAllowedForRoute(allowedRoleListForGivenRoute: string[]) {
    //if (this.currentUser) {
    //  if (this.currentUser.profile) {
    //    if (this.currentUser.profile.role) {
    //      if (allowedRoleListForGivenRoute) {
    //        for (var m = 0; m < allowedRoleListForGivenRoute.length; ++m) {
    //          var allowedRoleForGivenRoute = allowedRoleListForGivenRoute[m];

    //          if (Array.isArray(this.currentUser.profile.role)) {
    //            for (var ur = 0; ur < this.currentUser.profile.role.length; ++ur) {
    //              let userRole = this.currentUser.profile.role[ur];

    //              if (allowedRoleForGivenRoute.indexOf(userRole) != -1) {
    //                return true;
    //              }
    //            }
    //          }
    //          else {
    //            // if there is only 1 role, identity server returns not array, it returns single string
    //            let userRole = this.currentUser.profile.role;

    //            if (allowedRoleForGivenRoute.indexOf(userRole) != -1) {
    //              return true;
    //            }
    //          }
    //        }
    //      }
    //      return false;
    //    }
    //    else {
    //      return false;
    //    }
    //  }
    //  else {
    //    return false;
    //  }
    //}
    //else {
    //  return false;
    //}
  }
}

const AuthorizedModulesRoles = [
  {
    modulename: 'dashboard',
    virtualpath: '',
    roles: ['standart.user']
  },
  {
    modulename: 'coredata',
    virtualpath: 'party/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'party/create',
    roles: ['power.user', 'it.manager', 'coredata.party.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'party/update',
    roles: ['power.user', 'it.manager', 'coredata.party.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/list',
    roles: ['power.user', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/create',
    roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/update',
    roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/supplier/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/supplier/create',
    roles: ['power.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/feature/create',
    roles: ['power.user', 'coredata.ps.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/feature/update',
    roles: ['power.user', 'coredata.ps.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'pscategory/feature/delete',
    roles: ['power.user', 'coredata.psfeature.delete']
  },
  {
    modulename: 'coredata',
    virtualpath: 'ps/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'ps/create',
    roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'ps/update',
    roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'ps/price/create',
    roles: ['power.user', 'it.manager', 'project.manager', 'sales.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'ps/price/update',
    roles: ['power.user', 'it.manager', 'project.manager', 'sales.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'facility/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'facility/create',
    roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'facility/update',
    roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'facility/storage/create',
    roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'facility/storage/update',
    roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager']
  },
  {
    modulename: 'coredata',
    virtualpath: 'asset/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'coredata',
    virtualpath: 'asset/create',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'coredata',
    virtualpath: 'asset/update',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'coredata',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'coredata.admin']
  },
  {
    modulename: 'coredata',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'coredata.admin']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/pscategory/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/pscategory/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/salesperson/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'supplier/salesperson/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/list',
    roles: ['power.user', 'it.manager', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/list/my',
    roles: ['power.user', 'it.manager', 'standart.user']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/create',
    roles: ['power.user', 'it.manager', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/update',
    roles: ['power.user', 'it.manager', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/view',
    roles: ['power.user', 'it.manager', 'standart.user', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/state/approve',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/state/rfq',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user']
  },
  {
    modulename: 'procurement',
    virtualpath: 'request/state/bid',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'rfq/bid/state/waiting',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'rfq/bid/state/given',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'rfq/bid/item/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'rfq/bid/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'rfq/bid/view',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'po/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'po/item/state/ordered',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'po/item/history/ps',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'po/item/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager']
  },
  {
    modulename: 'procurement',
    virtualpath: 'report/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'sales.director']
  },
  {
    modulename: 'procurement',
    virtualpath: 'report/supplier-grouped-rfqbid-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'sales.director']
  },
  {
    modulename: 'procurement',
    virtualpath: 'report/rfq-grouped-rfqbid-po-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'sales.director']
  },
  {
    modulename: 'procurement',
    virtualpath: 'report/ps-supplier-grouped-poitem-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'sales.director']
  },
  {
    modulename: 'procurement',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.admin']
  },
  {
    modulename: 'procurement',
    virtualpath: 'settings/users/notification',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.admin']
  },
  {
    modulename: 'procurement',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.admin']
  },
  {
    modulename: 'sales',
    virtualpath: 'customer/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'customer/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager']
  },
  {
    modulename: 'sales',
    virtualpath: 'customer/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager']
  },
  {
    modulename: 'sales',
    virtualpath: 'customer/contactperson/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager']
  },
  {
    modulename: 'sales',
    virtualpath: 'customer/contactperson/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/list/state/draft',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/list/state/rejected',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/list/state/revize',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'customermeetingform/list/state/offer',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'psprice/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'project.designer', 'project.manager', 'sales.user', 'sales.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'project.designer', 'project.manager', 'sales.user', 'sales.manager', 'sales.director', 'production.planner']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/clone',
    roles: ['power.user', 'it.manager', 'management.ceo', 'project.designer', 'project.manager', 'sales.user', 'sales.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/design',
    roles: ['power.user', 'it.manager', 'management.ceo', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/sales',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/draft',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/technical-calculation',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/review',
    roles: ['power.user', 'it.manager', 'management.ceo', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/finalize',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/ready',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/customer-review',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/customer-accepted',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/customer-approval',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/customer-approved',
    roles: ['power.user', 'it.manager', 'management.ceo', 'project.designer', 'sales.user', 'sales.manager', 'project.manager', 'sales.director', 'production.planner']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/customer-rejected',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/customer-revision',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/canceled',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'offer/list/state/order',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'sales',
    virtualpath: 'order/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'order/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'order/payments',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/company-revenue-graph-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/company-revenue-monthly-graph-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/salesperson-revenue-graph-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/salesperson-revenue-table-monthly-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/ps-grouped-revenue-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/state-grouped-revenue-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/country-grouped-revenue-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'report/customer-grouped-revenue-table-in-selected-year',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director']
  },
  {
    modulename: 'sales',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.admin']
  },
  {
    modulename: 'sales',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.admin']
  },
  {
    modulename: 'production',
    virtualpath: 'tasktype/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'tasktype/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'tasktype/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'pscategory/tasktype',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'pscategory/tasktype/delete',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'pscategory/qcmeasurementparameter',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'pscategory/qcmeasurementparameter/delete',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'pscategory/qccode',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'pscategory/qccode/delete',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'asset/tasktype',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'asset/tasktype/delete',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'user/tasktype',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'user/tasktype/delete',
    roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'order/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager',
      'production.planner', 'production.manager', 'production.qc',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'order/plan',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director',
      'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/created',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/planned',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/started',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/revision-sales',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/revision-review',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/revision-finalize',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/revision-plan',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/completed',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/cancel-requested',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/state/canceled',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/progress',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director',
      'project.designer', 'project.manager',
      'production.user', 'production.planner',
      'production.manager', 'production.qc', 'production.director',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/progress/tasks',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director',
      'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'shipment.user', 'shipment.planner', 'shipment.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'order/list/progress/amounts-todo-instorage-loaded-sent',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director',
      'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'shipment.user', 'shipment.planner', 'shipment.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'task/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager', 'sales.director',
      'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'shipment.user', 'shipment.planner', 'shipment.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'task/view',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.user', 'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'taskactivity/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'production',
    virtualpath: 'taskactivityqcmeasurement/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'report/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'report/salesorder-pscomponents-between-dates',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'report/salesorder-list-progress-milestone-tasks',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'report/salesorder-list-progress-milestone-tasks/report',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'report/pscategory-list-progress-tasks-pscomponents',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.director']
  },
  {
    modulename: 'production',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.admin']
  },
  {
    modulename: 'production',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.admin']
  },
  {
    modulename: 'inventory',
    virtualpath: 'order/list',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager'
    ]
  },
  {
    modulename: 'inventory',
    virtualpath: 'order/update',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager'
    ]
  },
  {
    modulename: 'inventory',
    virtualpath: 'order/list/progress/amounts-todo-instorage-loaded-sent',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager'
    ]
  },
  {
    modulename: 'inventory',
    virtualpath: 'po/item/state/ordered',
    roles: ['power.user', 'it.manager', 'management.ceo', 'inventory.user', 'inventory.manager',
      'production.planner', 'production.manager', 'production.qc'
    ]
  },
  {
    modulename: 'inventory',
    virtualpath: 'po/item/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'inventory.user', 'inventory.manager',
      'production.planner', 'production.manager', 'production.qc', 'production.director'
    ]
  },
  {
    modulename: 'inventory',
    virtualpath: 'po/item/pickup',
    roles: ['power.user', 'it.manager', 'management.ceo', 'inventory.user', 'inventory.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'task/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager',
      'production.user', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'shipment.user', 'shipment.planner', 'shipment.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/purchased',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/produced',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/type/purchased',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/type/produced',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/query',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/search',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/detail',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/update',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/split',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/state/in-storage-defective',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/state/in-storage-damaged',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/state/selected-for-shipment',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'item/list/state/sent-to-customer',
    roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user',
      'production.user', 'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'stockcountingactivity/create',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'stockcountingactivity/list',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager']
  },
  //{
  //  modulename: 'inventory',
  //  virtualpath: 'stockcountingactivity/detail',
  //  roles: ['power.user', 'it.manager', 'management.ceo',
  //    'production.planner', 'production.manager', 'production.qc',
  //    'procurement.user', 'procurement.manager',
  //    'inventory.user', 'inventory.manager']
  //},
  {
    modulename: 'inventory',
    virtualpath: 'report/list',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'report/ps-grouped-amount-price-table-in-storage',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'production.planner', 'production.manager', 'production.qc',
      'procurement.user', 'procurement.manager',
      'inventory.user', 'inventory.manager']
  },
  {
    modulename: 'inventory',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'inventory.admin']
  },
  {
    modulename: 'inventory',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'inventory.admin']
  },
  {
    modulename: 'shipment',
    virtualpath: 'order/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'order/list/progress/amounts-todo-instorage-loaded-sent',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'order/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'list',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'production.planner', 'production.manager', 'production.qc', 'production.director',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'create',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'shipment.user', 'shipment.planner']
  },
  {
    modulename: 'shipment',
    virtualpath: 'update',
    roles: ['power.user',
      'finance.user', 'accounting.user',
      'shipment.user', 'it.manager', 'management.ceo',
      'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'list/state/created',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'list/state/loaded',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'list/state/planned',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'list/state/sent',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'list/state/delivered',
    roles: ['power.user', 'it.manager', 'management.ceo',
      'finance.user', 'accounting.user',
      'production.planner', 'production.manager', 'production.qc',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'shipmentamountbasedplan/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'production.planner', 'production.manager', 'production.qc', 'production.director',
      'inventory.user', 'inventory.manager',
      'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'shipmentamountbasedplan/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'shipmentamountbasedplan/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'expenserecord/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'expenserecord/create',
    roles: ['power.user', 'it.manager', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'expenserecord/update',
    roles: ['power.user', 'it.manager', 'shipment.user', 'shipment.planner', 'shipment.manager']
  },
  {
    modulename: 'shipment',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.admin']
  },
  {
    modulename: 'shipment',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'shipment.admin']
  },
  {
    modulename: 'installation',
    virtualpath: 'user/tasktype/delete',
    roles: ['power.user', 'it.manager', 'installation.manager']
  },
  {
    modulename: 'installation',
    virtualpath: 'user/tasktype',
    roles: ['power.user', 'it.manager', 'installation.manager']
  },
  {
    modulename: 'installation',
    virtualpath: 'plan/employeetaskactivity',
    roles: ['power.user', 'it.manager', 'accounting.user', 'installation.planner', 'installation.manager']
  },
  {
    modulename: 'installation',
    virtualpath: 'expenserecord/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'installation.user', 'installation.planner', 'installation.manager']
  },
  {
    modulename: 'installation',
    virtualpath: 'expenserecord/create',
    roles: ['power.user', 'it.manager', 'installation.user', 'installation.planner', 'installation.manager']
  },
  {
    modulename: 'installation',
    virtualpath: 'expenserecord/update',
    roles: ['power.user', 'it.manager', 'installation.user', 'installation.planner', 'installation.manager']
  },
  {
    modulename: 'installation',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'installation.admin']
  },
  {
    modulename: 'installation',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'installation.admin']
  },
  {
    modulename: 'maintenance',
    virtualpath: 'task/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'maintenance.user', 'maintenance.manager']
  },
  {
    modulename: 'maintenance',
    virtualpath: 'task/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'maintenance.user', 'maintenance.manager']
  },
  {
    modulename: 'maintenance',
    virtualpath: 'task/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'maintenance.user', 'maintenance.manager']
  },
  {
    modulename: 'maintenance',
    virtualpath: 'taskactivity/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'maintenance.user', 'maintenance.manager']
  },
  {
    modulename: 'maintenance',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'maintenance.admin']
  },
  {
    modulename: 'installation',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'installation.admin']
  },
  {
    modulename: 'accounting',
    virtualpath: 'order/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager']
  },
  {
    modulename: 'accounting',
    virtualpath: 'order/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager']
  },
  {
    modulename: 'accounting',
    virtualpath: 'order/payments',
    roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.manager', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpensecategory/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpensecategory/create',
    roles: ['power.user', 'it.manager', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpensecategory/update',
    roles: ['power.user', 'it.manager', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpensetype/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpensetype/create',
    roles: ['power.user', 'it.manager', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpensetype/update',
    roles: ['power.user', 'it.manager', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpense/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpense/create',
    roles: ['power.user', 'it.manager', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'travelexpense/update',
    roles: ['power.user', 'it.manager', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'etacurrentbalance/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'etatrialbalance/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'report/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'report/company-eta-currentbalance-table',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'report/company-eta-trialbalance-table',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'report/company-eta-daily-case',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'report/salesorder-price-vs-expenserecord-cost-list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'report/salesorder-expenserecord-cost-list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'energycost/update',
    roles: ['power.user', 'it.manager', 'management.ceo', 'finance.user', 'accounting.user', 'accounting.manager', 'accounting.director']
  },
  {
    modulename: 'accounting',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'accounting.admin']
  },
  {
    modulename: 'accounting',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'accounting.admin']
  },
  {
    modulename: 'hr',
    virtualpath: 'employment/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'hr.user', 'hr.manager', 'hr.director']
  },
  {
    modulename: 'hr',
    virtualpath: 'employment/create',
    roles: ['power.user', 'it.manager', 'management.ceo', 'hr.user', 'hr.manager', 'hr.director']
  },
  {
    modulename: 'hr',
    virtualpath: 'employment/update',
    roles: ['power.user', 'management.ceo', 'hr.user', 'hr.manager', 'hr.director']
  },
  {
    modulename: 'hr',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'hr.admin']
  },
  {
    modulename: 'hr',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'hr.admin']
  },
  {
    modulename: 'it',
    virtualpath: 'tasktype/list',
    roles: ['power.user', 'it.manager']
  },
  {
    modulename: 'it',
    virtualpath: 'tasktype/create',
    roles: ['power.user', 'it.manager']
  },
  {
    modulename: 'it',
    virtualpath: 'tasktype/update',
    roles: ['power.user', 'it.manager']
  },
  {
    modulename: 'it',
    virtualpath: 'user/tasktype/delete',
    roles: ['power.user', 'it.manager']
  },
  {
    modulename: 'it',
    virtualpath: 'user/tasktype',
    roles: ['power.user', 'it.manager']
  },
  {
    modulename: 'it',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.admin']
  },
  {
    modulename: 'it',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.admin']
  },
  {
    modulename: 'management',
    virtualpath: 'report/list',
    roles: ['power.user', 'it.manager', 'management.ceo']
  },
  {
    modulename: 'management',
    virtualpath: 'settings/users/list',
    roles: ['power.user', 'it.manager', 'management.ceo', 'management.admin']
  },
  {
    modulename: 'management',
    virtualpath: 'settings/users/roles',
    roles: ['power.user', 'it.manager', 'management.ceo', 'management.admin']
  }
];
