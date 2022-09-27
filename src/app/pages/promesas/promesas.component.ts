import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios()
      .then( usuarios => {
        console.log(usuarios);
      })
    /* const promesa = new Promise( (resolve, reject) => {

      if(false){
        resolve('Dentro de la promesa');
      }else{
        reject('Algo salio mal');
      }

    });

    //escucho la promesa resolverse
    promesa.then((mensaje)=>{
      console.log(mensaje);
    })
    .catch( (error) => {
      console.log('Error en promesa: '+error);
    } )

    console.log('Fin del Init'); */
  }

  getUsuarios(){
    const url:string='https://reqres.in/api/users';
    return new Promise (resolve => {
      fetch(url)
      .then (resp => resp.json())//cuando ya tengo el body de la promesa
      .then (body => resolve( body.data))
    });
    
  }

}
