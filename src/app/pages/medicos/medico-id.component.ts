import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../hospitales/hospital.service';
import { MedicosService } from './medicos.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico-id',
  templateUrl: './medico-id.component.html',
  styles: [
  ]
})
export class MedicoIdComponent implements OnInit {

    public medicoForm!:FormGroup;
    public hospitales: Hospital[] = [];
    
    public medicoSeleccionado: any;
    public hospitalSeleccionado: any;
  
  
  
    constructor( private fb: FormBuilder,
                 private hospitalService: HospitalService,
                 private medicoService: MedicosService,
                 private router: Router,
                 private activatedRoute: ActivatedRoute ) { }
  
    ngOnInit(): void {
  
      this.activatedRoute.params
          .subscribe( ({ id }) => this.cargarMedico( id ) );
  
      this.medicoForm = this.fb.group({
        nombre: ['', Validators.required ],
        hospital: ['', Validators.required ],
      });
  
      this.cargarHospitales();
  
      this.medicoForm.get('hospital')!.valueChanges
          .subscribe( hospitalId => {
            this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
          })
    }
  
    cargarMedico(id: string) {
        if (id === 'nuevo') {
          return;
        }
     
        this.medicoService.obtenerMedicoXID2(id)
        .pipe(
            delay(100)
        )
        .subscribe({
          next: (resp:any) => {
            const medico=resp.medico;
            console.log(medico)
            this.medicoSeleccionado = medico;
     
            this.medicoForm.setValue({
              nombre: medico.nombre,
              hospital: medico.hospital._id,
            });
          },
          error: () => {
            this.router.navigateByUrl('/medicos');
          },
        });
      }
    
  
    cargarHospitales() {
  
      this.hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        })
  
    }
  
    guardarMedico() {
  
      const { nombre } = this.medicoForm.value;
  
      if ( this.medicoSeleccionado ) {
        // actualizar
        const data = {
          ...this.medicoForm.value,
          _id: this.medicoSeleccionado._id
        }
        this.medicoService.actualizarMedico( data )
          .subscribe( resp => {
            Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
          })
  
      } else {
        // crear
        
        this.medicoService.crearMedico( this.medicoForm.value )
            .subscribe( (resp: any) => {
              Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
              this.router.navigateByUrl(`/medicos/${ resp.medico._id }`)
          })
      }
  
  
  
    }
  
   
  }