export class ModeloTallercurso {

    id?:number;
    tipocapacitacion:string;
    nombre:string;
    cargahoraria: string;
    detalle1:string;
    detalle2:string;
    ubicacion:string;
    logo:string;


    

    constructor(tipocapacitacion: string,nombre: string,cargahoraria: string,detalle1:string,detalle2:string,ubicacion: string,logo:string) {

        this.tipocapacitacion = tipocapacitacion;
        this.nombre = nombre;
        this.cargahoraria = cargahoraria;
        this.detalle1 = detalle1;
        this.detalle2 = detalle2;
        this.ubicacion = ubicacion;
        this.logo = logo;

    }
}
