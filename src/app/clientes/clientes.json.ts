import { Cliente } from '../models/cliente';

export const CLIENTES:  Cliente[] = [
  {id: 1, nombre: 'Wilson Cordero', correoElectronico: 'wilsoncordero@mail.com', productosCliente: [{id: 1, producto: {id: 1, nombre: '', descripcion: '', precio: 20.55}}]},
  {id: 2, nombre: 'Daniela Chacón', correoElectronico: 'danielachacon@mail.com', productosCliente: [{id: 1, producto: {id: 1, nombre: '', descripcion: '', precio: 20.55}}]},
  {id: 3, nombre: 'Nallive Cordero', correoElectronico: 'nallivecordero@mail.com', productosCliente: [{id: 1, producto: {id: 1, nombre: '', descripcion: '', precio: 20.55}}]},
  {id: 4, nombre: 'Sulem Cordero', correoElectronico: 'sulemcordero@mail.com', productosCliente: [{id: 1, producto: {id: 1, nombre: '', descripcion: '', precio: 20.55}}]}
];
