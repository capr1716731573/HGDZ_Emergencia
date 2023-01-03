import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageModule } from './pages/main-page.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { GlobalInterceptorService } from './interceptors/global-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomComponentsModule } from "./custom-components/custom-components.module";

@NgModule({
    declarations: [
        AppComponent,
        NopagefoundComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        MainPageModule,
        AuthModule,
        AppRoutingModule,
        CustomComponentsModule
    ]
})
export class AppModule { }
