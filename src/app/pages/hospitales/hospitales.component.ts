import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from './hospital.service';
import swal from 'sweetalert2'
import { ModalImagenService } from 'src/app/custom-components/model-imagen/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales:Hospital[]=[];
  public cargando:boolean=true;
  myEventSubscription: any;

  constructor(private hospitalService:HospitalService,
              public modalService:ModalImagenService,
              private busquedaService:BusquedasService ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    //Aqui va el emmit de modal service, cuando cargue la imagen que refresque 
    //y mande a llamar un metodo de cargar otra ves esos usuarios
    this.myEventSubscription=this.modalService.nuevaImagen
    .pipe(delay(1000))
    .subscribe((img:any) => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    //Destruyo la subscripcion activa cuando cierro el modal
    //this.modalService.nuevaImagen.unsubscribe();
    this.myEventSubscription.unsubscribe();
  }

  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales()
        .subscribe(resp => {
          this.cargando=false;
          this.hospitales=resp;
        })
  }

  guardarCambios(hospital:Hospital){
    
    swal.fire({
      title: 'Accion?',
      text: "Desea realizar los cambios!",
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
          this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
              .subscribe((resp:any)=>{
                swal.fire(
                  'Acción!',
                  'Datos guardados.',
                  'success'
                )
              })
        }
      },
      (err) => {
        swal.fire('Error',err.error.msg,'error');
      }
    )

  }

  eliminarCambios(hospital:Hospital){
    
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
          this.hospitalService.borrarHospital(hospital._id)
              .subscribe((resp:any)=>{
                this.cargarHospitales();
              })

        }
      },
      (err) => {
        swal.fire('Error',err.error.msg,'error');
      }
    )

  }

  async nuevoHospital(){
   await swal.fire<string>({
      title: 'Acción',
      text: "Ingrese el nombre del nuevo hospital",
      input:'text',
      inputPlaceholder:'Nombre de Hospital',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value!.trim().length > 0){
          this.hospitalService.crearHospital(result.value!)
          .subscribe((resp:any)=>{
            this.hospitales.push(resp.hospital);
            swal.fire(
              'Acción!',
              'Datos guardados.',
              'success'
            )
          })
        }
      }
    })

    
  }

  abirModalImagen(hospital:Hospital){
    this.modalService.abrirModal('hospitales',hospital._id, hospital.img!);
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.cargarHospitales();
    }
    this.busquedaService.buscar('hospitales',termino)
        .subscribe((resultados:any) =>{
          this.hospitales=resultados
        } )
  }
}
