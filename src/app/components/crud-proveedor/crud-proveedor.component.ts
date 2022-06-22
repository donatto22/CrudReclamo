import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    estado: 1,
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    }
  };
  
  idProveedor: number = -1;


  formRegistrarProveedor = this.formBuilder.group({
    razonsocial: ['', [Validators.required, Validators.maxLength(45)]],
    ruc: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
    direccion: ['', [Validators.required, Validators.maxLength(45)]],
    telefono: ['', [Validators.required,Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
    celular: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
    contacto: ['', [Validators.required, Validators.maxLength(45)]],
    departamentoId: [-1, [Validators.required, Validators.min(1)]],
    provinciaId: [-1, [Validators.required, Validators.min(1)]],
    distritoId: [-1, [Validators.required, Validators.min(1)]],
  });

  formActualizarProveedor = this.formBuilder.group({
    razonsocial: ['', [Validators.required, Validators.maxLength(45)]],
    ruc: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
    direccion: ['', [Validators.required, Validators.maxLength(45)]],
    telefono: ['', [Validators.required,Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
    celular: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
    contacto: ['', [Validators.required, Validators.maxLength(45)]],
    departamentoId: [-1, [Validators.required, Validators.min(1)]],
    provinciaId: [-1, [Validators.required, Validators.min(1)]],
    distritoId: [-1, [Validators.required, Validators.min(1)]],
  });

  constructor(private ubigeoService: UbigeoService,
    private proveedorService: ProveedorService,
    private formBuilder: FormBuilder) { 
      this.ubigeoService.listarDepartamento().subscribe(
        response => this.departamentos = response
      );

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

  ngOnInit(): void {
  }

}
