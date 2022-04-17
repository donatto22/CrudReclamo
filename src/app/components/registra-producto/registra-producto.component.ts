import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { Marca } from '../../models/marca.model';
import { PaisService } from '../../services/pais.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css'],
})
export class RegistraProductoComponent implements OnInit {
  listaPaises: Pais[] = [];
  listaMarcas: Marca[] = [];

  objProducto: Producto = {
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

  public registrarProducto() {
    if (this.objProducto.pais?.idPais == -1) {
      alert('Seleccione un pais');
      return;
    }

    if (this.objProducto.marca?.idMarca == -1) {
      alert('Seleccione una marca');
      return;
    }

    this.productoService.insertarProducto(this.objProducto).subscribe(
      (response) => {
        alert(response?.mensaje);
      },
      (error) => {
        alert(error?.mensaje);
      }
    );
  }
}
