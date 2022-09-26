import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

//Declaro funcion del template de un archivo javascript externo para que lo reconozca angular 
declare function customInitFunctions():any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})
export class MainPageComponent implements OnInit {
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}

