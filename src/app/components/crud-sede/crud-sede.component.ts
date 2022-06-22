import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Sede } from 'src/app/models/sede.model';
import { Pais } from 'src/app/models/pais.model';
import { SedeService } from 'src/app/services/sede.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  listaPaises: Pais[] = [];
  listaSede: Sede[] = [];
  mensajeDeConsulta: string = '';

  filtroNombre: string = '';
  filtroEstado: number = 1;

  // Para Registrar
  objSede: Sede = {
    estado: 1,
    pais: {
      idPais: -1,
    },
  };

  // Para actualizar
  idSede: number = -1;

  formRegistrarSede = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(45)]],
    direccion: ['', [Validators.required, Validators.maxLength(45)]],
    fechaCreacion: ['', [Validators.required]],
    codigoPostal: ['', [Validators.required, Validators.maxLength(45)]],
    paisId: [-1, [Validators.required, Validators.min(1)]],
  });

  formActualizarSede = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(45)]],
    direccion: ['', [Validators.required, Validators.maxLength(45)]],
    fechaCreacion: ['', [Validators.required]],
    codigoPostal: ['', [Validators.required, Validators.maxLength(45)]],
    paisId: [-1, [Validators.required, Validators.min(1)]],
  });



  constructor(private paisService: PaisService,
    private sedeService: SedeService,
    private formBuilder: FormBuilder
  ) {
    this.llenarCombos();
    this.consultarSedes();
  }

  ngOnInit(): void {}

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

  public consultarSedes() {
    if (this.filtroEstado) {
      this.filtroEstado = 1;
    } else {
      this.filtroEstado = 0;
    }

    this.sedeService
      .consultar({ nombre: this.filtroNombre, estado: this.filtroEstado })
      .subscribe(
        (res: any) => {
          this.mensajeDeConsulta = res.mensaje;
          if (res && res.data && res.data.length > 0) {
            this.listaSede = res.data;
          } else {
            this.listaSede = [];
          }
        },
        (err) => {
          console.log('HUBO UN ERROR :: ', err);
          alert('Sucedió un error inesperado consulte con su administrador');
        }
      );
  }

  public cancelarRegistrar() {
    this.formRegistrarSede.reset({
      paisId: -1,
    });
  }

  public registrarSede() {
    if (this.formRegistrarSede.invalid) {
      this.formRegistrarSede.markAllAsTouched();
      return;
    }

    const data = this.formRegistrarSede.value;

    this.objSede = {
      nombre: data.nombre,
      direccion: data.direccion,
      fechaCreacion: data.fechaCreacion,
      codigoPostal: data.codigoPostal,
      pais: {
        idPais: data.paisId,
      },
	  
    };
	this.sedeService.insertarSede(this.objSede).subscribe(
      (response) => {
        //alert('Sede registrada');
        this.formRegistrarSede.reset({
          paisId: -1,
        });
        document.getElementById('btnCerrarModalRegistrarSede')?.click();
        Swal.fire('Registro exitoso', 'Sede registrada correctamente', 'success');
        this.consultarSedes();
      },
      (error) => {
        //alert('Error al registrar');
        document.getElementById('btnCerrarModalRegistrarSede')?.click();
        Swal.fire('Error', 'Error al registrar la sede', 'error');
        console.log(error?.mensaje);
      }
    );
  }

  public abrirModalParaEditar(sede: Sede) {
    this.idSede = Number(sede.idSede);
    this.formActualizarSede.reset({
      nombre: sede.nombre,
      direccion: sede.direccion,
      fechaCreacion: sede.fechaCreacion,
      codigoPostal: sede.codigoPostal,
      paisId: sede.pais?.idPais,
    });
  }

  public actualizarSede() {
    if (this.formActualizarSede.invalid) {
      this.formActualizarSede.markAllAsTouched();
      return;
    }

    const data = this.formActualizarSede.value;

    const sede: Sede = {
      nombre: data.nombre,
      direccion: data.direccion,
      fechaCreacion: data.fechaCreacion,
      codigoPostal: data.codigoPostal,
      pais: {
        idPais: data.paisId,
      },
    };

    this.sedeService.editarSede(this.idSede, sede).subscribe(
      (response) => {
        //alert('Sede actualizada');
        document.getElementById('btnCerrarModalEditarSede')?.click();
        Swal.fire('Sede actualizada', '', 'success');
        this.consultarSedes();
      },
      (error) => {
        //alert('Error al actualizar');
        document.getElementById('btnCerrarModalEditarSede')?.click();
        Swal.fire('Error al actualizar', '', 'error');
        console.log(error?.mensaje);
      }
    );
  }

  public cambiarEstado(sede: Sede) {
    const id = Number(sede.idSede);
    let estado = 0;

    if (!sede.estado) {
      estado = 1;
    }

    this.sedeService.cambiarEstadoSede(id, estado).subscribe((e) => {
      this.consultarSedes();
    });
  }

  public eliminarSede(sede: Sede) {

    Swal.fire({
      title: 'Eliminar Sede',
      html: `¿Está seguro de eliminar la sede? </br> La información relacionada a esa sede se perderá`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545'
    }).then( (res) => {
      if (res.isConfirmed) {
        this.sedeService
        .eliminar(Number(sede.idSede))
        .subscribe((e) => {
          Swal.fire('Eliminado', 'La sede ha sido eliminada', 'success');
          this.consultarSedes();

        });
      }
    })

  }

// VALIDANDO
limpiarFormulario() {
  this.formRegistrarSede.reset({
    paisId: -1,
  });
}

esValidoParaRegistrar(field: string) {
  return (
    this.formRegistrarSede.get(field)?.invalid &&
    this.formRegistrarSede.get(field)?.touched
  );
}

esValidoParaEditar(field: string) {
  return (
    this.formActualizarSede.get(field)?.invalid &&
    this.formActualizarSede.get(field)?.touched
  );
}

// Para Registro

get validarNombreRMsg() {
  if (this.formRegistrarSede?.get('nombre')?.hasError('required')) {
    return 'Nombre es obligatorio';
  } else if (
    this.formRegistrarSede?.get('nombre')?.hasError('maxlength')
  ) {
    return 'El campo nombre debe tener un máximo de 45 caracteres';
  }

  return '';
}

get validarDireccionRMsg() {
  if (this.formRegistrarSede?.get('direccion')?.hasError('required')) {
    return 'El campo direccion es obligatorio';
  } else if (
    this.formRegistrarSede?.get('direccion')?.hasError('maxlength')
  ) {
    return 'El campo direccion debe tener un máximo de 45 caracteres';
  }

  return '';
}

get validarCodigoPostalRMsg() {
  if (this.formRegistrarSede?.get('codigoPostal')?.hasError('required')) {
    return 'El codigo postal es obligatorio';
  } else if (
    this.formRegistrarSede?.get('codigoPostal')?.hasError('maxlength')
  ) {
    return 'El codigo postal debe tener un máximo de 45 caracteres';
  }

  return '';
}


// Para Editar
get validarNombreEMsg() {
  if (this.formActualizarSede?.get('nombre')?.hasError('required')) {
    return 'El campo nombre es obligatorio';
  } else if (
    this.formActualizarSede?.get('nombre')?.hasError('maxlength')
  ) {
    return 'El campo nombre debe tener un máximo de 45 caracteres';
  }

  return '';
}

get validarDireccionEMsg() {
  if (this.formActualizarSede?.get('direccion')?.hasError('required')) {
    return 'El campo direccion es obligatorio';
  } else if (
    this.formActualizarSede?.get('direccione')?.hasError('maxlength')
  ) {
    return 'El campo direccion debe tener un máximo de 45 caracteres';
  }

  return '';
}

get validarCodigoPostalEMsg() {
  if (this.formActualizarSede?.get('codigoPostal')?.hasError('required')) {
    return 'El codigo postal es obligatorio';
  } else if (
    this.formActualizarSede?.get('codigoPostal')?.hasError('maxlength')
  ) {
    return 'El codigo postal debe tener un máximo de 45 caracteres';
  }

  return '';
}

}
