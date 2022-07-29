import { Component, OnInit } from '@angular/core';
import { ModeloProyecto } from 'src/app/modelos/modelo-proyecto';
import { ProyectoService } from 'src/app/servicio/proyecto.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  proyecto: ModeloProyecto[] = [];

  //-------------------------
  acciondemodal: number;
  id: number;

  nuevaproyecto: ModeloProyecto = new ModeloProyecto('', '', '', '', '');

  constructor(
    private proyectoS: ProyectoService,
    private tokenService: TokenService
  ) {}
  islogged = false;

  ngOnInit(): void {
    this.cargarDatosProyecto();
    if (this.tokenService.getToken()) {
      this.islogged = true;
    } else {
      this.islogged = false;
    }
  }

  cargarDatosProyecto(): void {
    this.proyectoS.getdato().subscribe((data) => {
      this.proyecto = data;
    });
  }

  crearDatosProyecto(): void {
    const Ed = new ModeloProyecto(
      this.nuevaproyecto.nombre,
      this.nuevaproyecto.fecha,
      this.nuevaproyecto.detalle,
      this.nuevaproyecto.link,
      this.nuevaproyecto.foto
    );
    this.proyectoS.save(Ed).subscribe(() => {
      this.cargarDatosProyecto();
    });
  }

  actualizarProyecto(): void {
    this.proyectoS.update(this.id, this.nuevaproyecto).subscribe(() => {
      this.cargarDatosProyecto();
    });
  }

  borraritem(i: number) {
    this.proyectoS.borrar(i).subscribe(() => {
      this.cargarDatosProyecto();
    });
  }

  validar() {
    if (this.acciondemodal == -1) {
      this.crearDatosProyecto();
    } else {
      this.actualizarProyecto();
    }
  }

  tipodemodal(opc: number) {
    if (opc == -1) {
      this.acciondemodal = opc;

      this.nuevaproyecto = new ModeloProyecto('', '', '', '', '');
    } else {
      this.nuevaproyecto = Object.assign({}, this.proyecto[opc]);

      this.id = this.proyecto[opc].id;
    }
  }
}
