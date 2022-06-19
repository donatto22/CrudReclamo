import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';

const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';
const baseUrlMarca = AppSettings.URL_API_ENDPOINT + '/marca';
const baseUrlCrudMarca = AppSettings.URL_API_ENDPOINT + '/crudMarca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  constructor(private http: HttpClient) {  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlUtil + '/listaMarca');
  }

  insertaMarca(data:Marca): Observable<any>{
    return this.http.post(baseUrlMarca, data);
  }

  
  listaMarcaPorNombre(nombre:string, descripcion:string, certificado:string, estado:number, idPais:number ) : Observable<any>{

    const params = new HttpParams().set("nombre", nombre).set("descripcion", descripcion).set("certificado", certificado).set("estado", estado).set("idPais", idPais);
    return this.http.get<any>(baseUrlMarca + "/listaPorParametros", {params});
  }

  /**********************************CRUD**********************************************/

  listadoMarca(nombre : any): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlCrudMarca + '/listaMarcaPorNombreLike/' + nombre);
  }

  registraMarca(marca: any):Observable<any>{
    return this.http.post<any>(baseUrlCrudMarca + '/registraMarca', marca);
  }

  actualizaMarca(marca: any):Observable<any>{
    return this.http.put<any>(baseUrlCrudMarca + '/actualizaMarca', marca);
  }

  eliminarMarca(idMarca: any): Observable<any> {
    return this.http.delete(baseUrlCrudMarca + '/eliminaMarca/' + idMarca);
  }

}
