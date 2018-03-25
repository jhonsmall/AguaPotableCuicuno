import { BaseEntity } from './../../shared';

export class ReciboMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public numero?: number,
        public estado?: string,
        public pagoanterior?: number,
        public pagoactual?: number,
        public total?: number,
        public fecha?: any,
        public anio?: number,
        public mes?: number,
        public usuarioId?: number,
        public lecturaMedidorId?: number,
    ) {
    }
}
