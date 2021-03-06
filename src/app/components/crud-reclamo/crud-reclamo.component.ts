import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reclamo } from 'src/app/models/reclamo.model';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import Swal from 'sweetalert2';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {
  listaClientes: Cliente[] = []
  listaReclamos: Reclamo[] = []
  listaTipoReclamos: TipoReclamo[] = []
  toggleEstado: number = 1

  txtDescripcion: string = ''
  mensaje: string = ''

  formCrearReclamo = this.formBuilder.group({
    descripcion: ['', [Validators.required, Validators.maxLength(120)]],
    fechaCompra: ['', [Validators.required]],
    idCliente: [-1, [Validators.required, Validators.min(1)]],
    tipoReclamo: [-1, [Validators.required, Validators.min(1)]]
  })

  formEditarReclamo = this.formBuilder.group({
    descripcion: ['', [Validators.required, Validators.maxLength(120)]],
    fechaCompra: ['', [Validators.required]],
    idCliente: [-1, [Validators.required, Validators.min(1)]],
    tipoReclamo: [-1, [Validators.required, Validators.min(1)]]
  })

  objReclamo: Reclamo = {
    estado: 1,
    cliente: {
      idCliente: -1
    },
    tipoReclamo: {
      idTipoReclamo: -1
    }
  }

  idReclamo: number = -1

  constructor(private clienteService: ClienteService,
    private reclamoService: ReclamoService,
    private tipoReclamoService: TipoReclamoService,
    private formBuilder: FormBuilder
    ) {
      this.listarReclamos()
      this.listarClientes()
      this.listarTipoReclamos()
  }

  ngOnInit(): void {}

  listarReclamos() {
    this.toggleEstado ? this.toggleEstado = 1 : this.toggleEstado = 0

    this.reclamoService.listarReclamos({ descripcion: this.txtDescripcion, estado: this.toggleEstado })
    .subscribe((res: any) => {
      if (res && res.data && res.data.length > 0) {
        this.listaReclamos = res.data; this.mensaje = res.mensaje
      } else this.listaReclamos = []
    })
  }

  cleanForm() {
    this.formCrearReclamo.reset({ idCliente: -1, tipoReclamo: -1 })
  }

  listarClientes() {
      this.clienteService.listaCliente().subscribe((clientes: Cliente[]) => { this.listaClientes = clientes })
  }

  analize(field: string, number: number) {
    return number == 1 ? (this.formCrearReclamo.get(field)?.invalid && this.formCrearReclamo.get(field)?.touched) :
    (this.formEditarReclamo.get(field)?.invalid && this.formEditarReclamo.get(field)?.touched)
  }

  listarTipoReclamos() {
      this.tipoReclamoService.listaTipoReclamo().subscribe((tipoReclamos: TipoReclamo[]) => { this.listaTipoReclamos = tipoReclamos })
  }

  eliminarReclamo(reclamo: Reclamo) {
      Swal.fire({
          title: 'Eliminaci??n',
          text: 'Est??s por eliminar un reclamo de un cliente',
          icon: 'warning',
          showCancelButton: true,
          allowEscapeKey: false,
          allowEnterKey: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
      }).then(res => {
          if(res.isConfirmed) {
              this.reclamoService.eliminar(reclamo.idReclamo).subscribe(() => this.listarReclamos())
              Swal.fire({
                  title: 'Reclamo eliminado',
                  icon: 'success'
              })
          } else {
            Swal.fire({
                title: 'Reclamo mantenido',
                text: 'El reclamo se ha salvado de la eliminaci??n',
                icon: 'success'
            })
          }
      })
  }

  actualizaEstado(r: Reclamo) {
    r.estado = r.estado == 0 ? 1 : 0
    this.reclamoService.editarReclamo(r).subscribe()
  }

  crearReclamo() {
    if(this.formCrearReclamo.invalid) {
      this.formCrearReclamo.markAllAsTouched()
      return
    }

    const data = this.formCrearReclamo.value

    this.objReclamo = {
      descripcion: data.descripcion,
      fechaCompra: data.fechaCompra,
      cliente: {
        idCliente: data.idCliente
      },
      tipoReclamo: {
        idTipoReclamo: data.tipoReclamo
      }
    }

    this.reclamoService.insertarReclamo(this.objReclamo).subscribe(() => {
      this.idReclamo = 0
      this.formCrearReclamo.reset({
        idCliente: -1,
        tipoReclamo: -1
      })

      document.getElementById('btnCerrarCrear')?.click()
      Swal.fire('Registro reclamo', 'Proceso de registro completo', 'success')
      this.listarReclamos()
    })
  }

  llenarCampos(r: any) {
    this.idReclamo = Number(r.idReclamo)

    this.formEditarReclamo.reset({
      descripcion: r.descripcion,
      fechaCompra: r.fechaCompra,
      idCliente: r.cliente?.idCliente,
      tipoReclamo: r.tipoReclamo?.idTipoReclamo
    })
  }

  editarReclamo() {
    if(this.formEditarReclamo.invalid) {
      this.formEditarReclamo.markAllAsTouched()
      return
    }

    const data = this.formEditarReclamo.value

    const reclamo: Reclamo = {
      idReclamo: this.idReclamo,
      descripcion: data.descripcion,
      fechaCompra: data.fechaCompra,
      cliente: {
        idCliente: data.idCliente
      },
      tipoReclamo: {
        idTipoReclamo: data.tipoReclamo
      },
      estado: 1
    }

    this.reclamoService.editarReclamo(reclamo).subscribe(res => {
      document.getElementById('btnCerrarEditar')?.click()
      Swal.fire('Modificaci??n reclamo', 'Proceso de actualizaci??n completo', 'success')
      this.listarReclamos()
    })
  }
}
