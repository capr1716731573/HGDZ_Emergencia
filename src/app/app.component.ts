import { Component, OnInit } from '@angular/core';
//Declaro funcion del template de un archivo javascript externo para que lo reconozca angular 
declare function customInitFunctions():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adminpro';

  ngOnInit(): void {
    customInitFunctions();
  }

}
