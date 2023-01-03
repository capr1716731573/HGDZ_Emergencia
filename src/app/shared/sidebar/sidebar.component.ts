import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { GlobalService } from 'src/app/services/global.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario!:any;
  public menu:any[]=[];
  imagenUsuario:string='./assets/images/users/4.jpg';

  constructor(public sideBarService:SidebarService,
              public globalService:GlobalService) { 
    this.usuario=this.globalService.sghUser();
    this.sideBarService.cargarMenu();
    console.log("desde sidebar :" ,this.sideBarService.menu);

  }

  ngOnInit(): void {
    
  }

}
