import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';
const baseUrlCliente = AppSettings.URL_API_ENDPOINT + '/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  
  constructor(private http: HttpClient) {}

  insertarCliente(data: Cliente): Observable<any> {
    return this.http.post(baseUrlCliente, data);
  }

  actualizarCliente(data: Cliente): Observable<any>{
    return this.http.put(baseUrlCliente, data);
  }

  listaCliente():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrlUtil + "/listaCliente");
  }

  listaClienteNombre(dni: string):Observable<any[]> {
    const params = new HttpParams().set("dni",dni);
      return this.http.get<any[]>(baseUrlCliente + "/listaClientePorParametros", {params});
  }

  filtroCliente(nombres:string, apellidos:string, dni:string, idUbigeo: number, estado: number ) : Observable<any>{    
    const params = new HttpParams().set("nombres",nombres).set("apellidos",apellidos).set("dni",dni).set("idUbigeo",idUbigeo).set("estado", estado);
    return this.http.get<any>( baseUrlCliente + "/listaClientePorParametros", {params});
  }

}
