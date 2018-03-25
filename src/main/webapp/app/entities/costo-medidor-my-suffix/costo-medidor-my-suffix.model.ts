import { BaseEntity } from './../../shared';

export class CostoMedidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public fecha?: any,
        public estado?: boolean,
        public costosMedidorId?: number,
        public costosMedidoresId?: number,
    ) {
        this.estado = false;
    }
}
