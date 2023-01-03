import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { SidebarService } from '../shared/sidebar/sidebar.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})
export class MainPageComponent implements OnInit {
  
  constructor(private sharedService: SharedService,
              public sidebarService:SidebarService) { }

  ngOnInit(): void {
    //this.sidebarService.cargarMenu();
  }

}

