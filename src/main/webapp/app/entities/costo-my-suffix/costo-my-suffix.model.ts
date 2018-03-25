import { BaseEntity } from './../../shared';

export class CostoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public cuota?: number,
        public costoCostoMedidors?: BaseEntity[],
        public servicioId?: number,
        public sectorId?: number,
        public clasificacionId?: number,
    ) {
    }
}
