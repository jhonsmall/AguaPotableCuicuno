import { BaseEntity } from './../../shared';

export class MedidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public numeromedidor?: number,
        public fechaobtuvo?: any,
        public fecha?: any,
        public usuarioId?: number,
        public clasificacionId?: number,
        public sectorId?: number,
        public medidors?: BaseEntity[],
    ) {
    }
}
