import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

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

  constructor(private paisService: PaisService,
    
    private sedeService: SedeService
  ) {
    this.llenarCombos();
  }

  ngOnInit(): void {
  }

  private llenarCombos() {
    this.cargarPaises();
    
  }

  private cargarPaises() {
    this.paisService.listaPais().subscribe((paises: Pais[]) => {
      if (paises && paises.length > 0) {
        this.listaPaises = paises;
      }
    });
  }

  public registrarSede() {
    if (this.objSede.pais?.idPais == -1) {
      alert('Seleccione un pais');
      return;
    }

    this.sedeService.insertaActualizaSede (this.objSede).subscribe(
      (response) => {
        alert(response?.mensaje);
      },
      (error) => {
        alert(error?.mensaje);
      }
    );
  }

}
