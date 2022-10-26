import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public imageUrl='';
  public usuario!:Usuario;
  constructor(private usuarioService:UsuarioService) {
    this.usuario=this.usuarioService.usuario;
   }

  logout(){
    this.usuarioService.logout();
  }

}
