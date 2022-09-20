import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    Sidebar2Component,
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    Sidebar2Component,
  ]
})
export class SharedModule { }
