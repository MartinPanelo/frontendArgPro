export class acercade{

    id?:number;
    nombre:string;
    apellido:string;
    ubicacion: string;
    banner:string;
    foto:string;
    acerca:string;
    titulo:string;


    

    constructor(nombre: string,apellido: string,ubicacion: string,banner:string,foto:string,acerca: string,titulo:string) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.ubicacion = ubicacion;
        this.banner = banner;
        this.foto = foto;
        this.acerca = acerca;
        this.titulo = titulo;

    }
    
}