import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  nuevaeducacion: ModeloEducacion = new ModeloEducacion("","","","","","");

  constructor(
    private educacionS: SeducacionService,
    private router: Router,
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

    // this.educacionS.detail(1).subscribe(data => {this.nuevaeducacion = data})
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
    this.educacionS.save(Ed).subscribe(() => {this.cargarDatosEducacion(); });

  //  this.educacionS.detail(this.id).subscribe((data) => {this.nuevaeducacion = data;});
  }

  actualizarEducacion(): void {
    // falta el indice

    this.educacionS.update(this.id, this.nuevaeducacion).subscribe(() => {
      this.cargarDatosEducacion();
    });
  }
  
  borraritem(i: number) {
    //console.log(i);
    this.educacionS.borrar(i).subscribe(() => {
      this.cargarDatosEducacion();
    });
  }

  validar() {
    if (this.acciondemodal == -1) {
      this.crearDatoseducacion();
    } else {
      // aca se invoca la funcion de actualizar datos
      this.actualizarEducacion();
    }
  }

  tipodemodal(opc: number) {
    if (opc == -1) {
      this.acciondemodal = opc;

      this.nuevaeducacion = new ModeloEducacion('', '', '', '', '', '');

     // console.log('abri modal de creacion' + this.id );

    } else {

      this.nuevaeducacion = Object.assign({}, this.educacion[opc]);
    //  console.log(this.educacion[opc].id)
      this.id = this.educacion[opc].id;

     
    }
  }
}
