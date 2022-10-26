import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { RegisterForm } from './register/register-interface';

const baseUrl= environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!:Usuario;

  constructor(private http:HttpClient,
              private router:Router) { }

  getToken(){
    return localStorage.getItem('token') || '';
  }

  getUid(){
    return this.usuario.uid || '';
  }

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
    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token':this.getToken()
      }
    }).pipe(
      map((resp:any) =>{
        //cargo informacion del usuario
        const {email,google,nombre,role,uid,img=''}=resp.usuario;
        this.usuario=new Usuario(nombre,email,'',img,google,role,uid);
        //guardo nueva version del token
        localStorage.setItem('token',resp.token);
        return true;
      }),
      catchError(error => of(false))
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  actualizarPerfil(data:{email:string, nombre:string, role?:string}){
    data={
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${baseUrl}/usuarios/${this.usuario.uid}`,data,{
      headers:{
        'x-token':this.getToken()
      }
    })
    
  }

}
