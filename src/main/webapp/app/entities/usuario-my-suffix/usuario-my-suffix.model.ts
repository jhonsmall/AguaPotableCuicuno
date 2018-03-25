import { BaseEntity } from './../../shared';

export class UsuarioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public estado?: string,
        public documento?: string,
        public numero?: string,
        public nombres?: string,
        public apellidos?: string,
        public direccion?: string,
        public sexo?: string,
        public telefono?: string,
        public usuarioRecibos?: BaseEntity[],
        public usuarioMedidors?: BaseEntity[],
    ) {
    }
}
