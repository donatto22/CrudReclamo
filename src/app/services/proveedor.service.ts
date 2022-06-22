import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProveedor = AppSettings.URL_API_ENDPOINT+ '/proveedor';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  insertarProveedor(data: Proveedor): Observable<any> {
    return this.http.post(baseUrlProveedor, data);
  }

  filtroProveedor(razonsocial:string, ruc:string, celular:string, contacto:string, estado: number ) : Observable<any>{    
    const params = new HttpParams().set("razonsocial",razonsocial).set("ruc",ruc).set("celular",celular).set("contacto",contacto).set("estado", estado);
    return this.http.get<any>( baseUrlProveedor + "/consultaFiltro", {params});
  }

  consultarProveedor(data: {
    razonsocial?: string;
    ruc?: string;
    estado?: number;
  }): Observable<any> {
    let url = baseUrlProveedor + '/consultaFiltro';
    const {
      razonsocial = '',
      ruc = '',
      estado = -1,
    } = data;

    const params = new HttpParams()
      .append('razonsocial', razonsocial)
      .append('ruc', ruc)
      .append('estado', estado.toString());

    return this.http.get(url, { params });
  }

  actualizaProveedor(data: Proveedor): Observable<any>{
    return this.http.put(baseUrlProveedor, data);
  }
  
  eliminarProveedor(idProveedor: number): Observable<any> {
    return this.http.delete(baseUrlProveedor + '/' + idProveedor);
  }



}
