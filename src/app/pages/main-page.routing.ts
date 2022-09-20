import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MainPageComponent } from './main-page.component';

const routes:Routes=[
    {
      path:'', 
      component: MainPageComponent,
      children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'grafica', component: Grafica1Component },
        { path:'', redirectTo:'/dashboard', pathMatch:'full' }
      ]

  
}];
  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPagesRoutingModule {}
