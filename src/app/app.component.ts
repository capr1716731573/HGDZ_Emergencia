import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';
//Declaro funcion del template de un archivo javascript externo para que lo reconozca angular 
declare function customInitFunctions():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Emergencia HGDZ';
  cargando:boolean=true;
  sghUser:any={};
  constructor(private globalService:GlobalService){

  }

  ngOnInit(): void {
    customInitFunctions();    
    this.sghUser=this.globalService.sghUser();    
    this.cargarMenuHgdz(this.sghUser.usu_id_pk,this.sghUser.pfi_id_fk);
  }

  cargarMenuHgdz(usuario:number,perfil:number){
    this.cargando=true;
    this.globalService.cargarMenuHgdz(usuario, perfil)
        .subscribe((resp:any) => {
          this.globalService.guardarLocalStorage(resp.rows[0].detalle_menu);
          this.cargando=false;
        })
  }

  

}
