import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

const date = document.querySelector('input[type="date"]')
@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})

export class ConsultaClienteComponent implements OnInit {

  nombres: string = "";
  apellidos: string = "";
  dni: string = "";
  selDepartamento: string = "-1";
  selProvincia: string = "-1";
  selDistrito: number = -1;
  estado: boolean = true;

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  clientes: Cliente[] = [];

  constructor(private ubigeoService: UbigeoService, private clienteService: ClienteService) {
    this.ubigeoService.listarDepartamento().subscribe(
      (departamentos) => this.departamentos = departamentos);

  }

  listaProvincia() {
    this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
      (x) => this.provincias = x
    );
    this.selProvincia = "-1";
    this.distritos = [];
    this.selDistrito = -1;
  }

  listaDistrito() {
    this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
      (x) => this.distritos = x
    );
    this.selDistrito = -1;
  }

  filtroCliente() {
    this.clienteService.filtroCliente(this.nombres, this.apellidos, this.dni, this.selDistrito, this.estado?1:0).subscribe(
      (x) => {
        this.clientes = x.data;
        alert(x.mensaje);
      }
    );
  }

  ngOnInit(): void {
  }

}
