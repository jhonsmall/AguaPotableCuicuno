import { BaseEntity } from './../../shared';

export class CostoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public servicio?: string,
        public cuota?: number,
        public servicioId?: number,
        public clasificacionId?: number,
        public costos?: BaseEntity[],
        public sectorId?: number,
    ) {
    }
}
