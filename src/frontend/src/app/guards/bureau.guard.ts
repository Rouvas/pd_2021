import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class BureauGuard implements CanActivate {

  constructor(private router: Router ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const obj = jwt_decode(localStorage.getItem('accessToken'));
    // @ts-ignore
    const role = obj.role;

    if (role === 'bureau') {
      return true;
    }
    else {
      this.router.navigate(['404']);
    }

  }

}
