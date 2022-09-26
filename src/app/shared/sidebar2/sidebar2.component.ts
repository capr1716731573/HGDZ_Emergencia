import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

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
  }


  /* Cambio el tema al seleccionar el icono */
  changeTheme(theme:string){
    this.sharedService.changeTheme(theme);  
  }

 

}
