import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal:boolean=true;
  public tipo:string='';
  public id:string='';
  public img:string='/uploads/no-img.png';

  public nuevaImagen:EventEmitter<any>=new EventEmitter<any>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo:'usuarios'|'medicos'|'hospitales',_id:any,img:string){
    this._ocultarModal=false;
    this.tipo=tipo;
    this.id=_id;
    
    if(img?.includes('https')){
      this.img=img;
    }else{
      this.img=`${base_url}/upload/${tipo}/${img}`;
    }

    console.log("DESDE MODAL SERVICE ",this.id,this.tipo,this.img);
  }

  cerrarModal(){
    this._ocultarModal=true;
  }

}
