import { Component, OnDestroy } from '@angular/core';
import { interval, map, Observable, retry, take, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervaloSubscription: Subscription;

  constructor() { 
   
/* 
    this.retornaObservable().pipe(
      retry(1)//lo vuelve a ejecutar 1 ves y en este ejemplo la segunda ves al llegar a 2 marca el error
    ).subscribe(

      valor => console.log('Subscripcion:',valor),
      error => console.error('Error: ',error),
      () => console.info('Proceso Terminado')
    ); */
      this.intervaloSubscription=this.retornaIntervalo()
          .subscribe(console.log)
  }

  ngOnDestroy() {
    this.intervaloSubscription.unsubscribe();
  }

  retornaIntervalo():Observable<any>{
    const intevalo$=interval(1000)
                    .pipe(
                      take(9),
                      filter(valor=> (valor % 2 ===0) ? true : false),
                      map(valor => {
                        return 'Hola Mundo ' + (valor +1)
                      })
                    );

    return intevalo$;
  }

  retornaObservable(): Observable<number>{
    const obs$= new Observable<number>( observer => {
      let i=-1;
      const intervalo=setInterval(()=>{
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2){
          observer.error('i llego a 2');
        }


      },1000)
    });

    return obs$;
  }

}
