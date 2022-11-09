import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { environment } from 'src/environments/environment';

const baseUrl= environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
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

  cargarHospitales(desde:number=0){
    const url=`${baseUrl}/hospitales`;
    return this.http.get(url,this.getHeader())
              .pipe(
                map((resp:any) => resp.hospitales)
              )
           
  }

  crearHospital(nombre:string){
    const url=`${baseUrl}/hospitales`;
    return this.http.post(url,{nombre},this.getHeader())
  }

  actualizarHospital(id:string,nombre:string){
    const url=`${baseUrl}/hospitales/${id}`;
    return this.http.put(url,{nombre},this.getHeader())
  }

  borrarHospital(id:string){
    const url=`${baseUrl}/hospitales/${id}`;
    return this.http.delete(url,this.getHeader())
  }

}
