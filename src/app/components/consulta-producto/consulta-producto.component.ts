import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { Marca } from '../../models/marca.model';
import { Producto } from '../../models/producto.model';
import { PaisService } from '../../services/pais.service';
import { MarcaService } from '../../services/marca.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css'],
})
export class ConsultaProductoComponent implements OnInit {
  listaPaises: Pais[] = [];
  listaMarcas: Marca[] = [];
  listaProductos: Producto[] = [];
  mensajeDeConsulta: string = '';

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
      .consultar(nombre, durabilidad, marca?.idMarca, pais?.idPais, estado)
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
