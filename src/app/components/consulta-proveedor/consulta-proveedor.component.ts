import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';


@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {

  razonsocial: string = "";
  ruc: string = "";
  celular: string = "";
  contacto: string = "";
  estado: boolean = true;

  proveedores: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService) {

   }

   filtroProveedor() {
    this.proveedorService.filtroProveedor(this.razonsocial, this.ruc, this.celular, this.contacto,this.estado ? 1 : 0)
    .subscribe(  
      (x) => {
        this.proveedores = x.data;
        alert(x.mensaje);
      }
    )
  }

  ngOnInit(): void {
    this.filtroProveedor()
  }

}
