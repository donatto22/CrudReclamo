import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';
const baseUrlReclamo = AppSettings.URL_API_ENDPOINT + '/reclamo';
@Injectable({
  providedIn: 'root'
})

export class ReclamoService {

  constructor(private http:HttpClient) {   }

  insertarReclamo(data: Reclamo): Observable<any> {
    return this.http.post(baseUrlReclamo, data)
  }

  editarReclamo(reclamo: Reclamo) {
      return this.http.put(baseUrlReclamo, reclamo)
  }

  eliminar(id: any): Observable<any> {
      return this.http.delete(`${baseUrlReclamo}/id/${id}`)
  }

  listarReclamos(data: {
    descripcion?: string, tipoReclamo?: string, idCliente?: string, estado?: number
  }) {
      const {
          descripcion = '',
          tipoReclamo = '-1',
          idCliente = '-1',
          estado = -1
      } = data

      const params = new HttpParams()
      .set("descripcion", descripcion)
      .set("idTipoReclamo", tipoReclamo)
      .set("idCliente", idCliente)
      .set("estado", estado)

      return this.http.get<any>(baseUrlReclamo + '/parameters', {params})
  }

  listaTipoReclamo(): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil+ "/listaTipoReclamo");
  }

  listaCliente(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:8090/util/listaCliente");
  }
}
