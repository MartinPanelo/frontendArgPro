import { Component, OnInit } from '@angular/core';
import { ModeloEducacion } from 'src/app/modelos/modelo-educacion';
import { SeducacionService } from 'src/app/servicio/seducacion.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  educacion: ModeloEducacion[] = [];

  //-------------------------
  acciondemodal: number;
  id: number;

  nuevaeducacion: ModeloEducacion = new ModeloEducacion('', '', '', '', '', '');

  constructor(
    private educacionS: SeducacionService,
    private tokenService: TokenService
  ) {}
  islogged = false;

  ngOnInit(): void {
    this.cargarDatosEducacion();
    if (this.tokenService.getToken()) {
      this.islogged = true;
    } else {
      this.islogged = false;
    }
  }

  cargarDatosEducacion(): void {
    this.educacionS.getdato().subscribe((data) => {
      this.educacion = data;
    });
  }

  crearDatoseducacion(): void {
    const Ed = new ModeloEducacion(
      this.nuevaeducacion.grado,
      this.nuevaeducacion.institucion,
      this.nuevaeducacion.ubicacion,
      this.nuevaeducacion.detalle1,
      this.nuevaeducacion.detalle2,
      this.nuevaeducacion.logo
    );
    this.educacionS.save(Ed).subscribe(() => {
      this.cargarDatosEducacion();
    });
  }

  actualizarEducacion(): void {
    this.educacionS.update(this.id, this.nuevaeducacion).subscribe(() => {
      this.cargarDatosEducacion();
    });
  }

  borraritem(i: number) {
    this.educacionS.borrar(i).subscribe(() => {
      this.cargarDatosEducacion();
    });
  }

  validar() {
    if (this.acciondemodal == -1) {
      this.crearDatoseducacion();
    } else {
      this.actualizarEducacion();
    }
  }

  tipodemodal(opc: number) {
    if (opc == -1) {
      this.acciondemodal = opc;

      this.nuevaeducacion = new ModeloEducacion('', '', '', '', '', '');
    } else {
      this.nuevaeducacion = Object.assign({}, this.educacion[opc]);

      this.id = this.educacion[opc].id;
    }
  }
}
