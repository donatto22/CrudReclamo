import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { Ubigeo } from '../../models/ubigeo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  listaProveedor: Proveedor[] = [];
  mensajeDeConsulta: string = '';

  filtroRazonRuc: string = '';
  filtroEstado: number = 1;

  objProveedor: Proveedor = {
    idProveedor: 0,
    razonsocial: "",
    ruc: "",
    direccion: "",
    telefono: "",
    celular: "",
    contacto: "",
    estado: 1,
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    }
  };

  idProveedor: number = -1;


  formRegistrarProveedor = new FormGroup({
    razonsocial: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    ruc: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    contacto: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    departamentoId: new FormControl(-1, [Validators.required, Validators.min(1)]),
    provinciaId: new FormControl(-1, [Validators.required, Validators.min(1)]),
    distritoId: new FormControl(-1, [Validators.required, Validators.min(1)]),
  });

  formActualizarProveedor = new FormGroup({
    razonsocial: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    ruc: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    contacto: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    departamentoId: new FormControl(-1, [Validators.required, Validators.min(1)]),
    provinciaId: new FormControl(-1, [Validators.required, Validators.min(1)]),
    distritoId: new FormControl(-1, [Validators.required, Validators.min(1)]),
  });

  submitted = false;

  constructor(private ubigeoService: UbigeoService,
    private proveedorService: ProveedorService) {
    this.ubigeoService.listarDepartamento().subscribe(
      response => this.departamentos = response
    );
    this.consultarProveedores();
  }

  cargaProvincia() {
    this.ubigeoService.listaProvincias(this.objProveedor.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );

    this.objProveedor!.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.objProveedor!.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.objProveedor.ubigeo?.departamento, this.objProveedor.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );

    this.objProveedor!.ubigeo!.idUbigeo = -1;
  }

  consultarProveedores() {
    if (this.filtroEstado) {
      this.filtroEstado = 1;
    } else {
      this.filtroEstado = 0;
    }

    this.proveedorService
      .consultarProveedor({ ruc: this.filtroRazonRuc, estado: this.filtroEstado })
      .subscribe(
        (res: any) => {
          this.mensajeDeConsulta = res.mensaje;
          if (res && res.data && res.data.length > 0) {
            this.listaProveedor = res.data;
          } else {
            this.listaProveedor = [];
          }
        },
        (err) => {
          console.log('HAY UN ERROR :: ', err);
        }
      );
  }

  ngOnInit(): void {
  }

  registraProveedor() {
    this.submitted = true;

    if (this.formRegistrarProveedor.invalid) {
      return;
    }

    this.submitted = false;

    this.proveedorService.insertarProveedor(this.objProveedor).subscribe(
      (x) => {
        this.submitted = false;
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
        this.consultarProveedores();
      }
    );

    this.distritos = [];
    this.provincias = [];

    this.objProveedor = {
      idProveedor: 0,
      razonsocial: "",
      ruc: "",
      direccion: "",
      telefono: "",
      celular: "",
      contacto: "",
      estado: 1,
      ubigeo: {
        idUbigeo: -1,
        departamento: "-1",
        provincia: "-1",
        distrito: "",
      }
    }
  }

}
