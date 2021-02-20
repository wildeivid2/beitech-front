import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Producto } from '../models/producto';
import { Orden } from '../models/orden';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8888/api/clientes'

  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint + '/listar').pipe(
      map( response => response as Cliente[] )
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get(this.urlEndPoint + '/consultar/' + id).pipe(
      map( response => response as Cliente )
    );
  }

  getProductosPorCliente(id: number): Observable<Producto[]> {
    return this.http.get(this.urlEndPoint + '/consultar-productos/' + id).pipe(
      map( response => response as Producto[] )
    );
  }

}
