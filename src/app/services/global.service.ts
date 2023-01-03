import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

const baseUrl= environment.base_url+'/menu';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  sgh_user_cache:any={};
  constructor(private http:HttpClient,
              private router:Router) { }

  sghUser():any{
    this.sgh_user_cache=localStorage.getItem('sgh_user');
    this.sgh_user_cache=JSON.parse(this.sgh_user_cache);
    return this.sgh_user_cache;
  }

  cargarMenuHgdz(usuario:number, perfil:number){
    const url=`${baseUrl}/by_user_perfil/${usuario}/${perfil}`;
    return this.http.get(url)
               .pipe(
                  map((resp:any) => resp)
               )
  }

  guardarLocalStorage( menu:any){
    localStorage.removeItem('menu_emergencia');
    localStorage.setItem('menu_emergencia',JSON.stringify(menu));
  }

  logout(){
    localStorage.removeItem('sgh_user');
    localStorage.removeItem('menu_emergencia');
    //redireccionar a login principal
    this.router.navigateByUrl('/login');
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    Swal.fire('Error', `${errorMessage}`, 'error');
    return throwError(() => {
      return errorMessage;
    });
  }
}
