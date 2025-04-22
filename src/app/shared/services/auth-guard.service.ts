import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="admin"){
      this.router.navigate(["/admin-dashboard"]);
      return false;
    }else{
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="admin"){
      return true;
    }else{
      this.router.navigate(["/admin-login"]);
      return false;
    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardService {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    console.log("The role is" +role)
    if(role=="seller"){
      this.router.navigate(["/seller-dashboard"]);
      return false;
    }else if(role=="buyer"){
      this.router.navigate(["/buyer-dashboard"]);
      return false;
    }else{
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="buyer"){
      return true;
    }else{
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="seller"){
      return true;
    }else{
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
