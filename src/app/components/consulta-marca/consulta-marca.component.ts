import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta-marca',
  templateUrl: './consulta-marca.component.html',
  styleUrls: ['./consulta-marca.component.css']
})
export class ConsultaMarcaComponent implements OnInit {

  //Ng model
  nombre: string = "";
  descripcion: string = "";
  certificado: string = "";
  estado: boolean = true;
  idPais: number = -1;


  //Pais
  nombrepais: Pais[] = [];

  //Grila
  marca: Marca[] = [];

  constructor(private paisService: PaisService, private marcaService: MarcaService) {
    paisService.listaPais().subscribe(
      (x) => this.nombrepais = x
    );
  }

  listaMarcaPorNombre() {
    this.marcaService.listaMarcaPorNombre(this.nombre, this.descripcion, this.certificado, this.estado ? 1 : 0, this.idPais).subscribe(
      (x) => {

        if (
          this.marca = x.data) {
          Swal.fire('Mensaje', x.mensaje, 'success');
        }
        else {
          Swal.fire('Lista Vacia', x.mensajeErr, 'error')
        }
      }
    );

  }

  ngOnInit(): void {
  }


}