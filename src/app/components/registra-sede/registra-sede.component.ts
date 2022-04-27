import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registra-sede',
  templateUrl: './registra-sede.component.html',
  styleUrls: ['./registra-sede.component.css']
})
export class RegistraSedeComponent implements OnInit {

  listaPaises: Pais[] = [];

  objSede: Sede = {
    pais: {
      idPais: -1,
    },
  };

  constructor(private paisService: PaisService, private sedeService: SedeService, /*private toastr: ToastrService*/) {
    this.paisService.listaPais().subscribe(p => this.listaPaises = p)
  }

  ngOnInit(): void {
  }

  public registrarSede() {
    if (this.objSede.pais?.idPais == -1) {
      alert('Seleccione un pais');
      return;
    }

    this.sedeService.insertaActualizaSede (this.objSede).subscribe(
      (response) => {
        //this.toastr.success(response?.mensaje, 'Sede')
        alert('Sede registrado')
      },
      (error) => {
        //this.toastr.error(error?.mensaje, 'Sede')
        alert('Error sede')
        console.log(error?.mensaje);
      }
    );
  }

}
