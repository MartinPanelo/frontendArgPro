import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Chart, registerables, Color } from 'chart.js';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { ModeloSkill } from 'src/app/modelos/modelo-skill';
import { SkillService } from 'src/app/servicio/skill.service';
import { TokenService } from 'src/app/servicio/token.service';
Chart.register(...registerables);

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {

   // PolarArea-------------------------
  public datosnumeroblandas: number[] = [0];
  public datospalabrasblandas: string[] = [''];
  refreshblandas = false;
  public polarAreaChartLabels: string[] = this.datospalabrasblandas; //[ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales' ];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: [
      {
        data: this.datosnumeroblandas, //[ 300, 500, 100, 40, 120 ],
        label: 'Series 1',
      },
    ],
  };
  // events
  public chartClicked({event,active,}: {event: ChartEvent;active: {}[];}): void {console.log(event, active);}
  public chartHovered({event,active,}: {event: ChartEvent;active: {}[];}): void {console.log(event, active);}
  datosgrafico: ModeloSkill[] = [];
  // PolarArea-------------------------



   // Radar--------------------------
   public datosnumeroduras: number[] = [0];
   public datospalabrasduras: string[] = [''];


   public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements:{
      point:{
        radius: 7,
        pointStyle: 'rectRounded'
      }
    },
    scales: {

      r: {
          angleLines: {
              display: false
          },
          suggestedMin: 0,
          suggestedMax: 10
      }      
  },
  plugins:{
    legend: {      
     display: false,       
    }
   }
  };
  public radarChartLabels: string[] =  this.datospalabrasduras;//[ 'Eating', 'Drinking', 'Sleeping'];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: this.datosnumeroduras,
        label: ''}, //[ 65, 59, 90, 81, 56, 55, 40 ],
        
    ]
  };
  public radarChartType: ChartType = 'radar';
  // Radar--------------------------



  labelPosition: 'true' | 'false' = 'false';
  skill: ModeloSkill[] = [];
  //-------------------------
  acciondemodal: number;
  id: number;
  nuevaskill: ModeloSkill = new ModeloSkill('', '', '');

  constructor(
    private skillS: SkillService,
    private tokenService: TokenService
  ) {}
  islogged = false;

  ngOnInit(): void {
    this.cargarDatosskill();
    if (this.tokenService.getToken()) {
      this.islogged = true;
    } else {
      this.islogged = false;
    }

    // this.educacionS.detail(1).subscribe(data => {this.nuevaeducacion = data})
  }

  cargarDatosskill(): void {
    this.skillS.getdato().subscribe((data) => {
      this.skill = data;
      this.datosgrafico = data;
      this.refreshblandas = false;
      this.refescargrafico();
    });
  }

  refescargrafico() {
    this.datosnumeroblandas.splice(0);
    this.datospalabrasblandas.splice(0);
    this.datosnumeroduras.splice(0);
    this.datospalabrasduras.splice(0);



    for (let i = 0; i < this.datosgrafico.length; i++) {
      
      if(this.datosgrafico[i].tipo ===("true")){

        this.datosnumeroduras.push(this.datosgrafico[i].valor as any);
        this.datospalabrasduras.push(this.datosgrafico[i].nombre)
       /*
        this.datosnumeroduras[i] = this.datosgrafico[i].valor as any;
      this.datospalabrasduras[i] = this.datosgrafico[i].nombre;
      */
      }else{
        this.datosnumeroblandas.push(this.datosgrafico[i].valor as any);
        this.datospalabrasblandas.push(this.datosgrafico[i].nombre)
      }

/*
      this.datosnumeroblandas[i] = this.datosgrafico[i].valor as any;
      this.datospalabrasblandas[i] = this.datosgrafico[i].nombre;
*/
    }
    this.refreshblandas = true;

    // como actualizao el bicho
  }

















  crearDatosskill(): void {
    const Ed = new ModeloSkill(
      this.nuevaskill.nombre,
      this.nuevaskill.valor,
      this.nuevaskill.tipo
    );
    this.skillS.save(Ed).subscribe(() => {
      this.cargarDatosskill();
      this.refreshblandas = false;
    });

    //  this.educacionS.detail(this.id).subscribe((data) => {this.nuevaeducacion = data;});
  }

  actualizarSkill(): void {
    // falta el indice

    this.skillS.update(this.id, this.nuevaskill).subscribe(() => {
      this.cargarDatosskill();
      this.refreshblandas = false;
    });
  }

  borraritem(i: number) {
    console.log(i);
    this.skillS.borrar(i).subscribe(() => {
      this.refreshblandas = false;
      this.cargarDatosskill();
    });
  }

  validar() {
    if (this.acciondemodal == -1) {
      this.crearDatosskill();
    } else {
      // aca se invoca la funcion de actualizar datos
      this.actualizarSkill();
    }
  }

  tipodemodal(opc: number) {
    if (opc == -1) {
      this.acciondemodal = opc;

      this.nuevaskill = new ModeloSkill('', '', 'true');

      console.log('abri modal de creacion' + this.id);
    } else {
      this.nuevaskill = Object.assign({}, this.skill[opc]);
     
      this.id = this.skill[opc].id;
    }
  }
}
