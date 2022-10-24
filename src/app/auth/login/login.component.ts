import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  public formSubmitted=false;

  public loginForm= this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(4)]],
    remember: false
  });

  constructor(private router:Router,
    private fb:FormBuilder,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  campoNoValido( campo:string):boolean{
    if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

 login(){
  this.formSubmitted=true;

    if(this.loginForm.invalid){
      return;
    }

    this.usuarioService.login(this.loginForm.value)
        .subscribe(resp =>{
          //Funcion RECUERDAME
          const recordar=this.loginForm.get('remember')?.value || false;
          const email=this.loginForm.get('email')?.value;
          if(recordar && email != null){
            localStorage.setItem('email',email);
          }
          
          swal.fire({
            icon:'success',
            title: 'Usuario Logueado con exito',
            showClass: {
              popup: 'animated fadeInDown'
            },
            hideClass: {
              popup: 'animated fadeOutUp'
            }
          })
          
          //Navega a el Dashboard
          this.router.navigateByUrl('/');
           
        },(err) => {
          swal.fire('Error',err.error.msg,'error');
        });
 }
}
