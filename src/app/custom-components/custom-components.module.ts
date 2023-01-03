import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModelImagenComponent } from './model-imagen/model-imagen.component';
import { Loading1Component } from './loading/loading1.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModelImagenComponent,
    Loading1Component
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModelImagenComponent,
    Loading1Component
  ]
})
export class CustomComponentsModule { }
