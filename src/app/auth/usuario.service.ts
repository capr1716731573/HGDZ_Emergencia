import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from './register/register-interface';

const baseUrl= environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!:any;

  constructor(private http:HttpClient,
              private router:Router) { }

  getToken(){
    return localStorage.getItem('token') || '';
  }

  getUid(){
    return this.usuario.uid || '';
  }

  getHeader(){
    return {
        headers:{
        'x-token':this.getToken()
      }
    }
  }

  getRole(){
    return this.usuario.role;
  }

  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${baseUrl}/usuarios`,formData)
              .pipe(
                tap((resp:any) =>{
                  //Aqui concateno en el observable y ejecuto guardar el token en el localstorage
                  this.guardarLocalStorage(resp.token,resp.menu);
                })
              )
  }

  login(formData: any){
    return this.http.post(`${baseUrl}/login`,formData)
              .pipe(
                tap((resp:any) =>{
                  //Aqui concateno en el observable y ejecuto guardar el token en el localstorage
                  
                  //this.guardarLocalStorage(resp.token,resp.menu);
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
        //this.usuario=new Usuario(nombre,email,'',img,google,role,uid);
        //guardo nueva version del token
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      }),
      catchError(error => of(false))
    )
  }

  logout(){
    localStorage.removeItem('sgh_user');
    localStorage.removeItem('menu_emergencia');
    //redireccionar a login principal
    this.router.navigateByUrl('/login');
  }

  actualizarPerfil(data:{email:string, nombre:string, role?:string}){
    data={
      ...data,
      role:this.usuario.role
    }
  
    return this.http.put(`${baseUrl}/usuarios/${this.usuario.uid}`,data,this.getHeader())
    
  }

  cargarUsuarios(desde:number=0){
    const url=`${baseUrl}/usuarios?desde=${desde}`;
    return this.http.get(url,this.getHeader())
            .pipe(
                //delay(1000), para probar el loading y que se demore la carga
                map((resp:any) =>{
                  /* const usuarios=resp.usuarios.map((user:any) => new Usuario(
                    user.nombre,user.email,'',user.img,user.google,user.role,user.uid
                  )); */

                  return {
                    total:resp.registros,
                    //usuarios
                  }
                })
            )
  }

  eliminarUsuario(usuario:any){
    const url=`${baseUrl}/usuarios/${usuario.uid}`;
    return this.http.delete(url,this.getHeader());
  }

  actualizarUsuario(usuario:any){
    const url=`${baseUrl}/usuarios/${usuario.uid}`;
    return this.http.put(url,usuario,this.getHeader());
  }

}
