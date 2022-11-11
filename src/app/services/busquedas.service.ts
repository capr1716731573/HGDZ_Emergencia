import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.models';

import { Usuario } from '../models/usuario.model';

const baseUrl= environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

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

  private transformarUsuarios(resultados:any[]):Usuario[]{
    return resultados.map(
      (user:any) => new Usuario(
        user.nombre,user.email,'',user.img,user.google,user.role,user.uid
      )
    )
  }

  private transformarHospitales(resultados:any[]):Hospital[]{
    return resultados;
    
  }

  private transformarMedicos(resultados:any[]):Medico[]{
    return resultados;
    
  }

  busquedaGlobal(termino:string){
    const url=`${baseUrl}/busqueda/todo/${termino}`;
    return this.http.get(url,this.getHeader());
  }

  buscar(tipo:'usuarios' | 'medicos' | 'hospitales',
          termino:string){
    const url=`${baseUrl}/busqueda/contenedor/${tipo}/${termino}`;
    return this.http.get(url,this.getHeader())
              .pipe(
                map((resp:any) => {
                  switch(tipo){
                    case 'usuarios':
                      return this.transformarUsuarios(resp.data);
                      break;

                    case 'hospitales':
                      return this.transformarHospitales(resp.data);
                      break;

                    case 'medicos':
                      return this.transformarMedicos(resp.data);
                      break;

                    default:
                      return [];
                  }
                })
              )
  }
}
