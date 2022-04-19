import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubigeo } from '../models/ubigeo.model';

const baseUrlUtil = 'http://localhost:8090/util';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http: HttpClient) { }


  listarDepartamento(): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil + "/listaDepartamentos");
  }

  listaProvincias(paramDep: any): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil + "/listaProvincias/" + paramDep);
  }

  listaDistritos(paramDep: any, paramProv: any): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(baseUrlUtil + "/listaDistritos/" + paramDep + "/" + paramProv);
  }

}
