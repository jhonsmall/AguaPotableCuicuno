import { BaseEntity } from './../../shared';

export class LecturaMedidorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public lecturainicial?: number,
        public lecturafinal?: any,
        public estado?: string,
        public fecha?: any,
        public anio?: number,
        public mes?: number,
        public lecturamedidors?: BaseEntity[],
        public medidorId?: number,
    ) {
    }
}
