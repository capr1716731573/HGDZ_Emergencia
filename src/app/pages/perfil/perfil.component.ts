import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp:any=null;

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService) {
                this.usuario=usuarioService.usuario;
               }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    
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
            this.usuarioService.actualizarPerfil(this.perfilForm.value)
                .subscribe((resp:any) => {
                if (result.isConfirmed) {
                  const{nombre,email}=this.perfilForm.value;
                  //Actualizo el usuario a nivel global
                  this.usuario.nombre=nombre;
                  this.usuario.email=email;
                  
                  swal.fire(
                    'Acción!',
                    'Datos guardados.',
                    'success'
                  )
            }
          },
          (err) => {
            swal.fire('Error',err.error.msg,'error');
          }
          )

        }
        );
  }

  cambiarImagen(event:any){
    const file:File=event.target.files[0];
    this.imagenSubir=file;
    if(!file){
      return this.imgTemp=null;
    }

    const reader= new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      this.imgTemp=reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
    //actualizo la imagen de la instancia usuario del servicio Usuario
    //esto actualiza la foto de los perfiles al instante del Header y el Sidebar
    .then (img => {
      this.usuario.img=img;
      swal.fire('Guardado','Imagen de Usuario Guardada','success')
    })
  }
}
