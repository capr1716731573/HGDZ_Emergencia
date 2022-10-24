import { Component } from '@angular/core';
import swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})


export class RegisterComponent {

  public formSubmitted=false;

  public registerForm= this.fb.group({
    nombre:['Katherine Basantes',[Validators.required, Validators.minLength(3)]],
    email:['test100@gmail.com',[Validators.required, Validators.email]],
    password:['1234',[Validators.required, Validators.minLength(4)]],
    password2:['1234',[Validators.required, Validators.minLength(4)]],
    terminos:[false,[Validators.required]]
  }, {

    validators:[
      this.passwordsIguales('password','password2'),
      this.validateAgreeTerms()
    ]
  });

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService) { 

  }

  crearUsuario(){
    this.formSubmitted=true;

    if(this.registerForm.invalid){
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp =>{
          swal.fire({
            icon:'success',
            title: 'Usuario creado con exito',
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

  campoNoValido( campo:string):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    const v=!this.registerForm.get('terminos')?.value && this.formSubmitted;
    return v;
  }

  contrasenasNoValidas(){
    const pass1= this.registerForm.get('password')?.value;
    const pass2= this.registerForm.get('password2')?.value;
    if ((pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  //Custom function about the vaidators of forms 
  passwordsIguales(passName1:string,passName2:string){
    return (formGroup: FormGroup) => {
      const passControl1= formGroup.get(passName1);
      const passControl2= formGroup.get(passName2);

      if(passControl1?.value === passControl2?.value){
        passControl2?.setErrors(null);
      }else{
        passControl2?.setErrors({noEsIgual:true});
      }


    }
  }

  validateAgreeTerms(){
    return (formGroup: FormGroup) => {
      const terminos= formGroup.get('terminos');

      if(terminos?.value === true) {
        terminos?.setErrors(null);
      }else{
        terminos?.setErrors({noAcepta:true});
      }
    }
  }
}
