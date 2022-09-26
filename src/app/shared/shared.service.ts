import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private elementIndexCss=document.querySelector('#theme');
  constructor() {
     //Colorcar un tema por defecto
     const urlTheme=localStorage.getItem('themeDashboard') || './assets/css/colors/purple-dark.css';
     this.elementIndexCss?.setAttribute('href',urlTheme);
  }


    /* Cambio el tema al seleccionar el icono */
    changeTheme(theme:string){
    
      const urlTheme=`./assets/css/colors/${theme}.css`;
      this.elementIndexCss?.setAttribute('href',urlTheme);
      localStorage.setItem('themeDashboard',urlTheme);
      this.ckeckCurrentTheme();
    
    }

     /* Coloco el icono check del tema seleccionado  */
  ckeckCurrentTheme(){
    const links= document.querySelectorAll('.selector');
    links.forEach((elem:any) => {
      elem.classList.remove('working');
      const btnTheme= elem.getAttribute('data-theme');
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`;
      const currentTheme= this.elementIndexCss?.getAttribute('href');
      
      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }

    })
  }
  
}
