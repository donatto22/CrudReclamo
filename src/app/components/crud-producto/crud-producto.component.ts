import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  listaPaises: Pais[] = [];
  listaMarcas: Marca[] = [];
  listaProductos: Producto[] = [];
  mensajeDeConsulta: string = '';

  filtroNombre: string = '';

  objProducto: Producto = {
    estado : 1,
    pais: {
      idPais: -1,
    },
    marca: {
      idMarca: -1,
    },
  };

  constructor(
    private paisService: PaisService,
    private marcaService: MarcaService,
    private productoService: ProductoService
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
    let { nombre, durabilidad, marca, pais, estado } = this.objProducto;

    // Si estado es true o 1
    if (estado) {
      estado = 1
    } else {
      estado = 0
    }

    this.productoService
      .consultar({nombre,estado})
      .subscribe(
        (res: any) => {
          this.mensajeDeConsulta = res.mensaje;
          if (res && res.data && res.data.length > 0) {
            this.listaProductos = res.data;
          }else {
            this.listaProductos = [];
          }
        },
        (err) => {
          console.log('HAY UN ERROR :: ', err);
          alert('Sucedió un error inesperado consulte con su administrador');
        }
      );
  }
}
