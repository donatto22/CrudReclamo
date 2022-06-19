import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css'],
})
export class CrudProductoComponent implements OnInit {
  listaPaises: Pais[] = [];
  listaMarcas: Marca[] = [];
  listaProductos: Producto[] = [];
  mensajeDeConsulta: string = '';

  filtroNombre: string = '';
  filtroEstado: number = 1;

  // Para Registrar
  objProducto: Producto = {
    estado: 1,
    pais: {
      idPais: -1,
    },
    marca: {
      idMarca: -1,
    },
  };

  // Para actualizar
  idProducto: number = -1;

  formRegistrarProducto = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(45)]],
    serie: ['', [Validators.required, Validators.maxLength(45)]],
    durabilidad: ['', [Validators.required, Validators.maxLength(45)]],
    fechaVigencia: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    marcaId: [-1, [Validators.required, Validators.min(1)]],
    paisId: [-1, [Validators.required, Validators.min(1)]],
  });

  formActualizarProducto = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(45)]],
    serie: ['', [Validators.required, Validators.maxLength(45)]],
    durabilidad: ['', [Validators.required, Validators.maxLength(45)]],
    fechaVigencia: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    marcaId: [-1, [Validators.required, Validators.min(1)]],
    paisId: [-1, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private paisService: PaisService,
    private marcaService: MarcaService,
    private productoService: ProductoService,
    private formBuilder: FormBuilder
  ) {
    this.llenarCombos();
    this.consultarProductos();
  }

  ngOnInit(): void {}

  private llenarCombos() {
    this.cargarPaises();
    this.cargarMarcas();
  }

  private cargarPaises() {
    this.paisService.listaPais().subscribe((paises: Pais[]) => {
      if (paises && paises.length > 0) {
        this.listaPaises = paises;
      }
    });
  }

  private cargarMarcas() {
    this.marcaService.listaMarca().subscribe((marcas: Marca[]) => {
      if (marcas && marcas.length > 0) {
        this.listaMarcas = marcas;
      }
    });
  }

  public consultarProductos() {
    if (this.filtroEstado) {
      this.filtroEstado = 1;
    } else {
      this.filtroEstado = 0;
    }

    this.productoService
      .consultar({ nombre: this.filtroNombre, estado: this.filtroEstado })
      .subscribe(
        (res: any) => {
          this.mensajeDeConsulta = res.mensaje;
          if (res && res.data && res.data.length > 0) {
            this.listaProductos = res.data;
          } else {
            this.listaProductos = [];
          }
        },
        (err) => {
          console.log('HAY UN ERROR :: ', err);
          alert('Sucedió un error inesperado consulte con su administrador');
        }
      );
  }

  public cancelarRegistrar() {
    this.formRegistrarProducto.reset({
      marcaId: -1,
      paisId: -1,
    });
  }

  public registrarProducto() {
    if (this.formRegistrarProducto.invalid) {
      this.formRegistrarProducto.markAllAsTouched();
      return;
    }

    const data = this.formRegistrarProducto.value;

    this.objProducto = {
      nombre: data.nombre,
      serie: data.serie,
      durabilidad: data.durabilidad,
      fechaVigencia: data.fechaVigencia,
      precio: data.precio,
      stock: data.stock,
      marca: {
        idMarca: data.marcaId,
      },
      pais: {
        idPais: data.paisId,
      },
    };

    this.productoService.insertarProducto(this.objProducto).subscribe(
      (response) => {
        alert('Producto registrado');
        this.formRegistrarProducto.reset({
          marcaId: -1,
          paisId: -1,
        });
        this.consultarProductos();
      },
      (error) => {
        alert('Error al registros');
        console.log(error?.mensaje);
      }
    );
  }

  public abrirModalParaEditar(producto: Producto) {
    this.idProducto = Number(producto.idProducto);
    this.formActualizarProducto.reset({
      nombre: producto.nombre,
      serie: producto.serie,
      durabilidad: producto.durabilidad,
      fechaVigencia: producto.fechaVigencia,
      precio: producto.precio,
      stock: producto.stock,
      marcaId: producto.marca?.idMarca,
      paisId: producto.pais?.idPais,
    });
  }

  public actualizarProducto() {
    if (this.formActualizarProducto.invalid) {
      this.formActualizarProducto.markAllAsTouched();
      return;
    }

    const data = this.formActualizarProducto.value;

    const producto: Producto = {
      nombre: data.nombre,
      serie: data.serie,
      durabilidad: data.durabilidad,
      fechaVigencia: data.fechaVigencia,
      precio: data.precio,
      stock: data.stock,
      marca: {
        idMarca: data.marcaId,
      },
      pais: {
        idPais: data.paisId,
      },
    };

    this.productoService.editarProducto(this.idProducto, producto).subscribe(
      (response) => {
        alert('Producto actualizado');
        // this.formActualizarProducto.reset({
        //   marcaId: -1,
        //   paisId: -1
        // })
        this.consultarProductos();
      },
      (error) => {
        alert('Error al actualizar');
        console.log(error?.mensaje);
      }
    );
  }

  public cambiarEstado(producto: Producto) {
    const id = Number(producto.idProducto);
    let estado = 0;

    if (!producto.estado) {
      estado = 1;
    }

    this.productoService.cambiarEstadoProducto(id, estado).subscribe((e) => {
      this.consultarProductos();
    });
  }

  public eliminarProducto(producto: Producto) {
    this.productoService
      .eliminar(Number(producto.idProducto))
      .subscribe((e) => {
        this.consultarProductos();
      });
  }
}
