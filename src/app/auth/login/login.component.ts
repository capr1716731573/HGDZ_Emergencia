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
    user:[localStorage.getItem('user_salud') || '',[Validators.required]],
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
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value)
        .subscribe(resp =>{
          //Funcion RECUERDAME
          const recordar=this.loginForm.get('remember')?.value || false;
          const user=this.loginForm.get('user')?.value;
          if(recordar && user != null){
            localStorage.setItem('user_salud',user);
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
