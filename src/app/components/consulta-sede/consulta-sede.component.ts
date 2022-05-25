import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { Pais } from 'src/app/models/pais.model';
import { SedeService } from 'src/app/services/sede.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  nombre:string="";
  direccion:string="";
  idPais:number = -1;
  estado:boolean= true;
  fecInicio:string="";
  fecFin:string="";

  listaPaises: Pais[] = [];

  sede: Sede[] = [];

  constructor(private paisService: PaisService, private sedeService:SedeService) {

    paisService.listaPais().subscribe(
      (p) => this.listaPaises = p
    );
   }

   consultaSede(){
     alert(this.estado);
     console.log("fecInicio >>>" + this.fecInicio);
     console.log("fecFin >>>" + this.fecFin);

     this.sedeService.listaSedeFiltro(this.nombre, this.direccion, this.idPais, this.estado?1:0, this.fecInicio, this.fecFin).subscribe(
       (s)=> {
         this.sede = s.lista;
         alert(s.mensaje);
       }

     );

   }


  ngOnInit(): void {
  }

}
