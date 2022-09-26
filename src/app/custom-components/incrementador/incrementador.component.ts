import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  
  ngOnInit() {
    this.btnClass=`btn ${this.btnClass}`;
  }

  //recibir valor desde el padre o html
  @Input('valorEntrada') progreso:number=20;
  @Input() btnClass:string='btn-primary';

  //Para emitir valor de salida -- SON FUNCIONES QUE EL COMPONENTE PADRE EJECUTA
  @Output() valorSalida:EventEmitter<number>=new EventEmitter();


  cambiarValor( valor: number){
    
    if(this.progreso >= 100 && valor >=0){
      this.valorSalida.emit(100);
      this.progreso=100;
      return ;
    }

    if(this.progreso <= 0 && valor<0){
      this.valorSalida.emit(0);
      this.progreso=0;
      return ;
    }

    this.progreso=this.progreso+valor;
    this.valorSalida.emit(this.progreso);
  }
 
  onChange(newValue: any){
    if(newValue >= 100){
      this.progreso=100;
    }else if(newValue <=0){
      this.progreso=0;
    }else{
      this.progreso=newValue;
    }
    this.valorSalida.emit(this.progreso);
  }

}
