import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from './register/register-interface';

const baseUrl= environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router) { }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${baseUrl}/usuarios`,formData)
              .pipe(
                tap((resp:any) =>{
                  //Aqui concateno en el observable y ejecuto guardar el token en el localstorage
                  localStorage.setItem('token',resp.token);
                })
              )
  }

  login(formData: any){
    return this.http.post(`${baseUrl}/login`,formData)
              .pipe(
                tap((resp:any) =>{
                  //Aqui concateno en el observable y ejecuto guardar el token en el localstorage
                  localStorage.setItem('token',resp.token);
                })
              )
  }

  validarToken(){
    //Valida el token 
    const token= localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any) =>{
        //guardo nueva version del token
        localStorage.setItem('token',resp.token);

      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
