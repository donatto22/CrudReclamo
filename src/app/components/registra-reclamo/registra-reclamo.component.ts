import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {

  tipoReclamos: TipoReclamo[] = []
  clientes: Cliente[] = []

  reclamo: Reclamo = {
    cliente: {
      idCliente: -1
    },
    tipoReclamo: {
      idTipoReclamo: -1
    }
  }

  constructor(private TipoReclamoService: TipoReclamoService, private ClienteService: ClienteService, private ReclamoService: ReclamoService, private toastr: ToastrService) {
    this.TipoReclamoService.listaTipoReclamo().subscribe(r => this.tipoReclamos = r)
    this.ClienteService.listaCliente().subscribe(c => this.clientes = c)
  }

  ngOnInit(): void {
  }

  insertarReclamo() {
    this.validarCampos()
    return this.ReclamoService.insertarReclamo(this.reclamo).subscribe(
      res => this.toastr.success('Reclamo registrado', 'Reclamo'),
      
      err => {
        this.toastr.error('Error al reclamar', 'Reclamo')
      }
    )
  }

  validarCampos() {

    if(this.reclamo.tipoReclamo?.idTipoReclamo == -1 && this.reclamo.cliente?.idCliente == -1 && 
      typeof this.reclamo.fechaCompra == 'undefined') {

      this.toastr.error('Completa los datos', 'Reclamo')
      return
    }
    
    if(this.reclamo.tipoReclamo?.idTipoReclamo == -1) {
      this.toastr.warning('Selecciona tu tipo de marca', 'Reclamo')
      return
    }

    if(this.reclamo.cliente?.idCliente == -1) {
      this.toastr.warning('Debe seleccionar el cliente', 'Reclamo')
      return
    }

    if(typeof this.reclamo.fechaCompra == 'undefined') {
      this.toastr.warning('Establezca la fecha de compra', 'Reclamo')
      return
    }
  }
}
