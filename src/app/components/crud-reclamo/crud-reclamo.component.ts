import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reclamo } from 'src/app/models/reclamo.model';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {

  listaClientes: Cliente[] = []
  listaReclamos: Reclamo[] = []
  toggleEstado: number = 1

  txtDescripcion: string = ''
  mensaje: string = ''

  constructor(private clienteService: ClienteService, private reclamoService: ReclamoService) {
      this.listarReclamos()
  }

  ngOnInit(): void {}

  listarReclamos() {
    this.toggleEstado ? this.toggleEstado = 1 : this.toggleEstado = 0

    this.reclamoService.listarReclamos({ descripcion: this.txtDescripcion, estado: this.toggleEstado })
    .subscribe((res: any) => {
      if (res && res.data.length > 0) {
        this.listaReclamos = res.data; this.mensaje = res.mensaje
      } else this.listaReclamos = []
    })
  }

  listarClientes() {
      this.clienteService.listaCliente().subscribe((clientes: Cliente[]) => {this.listaClientes = clientes})
  }

  eliminarReclamo(reclamo: Reclamo) {
      Swal.fire({
          title: 'Eliminación',
          text: 'Estás por eliminar un reclamo de un cliente',
          icon: 'warning',
          showCancelButton: true,
          allowEscapeKey: false,
          allowEnterKey: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
      }).then(res => {
          if(res.isConfirmed) {
              this.reclamoService.eliminar(reclamo.idReclamo)
              Swal.fire({
                  title: 'Reclamo eliminado',
                  icon: 'success'
              })
          } else {
            Swal.fire({
                title: 'Reclamo mantenido',
                text: 'El reclamo se ha salvado de la eliminación',
                icon: 'success'
            })
          }
      })
  }

  actualizaEstado(r: Reclamo) {
    r.estado = r.estado == 0 ? 1 : 0
    this.reclamoService.editarReclamo(r).subscribe()
  }

}
