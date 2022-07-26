export class ModeloEducacion {
    id?: number;
    grado: string;
    institucion: string;
    ubicacion: string;
    detalle1: string;
    detalle2: string;
    logo: string;

    constructor(grado: string,institucion: string,ubicacion: string,detalle1: string,detalle2: string,logo: string) {
        this.grado = grado;
        this.institucion = institucion;
        this.ubicacion = ubicacion;
        this.detalle1 = detalle1;
        this.detalle2 = detalle2;
        this.logo = logo;
    }
}
