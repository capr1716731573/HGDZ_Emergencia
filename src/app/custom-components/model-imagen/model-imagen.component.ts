import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from './modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: [
  ]
})
export class ModelImagenComponent implements OnInit {
  public imagenSubir!:File;
  public imgTemp:any=null;
  public id:any;
  public tipo:any;
  

  constructor(public modalService:ModalImagenService,
              public fileUploadService:FileUploadService ){
              
	}

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp=null;
    this.modalService.cerrarModal();
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
    this.id=this.modalService.id;
    this.tipo=this.modalService.tipo;
    console.log("DESDE MODAL COMPONENT ",this.id,this.tipo);
    
    this.fileUploadService
    .actualizarFoto(this.imagenSubir,this.tipo,this.id)
    //actualizo la imagen de la instancia usuario del servicio Usuario
    //esto actualiza la foto de los perfiles al instante del Header y el Sidebar
    .then (img => {
      swal.fire('Guardado','Imagen de Usuario Guardada','success');
      this.modalService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch(err =>{
      swal.fire('Error','No se pudo subir la imagen','error')
    })
  }
 
}
