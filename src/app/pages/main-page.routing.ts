import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { MainPageComponent } from './main-page.component';


const routes:Routes=[
    {
      path:'', 
      component: MainPageComponent,
      //canActivate:[AuthGuard],
      //canLoad:[AuthGuard],
      //Carga las rutas de manera peresoza ya no cuando ejecuta la aplicacion sino 
      //cuando tiene el token recien carga los modulos
      loadChildren:() => import('./child-routes.module').then(m => m.ChildRoutesModule)  
}];
  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPagesRoutingModule {}