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

  proveedor: Proveedor = {
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
      distrito: "-1",
    }
  };

  formRegistrarProveedor = new FormGroup({
    razonsocial: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    ruc: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    contacto: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    departamentoId: new FormControl('', [Validators.required, Validators.min(1)]),
    provinciaId: new FormControl('', [Validators.required, Validators.min(1)]),
    distritoId: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  formActualizarProveedor = new FormGroup({
    razonsocial: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    ruc: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    contacto: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    departamentoId: new FormControl('', [Validators.required, Validators.min(1)]),
    provinciaId: new FormControl('', [Validators.required, Validators.min(1)]),
    distritoId: new FormControl('', [Validators.required, Validators.min(1)]),
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
    this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );

    this.proveedor!.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.proveedor!.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );

    this.proveedor!.ubigeo!.idUbigeo = -1;
  }

  limpiarModalRegistrar() {
    this.formRegistrarProveedor.reset(
      {
        departamentoId:-1,
        provinciaId: -1,
        distritoId: -1
      }
    );
    this.proveedor.idProveedor=0;
    this.proveedor.ubigeo={
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "-1",
    };
    this.consultarProveedores();
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

    this.proveedorService.insertarProveedor(this.proveedor).subscribe(
      (x) => {
        console.log(x);
        this.submitted = false;
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
        this.consultarProveedores();
      }
    );

    this.distritos = [];
    this.provincias = [];

    this.proveedor = {
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
        distrito: "-1",
      }
    }
  }

}
