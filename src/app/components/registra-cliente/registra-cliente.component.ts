import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-registra-cliente',
  templateUrl: './registra-cliente.component.html',
  styleUrls: ['./registra-cliente.component.css']
})
export class RegistraClienteComponent implements OnInit {  

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  cliente: Cliente = {
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    }
  }; 

  constructor(private ubigeoService: UbigeoService, private clienteService: ClienteService) {
    this.ubigeoService.listarDepartamento().subscribe(
      (departamentos) => this.departamentos = departamentos);

  }

  insertClient() {
    console.log(this.cliente)
    this.clienteService.insertarCliente(this.cliente).subscribe(
      response => {
        console.log(response.mensaje);
        alert(response.mensaje);
      },
      error => {
        console.log(error);
      }

    );

  }

  listaProvincia() {
    console.log("listaProvincia>>> " + this.cliente.ubigeo?.departamento);
    this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
      (provincias) => this.provincias = provincias
    );
    this.listaDistrito();
  }

  listaDistrito() {
    console.log("listaDistrito>>> " + this.cliente.ubigeo?.departamento);
    console.log("listaDistrito>>> " + this.cliente.ubigeo?.provincia);
    this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
      (distritos) => this.distritos = distritos
    );
  }

  ngOnInit(): void {
  }

}
