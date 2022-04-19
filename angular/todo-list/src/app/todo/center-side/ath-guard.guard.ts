import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AthGuardGuard implements CanActivate {
  user: any;
  role: any;
  dmPermission: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token: any = localStorage.getItem('idToken');
    const decoded = atob(token.split('.')[1]);
    const parsed = JSON.parse(decoded);

    if (parsed.roles[0] === 'ADMIN') {
      return true;
    }

    return this.router.navigateByUrl('/todo');
  }
}
