import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

//Declaro funcion del template de un archivo javascript externo para que lo reconozca angular 
declare function customInitFunctions():any;

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styles: [
  ]
})
export class Sidebar2Component implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.ckeckCurrentTheme();
    customInitFunctions();
  }


  /* Cambio el tema al seleccionar el icono */
  changeTheme(theme:string){
    this.sharedService.changeTheme(theme);  
  }

 

}
