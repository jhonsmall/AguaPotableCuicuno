import { BaseEntity } from './../../shared';

export class CostoMedidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public fecha?: any,
        public estado?: boolean,
        public costoId?: number,
        public medidorId?: number,
    ) {
        this.estado = false;
    }
}
