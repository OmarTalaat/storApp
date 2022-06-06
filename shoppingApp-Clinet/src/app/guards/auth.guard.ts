import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivate(next: ActivatedRouteSnapshot , state: RouterStateSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string> ;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['home']);
        this.alertify.error('You are not authorized to access this area');

      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }
    else{
      this.router.navigate(['/home']);
      this.alertify.error('You shall not pass!!!');
      return false;
    }


  }

}
