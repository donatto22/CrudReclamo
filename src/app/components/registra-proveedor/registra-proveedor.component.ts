import { Component, OnInit } from '@angular/core';
import { Ubigeo } from '../../models/ubigeo.model';
import { UbigeoService } from '../../services/ubigeo.service';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-registra-proveedor',
  templateUrl: './registra-proveedor.component.html',
  styleUrls: ['./registra-proveedor.component.css']
})
export class RegistraProveedorComponent implements OnInit {
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];
  
  objProveedor: Proveedor = {
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    }
   
  };

  constructor(private ubigeoService: UbigeoService, private proveedorService: ProveedorService, /* private toastr: ToastrService */) {
    this.ubigeoService.listarDepartamento().subscribe(
      (departamentos) => this.departamentos = departamentos);

  }

  insertProveedor() {
    this.proveedorService.insertarProveedor(this.objProveedor).subscribe(
      res => {
        
        alert(res.mensaje)
      },
      err => {
        console.log(err);
      }
    );
  }

  listaProvincia() {
    console.log("listaProvincia>>> " + this.objProveedor.ubigeo?.departamento);
    this.ubigeoService.listaProvincias(this.objProveedor.ubigeo?.departamento).subscribe(
      (provincias) => this.provincias = provincias
    );
    this.listaDistrito();
  }

  listaDistrito() {
    console.log("listaDistrito>>> " + this.objProveedor.ubigeo?.departamento);
    console.log("listaDistrito>>> " + this.objProveedor.ubigeo?.provincia);
    this.ubigeoService.listaDistritos(this.objProveedor.ubigeo?.departamento, this.objProveedor.ubigeo?.provincia).subscribe(
      (distritos) => this.distritos = distritos
    );
  }

  ngOnInit(): void {
  }

}
