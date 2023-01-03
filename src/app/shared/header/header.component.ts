import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public imageUrl='';
  public usuario!:any;
  constructor(private globalService:GlobalService,
              private router:Router) {
    console.log(this.globalService.sghUser())
    this.usuario=this.globalService.sghUser();
  }

  logout(){
    this.globalService.logout();
  }

  buscar(termino:string){
    if(termino.length === 0){
      return;
    }
    this.router.navigateByUrl(`/buscar/${termino}`);
  }

}
