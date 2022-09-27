import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MainPageComponent } from './main-page.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes:Routes=[
    {
      path:'', 
      component: MainPageComponent,
      children:[
        { path: 'dashboard', component: DashboardComponent, data:{ titulo:'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data:{ titulo:'Progress Bar' } },
        { path: 'grafica', component: Grafica1Component, data:{ titulo:'Gráficos' } },
        { path: 'promesas', component: PromesasComponent, data:{ titulo:'Promesas' } },
        { path: 'rxjs', component: RxjsComponent, data:{ titulo:'Observables' } },
        { path:'', redirectTo:'/dashboard', pathMatch:'full' }
      ]

  
}];
  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPagesRoutingModule {}
