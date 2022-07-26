export class ModeloSkill {
  id?: number;
  nombre: string;
  valor: string;
  tipo: string;

  constructor(nombre: string, valor: string, tipo: string) {
    this.nombre = nombre;
    this.valor = valor;
    this.tipo = tipo;
  }
}
