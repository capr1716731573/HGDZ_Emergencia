import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';



@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnChanges{
 // Doughnut
 @Input('title') titulo='Sin titulo'; 
 @Input ('labels') labels: string[] = [ 'Valor1', 'Valor2', 'Valor3' ];
 @Input ('datas') datas:number[]= [ 50, 50, 50 ] ;

 datosChar:any;

  constructor(){
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.datosChar = {
  
      labels: this.labels,
      datasets: [
        { data: this.datas}
      ]
    };
  }

  
 



 public doughnutChartType: ChartType = 'doughnut';


}
