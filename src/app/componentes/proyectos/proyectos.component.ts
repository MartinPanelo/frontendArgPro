import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloProyecto } from 'src/app/modelos/modelo-proyecto';
import { ProyectoService } from 'src/app/servicio/proyecto.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyecto: ModeloProyecto[] = [];

  //-------------------------
  acciondemodal: number;
  id: number;

  nuevaproyecto: ModeloProyecto = new ModeloProyecto("","","","","");

  constructor(
    private proyectoS: ProyectoService,
    private router: Router,
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
   
    // this.educacionS.detail(1).subscribe(data => {this.nuevaeducacion = data})
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
    this.proyectoS.save(Ed).subscribe(() => {this.cargarDatosProyecto(); });

  //  this.educacionS.detail(this.id).subscribe((data) => {this.nuevaeducacion = data;});
  }

  actualizarProyecto(): void {
    // falta el indice

    this.proyectoS.update(this.id, this.nuevaproyecto).subscribe(() => {
      this.cargarDatosProyecto();
    });
  }
  
  borraritem(i: number) {
   // console.log(i);
    this.proyectoS.borrar(i).subscribe(() => {
      this.cargarDatosProyecto();
    });
  }

  validar() {
    if (this.acciondemodal == -1) {
      this.crearDatosProyecto();
    } else {
      // aca se invoca la funcion de actualizar datos
      this.actualizarProyecto();
    }
  }

  tipodemodal(opc: number) {
    if (opc == -1) {
      this.acciondemodal = opc;

      this.nuevaproyecto = new ModeloProyecto('', '', '', '', '');

   //   console.log('abri modal de creacion' + this.id );

    } else {

      this.nuevaproyecto = Object.assign({}, this.proyecto[opc]);
    //  console.log(this.proyecto[opc].id)
      this.id = this.proyecto[opc].id;

     
    }
  }
}
