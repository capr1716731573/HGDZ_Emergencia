import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MainPageComponent } from './main-page.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoIdComponent } from './medicos/medico-id.component';

const routes:Routes=[
    {
      path:'', 
      component: MainPageComponent,
      canActivate:[AuthGuard],
      children:[
        //Primera Seccion
        { path: 'dashboard', component: DashboardComponent, data:{ titulo:'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data:{ titulo:'Progress Bar' } },
        { path: 'grafica', component: Grafica1Component, data:{ titulo:'Gráficos' } },
        { path: 'promesas', component: PromesasComponent, data:{ titulo:'Promesas' } },
        { path: 'rxjs', component: RxjsComponent, data:{ titulo:'Observables' } },
        { path: 'perfil', component: PerfilComponent, data:{ titulo:'Perfil Usuario' } },

        //Segunda Seccion
        { path: 'usuarios', component: UsuariosComponent, data:{ titulo:'Usuarios' } },
        { path: 'hospitales', component: HospitalesComponent, data:{ titulo:'Hospitales' } },
        { path: 'medicos', component: MedicosComponent, data:{ titulo:'Medicos' } },
        { path: 'medicos/:id', component: MedicoIdComponent, data:{ titulo:'Medicos' } },

        //Default
        { path:'', redirectTo:'/dashboard', pathMatch:'full' }
      ]

  
}];
  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPagesRoutingModule {}