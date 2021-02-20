import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Orden } from '../models/orden';

@Injectable()
export class OrdenService {

  private urlEndPoint:string = 'http://localhost:8888/api/ordenes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultarOrdenesDelMesPorCliente(idCliente: number): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.urlEndPoint + '/ultimas-ordenes-cliente/' + idCliente);
  }

  consultarOrdenPorCliente(idCliente: number): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.urlEndPoint + '/consultar-cliente/' + idCliente);
  }

  guardarOrden(orden: Orden): Observable<Orden> {
    return this.http.post<Orden>(this.urlEndPoint + '/crear', orden, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.log(e.error.mensaje + ' ' + e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
