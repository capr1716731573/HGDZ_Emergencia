import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario!:Usuario;

  constructor(private sideBarService:SidebarService,
              private usuarioService:UsuarioService) { 
    this.menuItems=sideBarService.menu;
    this.usuario=this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
