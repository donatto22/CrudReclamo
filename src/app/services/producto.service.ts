import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';
const baseUrlProducto = AppSettings.URL_API_ENDPOINT + '/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  public insertarProducto(data: Producto): Observable<any> {
    return this.http.post<any>(baseUrlProducto, data);
  }

  public consultar(
    nombre: string = '',
    durabilidad: string = '',
    marcaId: number = -1,
    paisId: number = -1
  ): Observable<any> {
    let url = baseUrlProducto + '/listarPorFiltros';
    const params = new HttpParams()
      .append('nombre', nombre)
      .append('durabilidad', durabilidad)
      .append('marcaId', marcaId.toString())
      .append('paisId', paisId.toString());

    return this.http.get(url, { params });
  }
}
