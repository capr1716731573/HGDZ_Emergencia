import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageModule } from './pages/main-page.module';
import { AuthModule } from './auth/auth.module';
import { GlobalInterceptorService } from './interceptors/global-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
   
  ],
  imports: [
    BrowserModule,
    MainPageModule,
    AuthModule,
    AppRoutingModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
