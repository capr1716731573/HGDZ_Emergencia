import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioService } from '../auth/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
              private router:Router){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
    //valido el token' da true o false
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
