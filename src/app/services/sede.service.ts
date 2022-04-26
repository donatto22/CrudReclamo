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

}
