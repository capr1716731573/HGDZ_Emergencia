import { environment } from "src/environments/environment";

const base_url= environment.base_url;

export class Usuario{
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: string,
        public role?: string,
        public uid?: string,
    ){}

    get imageUrl(){
        if(!this.img){
            return `${base_url}/upload/usuarios/no-image`;
        }else if(this.img?.includes('https')){
            //Valido que si incluye https quiere decir que es de google
            return this.img;
        }else if(this.img){
            // /upload/usuarios/no-image
            return `${base_url}/upload/usuarios/${this.img}`;
        }else{
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}

