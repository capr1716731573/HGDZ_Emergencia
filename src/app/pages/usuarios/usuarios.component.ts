import { Component, OnDestroy, OnInit,TemplateRef  } from '@angular/core';
import { delay } from 'rxjs';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { ModalImagenService } from 'src/app/custom-components/model-imagen/modal-imagen.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios:number=0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public desde:number=0;
  public cargando:boolean=true;
  myEventSubscription: any;

  constructor(private usuarioService:UsuarioService,
              private busquedaService:BusquedasService,
              public modalService:ModalImagenService) { 

              }
              
  ngOnInit(): void {
    this.cargarUsuarios();
    
    //Aqui va el emmit de modal service, cuando cargue la imagen que refresque 
    //y mande a llamar un metodo de cargar otra ves esos usuarios
    this.myEventSubscription=this.modalService.nuevaImagen
    .pipe(delay(1000))
    .subscribe((img:any) => this.cargarUsuarios());
  }
  
  ngOnDestroy() {
    //Destruyo la subscripcion activa cuando cierro el modal
    //this.modalService.nuevaImagen.unsubscribe();
    this.myEventSubscription.unsubscribe();
  }


  abrirModal(_usuario:any){
    console.log("DESDE USUARIOS",JSON.stringify(_usuario))
    this.modalService.abrirModal('usuarios',_usuario.uid,_usuario.img);
    console.log("DESDE USUARIOS ",_usuario.uid,'usuarios');
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp:any) => {
      this.totalUsuarios=resp.total;
      this.usuarios=resp.usuarios;
      this.usuariosTemp=resp.usuarios;
      this.cargando=false;
    },(err) => {
      swal.fire('Error',err.error.msg,'error');
    })
  }

  cambiarPagina(valor:number){
    this.desde+=valor;
    
    if(this.desde < 0){
      this.desde=0
    }else if(this.desde > this.totalUsuarios){
      this.desde -=valor;
    }

    this.cargarUsuarios();

  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.usuarios= this.usuariosTemp
    }
    this.busquedaService.buscar('usuarios',termino)
        .subscribe((resultados:any) =>{
          this.usuarios=resultados
        } )
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.actualizarUsuario(usuario)
        .subscribe(()=>{},(err)=>{
          swal.fire('Error',err.error.msg,'error');
        })
  }

  eliminarUsuario(usuario:Usuario){

    if(usuario.uid === this.usuarioService.getUid()){
      return swal.fire('Error','No puede borrarse a si mismo','error');
    }

    swal.fire({
      title: 'Esta seguro?',
      text: "Ud desea eliminar el usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario(usuario)
            .subscribe((resp:any)=>{
              this.cargarUsuarios();
              swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
              )
            })

        
      }
    })
  }

}
