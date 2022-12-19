import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../auth/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
              private router:Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    //valido el token' da true o false
    //Si tiene token valido carga los modulos de manera peresoza
    console.log("PROBLEMA DE CANLOAD");
      return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if(!estaAutenticado){
            //lo retorno al login si da false o no esta autenticado
            this.router.navigateByUrl('/login');
          }
        })
      )
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
    //valido el token' da true o false
    console.log("PROBLEMA DE CANACTIVATE");
    return this.usuarioService.validarToken()
              .pipe(
                tap(estaAutenticado => {
                  if(!estaAutenticado){
                    //lo retorno al login si da false o no esta autenticado
                    this.router.navigateByUrl('/login');
                  }
                })
              )
  }
  
}
