import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloTallercurso } from 'src/app/modelos/modelo-tallercurso';
import { TallercursoService } from 'src/app/servicio/tallercurso.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-talleres-cursos',
  templateUrl: './talleres-cursos.component.html',
  styleUrls: ['./talleres-cursos.component.css']
})
export class TalleresCursosComponent implements OnInit {
 tallercurso: ModeloTallercurso[] = [];

  //-------------------------
  acciondemodal: number;
  id: number;

  nuevatallercurso: ModeloTallercurso = new ModeloTallercurso("","","","","","","");

  constructor(
    private tallercursoS: TallercursoService,
    private router: Router,
    private tokenService: TokenService
  ) {}
  islogged = false;

  ngOnInit(): void {
    this.cargarDatosTallerCurso();
    if (this.tokenService.getToken()) {
      this.islogged = true;
    } else {
      this.islogged = false;
    }

    // this.educacionS.detail(1).subscribe(data => {this.nuevaeducacion = data})
  }

  cargarDatosTallerCurso(): void {
    this.tallercursoS.getdato().subscribe((data) => {
      this.tallercurso = data;
    });
  }

  crearDatosTallerCurso(): void {
    const TC = new ModeloTallercurso(
      this.nuevatallercurso.tipocapacitacion,
      this.nuevatallercurso.nombre,
      this.nuevatallercurso.cargahoraria,
      this.nuevatallercurso.detalle1,
      this.nuevatallercurso.detalle2,
      this.nuevatallercurso.ubicacion,
      this.nuevatallercurso.logo
    );
    this.tallercursoS.save(TC).subscribe(() => {this.cargarDatosTallerCurso();});

 //   this.tallercursoS.detail(this.id).subscribe((data) => {this.nuevatallercurso = data;});
  }

  actualizarTallerCurso(): void {
    // falta el indice

    this.tallercursoS.update(this.id, this.nuevatallercurso).subscribe(() => {
      this.cargarDatosTallerCurso();
    });
  }
  
  borraritem(i: number) {
   // console.log(i);
    this.tallercursoS.borrar(i).subscribe(() => {
      this.cargarDatosTallerCurso();
    });
  }

  validar() {
    if (this.acciondemodal == -1) {
      this.crearDatosTallerCurso();
    } else {
      // aca se invoca la funcion de actualizar datos
      this.actualizarTallerCurso();
    }
  }

  tipodemodal(opc: number) {
    if (opc == -1) {
      this.acciondemodal = opc;

      this.nuevatallercurso = new ModeloTallercurso("","","","","","","");

     // console.log('abri modal de creacion');

    } else {

      this.nuevatallercurso = Object.assign({}, this.tallercurso[opc]);

      this.id = this.tallercurso[opc].id;

    //  console.log(this.nuevatallercurso.ubicacion);
    }
  }
}
