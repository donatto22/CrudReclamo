import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {

  descripcion: string = ""
  selTipoReclamo: string = "-1"
  selIdCliente: string = "-1"
  estado: boolean = true;

  tipoReclamos: TipoReclamo[] = []
  clientes: Cliente[] = []

  reclamos: Reclamo[] = []


  constructor(private TipoReclamoService: TipoReclamoService, private ClienteService: ClienteService, private service: ReclamoService) {
    this.TipoReclamoService.listaTipoReclamo().subscribe(r => this.tipoReclamos = r)
    this.ClienteService.listaCliente().subscribe(c => this.clientes = c)

    console.log(this.clientes)
  }

  listaReclamos() {
    this.service.listarReclamos({
      descripcion: this.descripcion,
      tipoReclamo: this.selTipoReclamo,
      idCliente: this.selIdCliente,
      estado: this.estado ? 1 : 0})
    .subscribe(x => this.reclamos = x.data)
  }

  ngOnInit(): void {
    this.listaReclamos()
  }


}

