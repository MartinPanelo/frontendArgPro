import { Component, OnInit } from '@angular/core';
import { acercade } from 'src/app/modelos/modelo.acerca';
import { AcercadeService } from 'src/app/servicio/acercade.service';
import { TokenService } from 'src/app/servicio/token.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit { 
   acerca: acercade[]= [];

   //-------------------------
   updateacerca:acercade = new acercade("","","","","","","");
  constructor(private acercaS: AcercadeService ,/*private acercaSu: AcercadeService,*/ private router: Router, private tokenService : TokenService) {}
  islogged = false;

  //-------------------------

  ngOnInit(): void {
    this.cargarDatosAcerca();
    if(this.tokenService.getToken()){

      this.islogged = true;
    }else{
      this.islogged = false;
    }
   

  

    this.acercaS.detail(1).subscribe(data => {this.updateacerca = data; })
   
  }
 

    cargarDatosAcerca(): void {
    this.acercaS.getdato().subscribe(data => {this.acerca = data; });    
    }


    actualizarAcerca():void{
     const id = 1;
     this.acercaS.update(id,this.updateacerca).subscribe(() =>{ this.cargarDatosAcerca();})



     

    }
  
  
}
