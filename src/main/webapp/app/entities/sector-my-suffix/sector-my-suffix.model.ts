import { BaseEntity } from './../../shared';

export class SectorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public nombre?: string,
        public descripcion?: string,
        public sectorCostos?: BaseEntity[],
        public sectorMedidors?: BaseEntity[],
    ) {
    }
}
