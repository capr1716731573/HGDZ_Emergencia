import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { TriageComponent } from './triage/triage.component';
import { Form008Component } from './form008/form008.component';

import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';

const childRoutes:Routes=[
  //Primera Seccion
  { path: 'dashboard', component: DashboardComponent, data:{ titulo:'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data:{ titulo:'Progress Bar' } },
  { path: 'grafica', component: Grafica1Component, data:{ titulo:'Gráficos' } },
  { path: 'promesas', component: PromesasComponent, data:{ titulo:'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data:{ titulo:'Observables' } },

  //**** Emergencia **************/
  { path: 'triage', component: TriageComponent, data:{ titulo:'Triage' } },
  { path: 'form008', component: Form008Component, data:{ titulo:'HCU-form.008' } },

  //Default
  { path:'', redirectTo:'/dashboard', pathMatch:'full' }
]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
