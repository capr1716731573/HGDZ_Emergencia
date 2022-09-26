import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]=[
    {
      titulo:'Principal',
      icono:'mdi mdi-gauge',
      submenu:[
        { titulo:'Main', url:'/'},
        { titulo:'Gráficas', url:'/grafica'},
        { titulo:'ProgressBar', url:'/progress'},
      ]
    }
  ]

  constructor() { }
}
