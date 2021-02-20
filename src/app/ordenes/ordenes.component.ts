import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../services/cliente.service';
import { OrdenService } from '../services/orden.service';
import { Cliente } from '../models/cliente';
import { Orden } from '../models/orden';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html'
})
export class OrdenesComponent implements OnInit {

  idCliente: number;
  cliente: Cliente = new Cliente();
  orden: Orden = new Orden;
  ordenes: Orden[] = [];
  mostrarModal: boolean = false;

  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;

  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router, private clienteService: ClienteService, private ordenService: OrdenService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.idCliente = params.idCliente;
      }
    );

    this.clienteService.getCliente(this.idCliente).subscribe(
      cliente => this.cliente = cliente
    );

    this.ordenService.consultarOrdenPorCliente(this.idCliente).subscribe(
      ordenes => this.ordenes = ordenes
    );

  }


  public verDetalleOrden(id: number): void {
    let posicion: number = this.ordenes.findIndex( orden => orden.id === id);
    this.orden = this.ordenes[posicion];
    this.modalService.open(this.myModalInfo);
  }

  public roundNumber (number: number, max: number = 2) {
    if (typeof number !== 'number' || isNaN(number)) {
      throw new TypeError('Número inválido: ' + number);
    }

    if (typeof max !== 'number' || isNaN(max)) {
      throw new TypeError('Máximo de dígitos inválido: ' + max);
    }

    let fractionalPart = number.toString().split('.')[1];

    if (!fractionalPart || fractionalPart.length <= 2) {
      return number;
    }

    return Number(number.toFixed(max));
  }


}
