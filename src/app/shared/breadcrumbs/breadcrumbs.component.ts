import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo:string='Blank Page';
  public tituloSubscription: Subscription;

  constructor(private router:Router) { 
   this.tituloSubscription=this.getArgumentosRuta()
                              .subscribe( (data:any) => {
                                this.titulo=data.titulo;
                              });
  }
  ngOnDestroy() {
    this.tituloSubscription.unsubscribe();
  }

  getArgumentosRuta(){
     //Aqui voy a colocar el titulo de la pagina y los breadcrumbs
    //OBTENER ARGUMENTOS DE LAS RUTAS DE LA PAGINAS
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
        map((event:ActivationEnd) => event.snapshot.data)
      )
     
  }

}
