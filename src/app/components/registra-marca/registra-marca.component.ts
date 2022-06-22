import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { Pais } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registra-marca',
  templateUrl: './registra-marca.component.html',
  styleUrls: ['./registra-marca.component.css']
})
export class RegistraMarcaComponent implements OnInit {

  paises: Pais[] = [];
  marca: Marca = {
    pais:{
      idPais:-1

    }
  }


  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]{10,50}')]),
    validaFechaV: new FormControl('', [Validators.required]),
    validaCertificado: new FormControl('', [Validators.required, Validators.pattern('[0-9A-Z]{9}')]),
    validaPais: new FormControl(-1, [Validators.min(1)]),
  });

  submitted = false;



  constructor(private paisService: PaisService, private marcaService: MarcaService, /* private toastr: ToastrService */) {

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
  }

  insertaMarca() {

    if (this.formsRegistra.invalid) {
      this.formsRegistra.markAllAsTouched();
      return;
    }

    const data = this.formsRegistra.value

    const objMarca: Marca = {
      nombre: data.validaNombre,
      descripcion: data.validaDescripcion,
      certificado: data.validaCertificado,
      fechaVigencia: data.validaFechaV,
      estado: 1,
      pais: {
        idPais: Number(data.validaPais)
      }
    }

    this.marcaService.insertaMarca(objMarca).subscribe(
      response => {

        //alert(response.mensaje)
        Swal.fire('Mensaje', response.mensaje, 'success');
        console.log(response.mensaje)
      },
      error => {
        //this.toastr.error('Ocurrió error inesperado', 'Error')
        alert('Ocurrió un error')
        console.log(error);
      }
    );

    this.formsRegistra.reset();
  }


  invalidaRegistrar(field: string) {
    return (
      this.formsRegistra.get(field)?.invalid &&
      this.formsRegistra.get(field)?.touched
    );
  }

  ngOnInit(): void {
  }

}
