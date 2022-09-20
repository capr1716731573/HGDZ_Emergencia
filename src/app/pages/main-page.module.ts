import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    MainPageComponent,
  ],
  imports: [
    CommonModule,  
    SharedModule,//modulo de los header sidebar breadcrumbs
    RouterModule//si la pagina o main lleva un router outlet se debe colocar este modulo
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    MainPageComponent
  ]
})
export class MainPageModule { }
