import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPagesRoutingModule } from './pages/main-page.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth-routing.module';


const routes:Routes=[

  //path: '/dashboard' MainPagesRouting
  //patj: '/auth' AuthRouting
  
  { path: '', redirectTo:'/dashboard', pathMatch:'full' },   
  { path: '**', component: NopagefoundComponent },

]


@NgModule({
  declarations: [
    
  ],
  imports: [
    //RouterModule.forRoot(routes,{ useHash:true }),
    RouterModule.forRoot(routes),
    MainPagesRoutingModule,
    //AuthRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
