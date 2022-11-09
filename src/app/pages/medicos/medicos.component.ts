import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.models';
import { MedicosService } from './medicos.service';
import { ModalImagenService } from 'src/app/custom-components/model-imagen/modal-imagen.service';
import { delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos:Medico[]=[];
  public cargando:boolean=true;
  myEventSubscription: any;

  constructor(private medicoService:MedicosService,
              public modalService:ModalImagenService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    //Aqui va el emmit de modal service, cuando cargue la imagen que refresque 
    //y mande a llamar un metodo de cargar otra ves esos usuarios
    this.myEventSubscription=this.modalService.nuevaImagen
    .pipe(delay(1000))
    .subscribe((img:any) => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    //Destruyo la subscripcion activa cuando cierro el modal
    //this.modalService.nuevaImagen.unsubscribe();
    this.myEventSubscription.unsubscribe();
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos()
        .subscribe(resp => {
          this.cargando=false;
          this.medicos=resp;
        })
  }

  abirModalImagen(medico:Medico){
    this.modalService.abrirModal('medicos',medico._id, medico.img!);
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos',termino)
        .subscribe((resultados:any) =>{
          this.medicos=resultados
        } )
  }

  eliminarMedico(medico:Medico){
    
    swal.fire({
      title: 'Accion?',
      text: "Desea eliminar el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          
          /**-------------------------------------------------- */
          /*********** Aqui va el codigo del service ************/
          /**-------------------------------------------------- */
          this.medicoService.borrarMedico(medico._id)
              .subscribe((resp:any)=>{
                this.cargarMedicos();
              })

        }
      },
      (err) => {
        swal.fire('Error',err.error.msg,'error');
      }
    )

  }
}
