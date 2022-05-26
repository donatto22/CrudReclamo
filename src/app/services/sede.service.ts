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

}
