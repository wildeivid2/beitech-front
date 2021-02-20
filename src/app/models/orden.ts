import { Cliente } from './cliente';
import { OrdenDetalle } from './ordendetalle';

export class Orden {

  id: number;
  cliente: Cliente;
  fechaCreacion: Date;
  direccionEnvio: string;
  total: number;
  detallesOrden: OrdenDetalle[] = [];
}
