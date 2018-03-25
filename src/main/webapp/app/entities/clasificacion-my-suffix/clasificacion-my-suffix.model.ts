import { BaseEntity } from './../../shared';

export class ClasificacionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public nombre?: string,
        public estado?: boolean,
        public clasificacionCostos?: BaseEntity[],
        public clasificacionEscalasDelMedidors?: BaseEntity[],
        public clasificacionMedidors?: BaseEntity[],
    ) {
        this.estado = false;
    }
}
