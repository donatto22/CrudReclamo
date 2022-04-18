import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { Pais } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registra-marca',
  templateUrl: './registra-marca.component.html',
  styleUrls: ['./registra-marca.component.css']
})
export class RegistraMarcaComponent implements OnInit {

  paises: Pais[] = [];
  marca: Marca = {
    pais:{
      idPais:-1

    }
  }

  constructor(private paisService: PaisService, private marcaService: MarcaService) {

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
  }

  insertaMarca() {
    this.marcaService.insertaMarca(this.marca).subscribe(
      response => {
        alert(response.mensaje);
      },
      error => {
        alert(error);
        console.log(error);
      }

    );
  }

  ngOnInit(): void {
  }

}
