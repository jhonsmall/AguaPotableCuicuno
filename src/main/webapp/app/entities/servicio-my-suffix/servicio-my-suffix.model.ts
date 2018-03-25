import { BaseEntity } from './../../shared';

export class ServicioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public nombre?: string,
        public norma?: string,
        public tipo?: number,
        public servicioCostos?: BaseEntity[],
    ) {
    }
}
