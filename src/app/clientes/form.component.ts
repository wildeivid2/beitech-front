import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { OrdenService } from '../services/orden.service';
import { Cliente } from '../models/cliente';
import { Orden } from '../models/orden';
import { Producto } from '../models/producto';
import { OrdenDetalle } from '../models/ordendetalle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  keyword = 'nombre';
  data: any;
  idCliente: number;
  titulo: string = 'Crear Orden';
  cliente: Cliente = new Cliente();
  orden: Orden = new Orden();
  ordenDetalle: OrdenDetalle = new OrdenDetalle();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private clienteService: ClienteService, private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.idCliente = params.idCliente;
      }
    );

    this.clienteService.getCliente(this.idCliente).subscribe(
      cliente => this.cliente = cliente
    );

    this.clienteService.getProductosPorCliente(this.idCliente).subscribe(
      productos => this.data = productos
    );
  }

  public crearOrden(): void {
    this.calcularTotal();

    this.ordenService.guardarOrden(this.orden).subscribe( response => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La orden ha sido creada exitosamente..!',
        showConfirmButton: true,
        timer: 1500
      })
    });

    console.log(this.orden);
  }

  public eliminarProducto(producto: Producto): void {

    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "Clic en \"sí, eliminar\" para eliminar el producto de esta orden, de lo contrario clic en \"Cancelar\".",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        let posicion: number = this.orden.detallesOrden.findIndex( detalleOrden => JSON.stringify(detalleOrden.producto) === JSON.stringify(producto) );
        this.orden.detallesOrden.splice(posicion, 1);
        this.calcularTotal();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El producto ha sido eliminado exitosamente..!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

  }


  public modificarCantidad(producto: Producto, cantidad: string): void {
    let posicion: number = this.orden.detallesOrden.findIndex( detalleOrden => JSON.stringify(detalleOrden.producto) === JSON.stringify(producto) );
    this.orden.detallesOrden[posicion].cantidad = parseInt(cantidad);
    this.calcularTotal();
  }

  public validarCantidadProductos(): boolean {
    let totalProductos: number = 0;
    this.orden.detallesOrden.forEach( (ordenDetalle: OrdenDetalle) => {
      totalProductos = totalProductos + ordenDetalle.cantidad;
    });
    return totalProductos > 0 && totalProductos < 6;
  }

  public calcularTotal(): void {
    let total: number = 0;
    for(let i = 0; i < this.orden.detallesOrden.length; i++){

      let subtotal: number;
      subtotal = this.orden.detallesOrden[i].cantidad * this.orden.detallesOrden[i].precio;
      total = total + subtotal;
    }
    this.orden.total = this.roundNumber(total);
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


  selectEvent(item: Producto) {
    console.log('SEA HA DISPARADO selectEvent');
    console.log(item);

    this.orden.cliente = this.cliente;

    let ordenD: OrdenDetalle = new OrdenDetalle();
    ordenD.cantidad = 1;
    ordenD.precio = item.precio;
    ordenD.producto = item;

    let posicion: number = this.orden.detallesOrden.findIndex(orden => JSON.stringify(orden.producto) === JSON.stringify(ordenD.producto));
    if(posicion === -1){
      this.orden.detallesOrden.push(ordenD);
    }else{
      this.orden.detallesOrden[posicion].cantidad++;
    }
    this.calcularTotal();

    console.log(this.orden);
  }

}
