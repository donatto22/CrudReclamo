import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlCliente = 'http://localhost:8090/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(private http: HttpClient) { }

  insertarCliente(data: Cliente): Observable<any> {
    return this.http.post(baseUrlCliente + "/Registro", data);
  }

}
