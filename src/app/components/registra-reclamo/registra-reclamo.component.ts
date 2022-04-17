import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {

  tipoReclamos: TipoReclamo[] = []
  clientes: Cliente[] = []

  fecha = new Date().getFullYear() + '-0' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  tiempo = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()

  reclamo: Reclamo = {
    fechaRegistro: this.fecha + ' ' + this.tiempo,
    cliente: {
      idCliente: -1
    },
    tipoReclamo: {
      idTipoReclamo: -1
    }
  }

  constructor(private TipoReclamoService: TipoReclamoService, private ClienteService: ClienteService, private ReclamoService: ReclamoService) {
    this.TipoReclamoService.listaTipoReclamo().subscribe(r => this.tipoReclamos = r)
    this.ClienteService.listaCliente().subscribe(c => this.clientes = c)
  }

  ngOnInit(): void {
  }

  insertarReclamo() {
    return this.ReclamoService.insertarReclamo(this.reclamo).subscribe(
      res => {
        alert('Registro exitoso')
      },

      err => {
        console.error(err)
      }
    )
  }

}
