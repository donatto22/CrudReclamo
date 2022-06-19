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

  public consultar(data: {
    nombre?: string;
    durabilidad?: string;
    marcaId?: number;
    paisId?: number;
    estado?: number;
  }): Observable<any> {
    let url = baseUrlProducto + '/listarPorFiltros';
    const {
      nombre = '',
      durabilidad = '',
      marcaId = -1,
      paisId = -1,
      estado = -1,
    } = data;

    const params = new HttpParams()
      .append('nombre', nombre)
      .append('durabilidad', durabilidad)
      .append('marcaId', marcaId.toString())
      .append('paisId', paisId.toString())
      .append('estado', estado.toString());

    return this.http.get(url, { params });
  }
}
