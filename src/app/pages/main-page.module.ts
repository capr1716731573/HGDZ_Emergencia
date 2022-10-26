import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../shared/shared.module';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    MainPageComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,  
    FormsModule,
    SharedModule,//modulo de los header sidebar breadcrumbs
    RouterModule,//si la pagina o main lleva un router outlet se debe colocar este modulo
    CustomComponentsModule,
    ReactiveFormsModule
    
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    MainPageComponent
  ]
})
export class MainPageModule { }
