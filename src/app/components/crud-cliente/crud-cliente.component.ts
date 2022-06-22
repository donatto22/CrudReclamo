import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

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

  formsRegistra = new FormGroup({
    validaNombres: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{3,30}')]),
    validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{3,30}')]),
    validaFecha: new FormControl('', [Validators.required, Validators.pattern('[0-9-/]{10}')]),
    validaDni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    validaCorreos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]),
    validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ0-9 ]{3,150}')]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
  });

  formsActualiza = new FormGroup({
    validaNombres: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{3,30}')]),
    validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]{3,30}')]),
    validaFecha: new FormControl('', [Validators.required, Validators.pattern('[0-9-/]{10}')]),
    validaDni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    validaCorreos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]),
    validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ0-9 ]{3,150}')]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  submitted = false;

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

  limpiarModalRegistrar() {
    this.formsRegistra.reset(
      {
        validaDepartamento:-1,
        validaProvincia: -1,
        validaDistrito: -1
      }
    );
    this.cliente.idCliente=0;
    this.cliente.ubigeo={
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "-1",
    };
    this.clienteService.listaCliente().subscribe(
      (x) => this.clientes = x
    );
  }

  ngOnInit(): void {
    this.clienteService.listaCliente().subscribe(
      (x) => this.clientes = x
    );
  }

  consulta() {
    const dni = this.filtro;
    this.clienteService.listaClienteNombre(dni).subscribe(
      (x: any) => this.clientes = x.data
    );
  }

  actualizaEstado(aux: Cliente) {
    let titulo = '¿Estás seguro de eliminar al cliente?';
    let texto = '¡Esta acción es reversible!';
    let btnTexto = '¡Sí, eliminar!';
    let titulo2 = '¡Eliminado!';
    let texto2 = '¡Cliente eliminado!';

    if (aux.estado == 0) {
      titulo = '¿Estás seguro de habilitar cliente?'
      texto = '¡Esta acción es reversible!';
      btnTexto = '¡Sí, habilitado!';
      titulo2 = '¡Habilitado!';
      texto2 = '¡Cliente habilitado!';
    }

    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: btnTexto
    }).then((result) => {
      if (result.isConfirmed) {
        aux.estado = aux.estado == 0 ? 1 : 0;
        this.clienteService.actualizarCliente(aux).subscribe(
          (x) => {
            Swal.fire(
              titulo2,
              texto2,
              'success'
            )
            this.clienteService.listaCliente().subscribe(
              (x) => this.clientes = x
            );
          }
        );
      } else {
        aux.estado = aux.estado == 0 ? 0 : 1;
        this.clienteService.listaCliente().subscribe(
          (x) => this.clientes = x
        );
      }
    })
  }

  registra() {
    this.submitted = true;

    if (this.formsRegistra.invalid) {
      return;
    }

    this.submitted = false;

    this.clienteService.insertarCliente(this.cliente).subscribe(
      (x) => {
        this.submitted = false;
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
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
    this.submitted = true;
    if (this.formsActualiza.invalid) {
      return;
    }
    this.submitted = false;
    this.clienteService.actualizarCliente(this.cliente).subscribe(
      (x) => {
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
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
