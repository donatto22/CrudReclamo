import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {

  marcas: Marca[] = [];
  filtro: string = "";

  nombrepais: Pais[] = [];

  idmarca = -1

  marca: Marca = {
    idMarca: 0,
    nombre: "",
    descripcion: "",
    certificado: "",
    estado: 1,
    pais: {
      idPais: 1,
      iso: "",
      nombre: "",
    }
  };

  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]{10,50}')]),
    validaFechaV: new FormControl('', [Validators.required]),
    validaCertificado: new FormControl('', [Validators.required, Validators.pattern('[0-9A-Z]{9}')]),
    validaPais: new FormControl(-1, [Validators.min(1)]),
  });

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]{3,50}')]),
    validaFechaV: new FormControl('', [Validators.required]),
    validaCertificado: new FormControl('', [Validators.required, Validators.pattern('[0-9A-Z]{9}')]),
    validaPais: new FormControl(-1, [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  submitted = false;

  constructor(private marcaService: MarcaService, private paisService: PaisService, private formBuilder: FormBuilder) {
    this.paisService.listaPais().subscribe(
      response => this.nombrepais = response
    );
  }

  ngOnInit(): void {
  }


  consultaMarca() {
    this.marcaService.listadoMarca(this.filtro == "" ? "todos" : this.filtro).subscribe(
      (x) => this.marcas = x
    );
  }


  registraMarca() {
    /*this.submitted = true;

    if (this.formsRegistra.invalid) {
      return;
    }

    this.submitted = false;*/

    if (this.formsRegistra.invalid) {
      this.formsRegistra.markAllAsTouched();
      /*console.log("invalido ",this.formsRegistra.value);
      console.log(this.formsRegistra.errors)
      console.log(this.formsRegistra.get("validaNombre")?.errors)
      console.log(this.formsRegistra.get("validaDescripcion")?.errors)
      console.log(this.formsRegistra.get("validaFechaV")?.errors)
      console.log(this.formsRegistra.get("validaCertificado")?.errors)
      console.log(this.formsRegistra.get("validaPais")?.errors)*/
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


    this.marcaService.registraMarca(objMarca).subscribe(
      (x) => {
        document.getElementById("btn_reg_cerrar")?.click();

        /*    Swal.fire('Mensaje', x.mensaje,'info');    */
        Swal.fire('Mensaje', x.mensaje, 'success');

        this.marcaService.listadoMarca(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.marcas = x
        );
      }
    );

    /*this.nombrepais = [];*/
    this.formsRegistra.reset();
  }



  buscaMarca(obj: Marca) {
    this.idmarca = Number(obj.idMarca)
    this.formsActualiza.reset({
      validaNombre: obj.nombre,
      validaDescripcion: obj.descripcion,
      validaFechaV: obj.fechaVigencia,
      validaCertificado: obj.certificado,
      validaPais: Number(obj.pais?.idPais),
      validaEstado: obj.estado
    })

    console.log(obj)

    /*this.paisService.listaPais().subscribe(
      response => this.nombrepais = response
    );*/
  }



  actualizaMarca() {
    /*this.submitted = true;

    if (this.formsActualiza.invalid) {
      return;
    }

    this.submitted = false;*/

    if (this.formsActualiza.invalid) {
      this.formsActualiza.markAllAsTouched();
      console.log("invalida", this.formsActualiza.value)
      return;

    }


    const data = this.formsActualiza.value

    const objMarca: Marca = {
      idMarca: this.idmarca,
      nombre: data.validaNombre,
      descripcion: data.validaDescripcion,
      certificado: data.validaCertificado,
      fechaVigencia: data.validaFechaV,
      estado: 1,
      pais: {
        idPais: Number(data.validaPais)
      }
    }

    console.log(objMarca)

    this.marcaService.actualizaMarca(objMarca).subscribe(
      (x) => {
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
        this.marcaService.listadoMarca(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.marcas = x
        );
      }
    );

    /*this.nombrepais = [];*/

    /*this.marca = {
      idMarca: 0,
      nombre: "",
      descripcion: "",
      certificado: "",
      estado: 1,
      pais: {
        idPais: -1,
        iso: "",
        nombre: "",
      }
    }*/

  }



  actualizaEstado(obj: Marca) {
    this.marca = obj;

    if (obj.estado == 0) {
      obj.estado = 1;
    } else {
      obj.estado = 0;
    }

    this.marcaService.actualizaMarca(this.marca).subscribe();
  }



  invalidaRegistrar(field: string) {
    return (
      this.formsRegistra.get(field)?.invalid &&
      this.formsRegistra.get(field)?.touched
    );
  }

  invalidaActualizar(field: string) {
    return (
      this.formsActualiza.get(field)?.invalid &&
      this.formsActualiza.get(field)?.touched
    );
  }


  elimanaMarca(aux: Marca) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Se eliminará permanentemente!",
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.eliminarMarca(aux.idMarca).subscribe(

          (x) => {
            Swal.fire('Mensaje', x.mensaje, 'success');
            this.marcaService.listadoMarca(this.filtro == "" ? "todos" : this.filtro).subscribe(
              (x) => this.marcas = x
            );
          }
        );
      }
    })
  }



}