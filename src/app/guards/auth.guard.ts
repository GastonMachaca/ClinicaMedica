import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router)
  {

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Promise<boolean | UrlTree> {

      const user  = await this.auth.getUsuarioLogueado();
      console.log(user);
      const isLogged = user? true : false;

      if(!isLogged)
      {
        this.router.navigate(['/login']);
        return false;
      }
      else
      {
        return true;
      }
  }
  
}
