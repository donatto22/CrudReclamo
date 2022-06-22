import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.URL_API_ENDPOINT+ '/sede';

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  constructor(private http: HttpClient) {}

  public insertaActualizaSede(data: Sede): Observable<any> {
    return this.http.post<any>(baseUrlSede, data);
  }

  public listaSedeFiltro(nombre:string, direccion:string, idPais:number, estado:number, fecInicio:string, fecFin:string):Observable<any>{
    const params = new HttpParams().set("nombre", nombre).set("direccion", direccion).set("idPais", idPais).set("estado", estado).set("fechaFin",fecInicio).set("fecFin", fecFin);
    return this.http.get<any>(baseUrlSede + "/listaSedeConParametros", {params});
  }

  // crud Sede

  public insertarSede(data: Sede): Observable<any> {
    return this.http.post<any>(baseUrlSede, data);
  }

  public editarSede(idSede: number, sede: Sede) {
    return this.http.put(baseUrlSede + '/' + idSede, sede);
  }
  
  public cambiarEstadoSede(
    idSede: number,
    estado: number
  ): Observable<any> {
    return this.http.patch(
      baseUrlSede + '/estado/' + idSede + '/' + estado,
      null
    );
  }
  public eliminar(idSede: number): Observable<any> {
    return this.http.delete(baseUrlSede + '/' + idSede);
  }
  
  public consultar(data: {
    nombre?: string;
    direccion?: string;
    idPais?: number;
    estado?: number;
    fechaInicio?: string;
	  fechaFin?: string;
  }): Observable<any> {
    let url = baseUrlSede + '/listaSedeConParametros';
    const {
      nombre = '',
      direccion = '',
      idPais = -1,
      estado = -1,
      fechaInicio = '',
	    fechaFin = '',
    } = data;

    const params = new HttpParams()
      .append('nombre', nombre)
      .append('direccion', direccion)
      .append('idPais', idPais.toString())
      .append('estado', estado.toString())
      .append('fechaInicio', fechaInicio.toString())
	    .append('fechaFin', fechaFin.toString());

    return this.http.get(url, { params });
  }

}
