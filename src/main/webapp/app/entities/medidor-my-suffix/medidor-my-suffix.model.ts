import { BaseEntity } from './../../shared';

export class MedidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public numeromedidor?: number,
        public fechaobtuvo?: any,
        public fecha?: any,
        public medidorCostoMedidors?: BaseEntity[],
        public medidorLecturaMedidors?: BaseEntity[],
        public usuarioId?: number,
        public sectorId?: number,
        public clasificacionId?: number,
    ) {
    }
}
