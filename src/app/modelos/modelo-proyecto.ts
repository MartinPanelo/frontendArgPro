export class ModeloProyecto {
    id?: number;
    nombre: string;
    fecha: string;
    detalle: string;
    link: string;
    foto: string;
  

    constructor(nombre: string,fecha: string,detalle: string,link: string,foto: string) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.detalle = detalle;
        this.link = link;
        this.foto = foto;
    }


}
