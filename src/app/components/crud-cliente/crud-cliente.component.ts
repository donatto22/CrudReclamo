import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  filtro: string = "";

  departamentos: string[] = [];;
  provincias: string[] = [];;
  distritos: Ubigeo[] = [];;

  cliente: Cliente = {
    idCliente: 0,
    nombres: "",
    apellidos: "",
    dni: "",
    correo: "",
    estado: 1,
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "-1",
    }
  };

  constructor(private clienteService: ClienteService, private ubigeoService: UbigeoService) {
    this.ubigeoService.listarDepartamento().subscribe(
      response => this.departamentos = response
    );
  }

  cargaProvincia() {
    this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );

    this.cliente!.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.cliente!.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );

    this.cliente!.ubigeo!.idUbigeo = -1;
  }

  ngOnInit(): void {
  }

  consulta() {
    console.log("aea",this.filtro);
    const nombres = this.filtro;
    this.clienteService.listaClienteNombre(nombres).subscribe(
      (x: any) => this.clientes = x.data
    );
  }

  actualizaEstado(aux: Cliente) {
    aux.estado = aux.estado == 0 ? 1 : 0;
    this.clienteService.actualizarCliente(aux).subscribe();
  }

  registra() {
    this.clienteService.insertarCliente(this.cliente).subscribe(
      (x) => {
        document.getElementById("btn_reg_limpiar")?.click();
        document.getElementById("btn_reg_cerrar")?.click();
        alert(x.mensaje);
        this.clienteService.listaCliente().subscribe(
          (x) => this.clientes = x
        );
      }
    );

    this.distritos = [];
    this.provincias = [];

    this.cliente = {
      idCliente: 0,
      nombres: "",
      apellidos: "",
      dni: "",
      correo: "",
      estado: 1,
      ubigeo: {
        idUbigeo: -1,
        departamento: "-1",
        provincia: "-1",
        distrito: "-1",
      }
    }
  }

  buscar(aux: Cliente) {
    this.cliente = aux;

    this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );

    this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );

  }


  actualiza() {
    this.clienteService.actualizarCliente(this.cliente).subscribe(
      (x) => {
        document.getElementById("btn_act_limpiar")?.click();
        document.getElementById("btn_act_cerrar")?.click();
        alert(x.mensaje);
        this.clienteService.listaCliente().subscribe(
          (x) => this.clientes = x
        );
      }
    );

    this.distritos = [];
    this.provincias = [];

    this.cliente = {
      idCliente: 0,
      nombres: "",
      apellidos: "",
      dni: "",
      correo: "",
      estado: 1,
      ubigeo: {
        idUbigeo: -1,
        departamento: "-1",
        provincia: "-1",
        distrito: "-1",
      }
    }
  }
}
