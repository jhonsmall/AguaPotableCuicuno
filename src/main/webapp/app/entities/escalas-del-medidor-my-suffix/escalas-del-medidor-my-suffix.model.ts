import { BaseEntity } from './../../shared';

export class EscalasDelMedidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public inicio?: number,
        public fin?: number,
        public clasificacionId?: number,
    ) {
    }
}
