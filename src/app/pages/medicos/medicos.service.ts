import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import { Medico } from 'src/app/models/medico.models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

const baseUrl= environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http:HttpClient){}

  getToken(){
    return localStorage.getItem('token') || '';
  }

  getHeader(){
    return {
        headers:{
        'x-token':this.getToken()
      }
    }
  }

  cargarMedicos(desde:number=0){
    const url=`${baseUrl}/medicos`;
    return this.http.get(url)
              .pipe(
                map((resp:any) => resp.medicos)
              )
           
  }

  obtenerMedicoXID(id:string){
    const url=`${baseUrl}/medicos/${id}`;
    return this.http.get(url,this.getHeader())
              
              .pipe(
                map((resp:any)=> resp.medico)
              )
              
              
  }

  obtenerMedicoXID2(id:string){
    const url=`${baseUrl}/medicos/${id}`;
    return this.http
          .get(url)
          .pipe(retry(1));
             
  }

  crearMedico(medico:{nombre:string, hospital:string}){
    const url=`${baseUrl}/medicos`;
    return this.http.post(url,medico)
  }

  actualizarMedico(medico:Medico){
    const url=`${baseUrl}/medicos/${medico._id}`;
    return this.http.put(url,medico)
  }

  borrarMedico(id:string){
    const url=`${baseUrl}/medicos/${id}`;
    return this.http.delete(url)
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