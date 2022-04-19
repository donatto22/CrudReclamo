import { Cliente } from "./cliente.model";
import { TipoReclamo } from "./tipo-reclamo.model";

export class Reclamo {
    idReclamo?:number;
	descripcion?:string;
    fechaRegistro?:string;
    estado?:number;
    fechaCompra?:Date;
    cliente?:Cliente;
    tipoReclamo?:TipoReclamo;
}
