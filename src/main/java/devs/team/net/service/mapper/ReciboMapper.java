package devs.team.net.service.mapper;

import devs.team.net.domain.*;
import devs.team.net.service.dto.ReciboDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Recibo and its DTO ReciboDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, LecturaMedidorMapper.class})
public interface ReciboMapper extends EntityMapper<ReciboDTO, Recibo> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "lecturaMedidor.id", target = "lecturaMedidorId")
    ReciboDTO toDto(Recibo recibo);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "lecturaMedidorId", target = "lecturaMedidor")
    Recibo toEntity(ReciboDTO reciboDTO);

    default Recibo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Recibo recibo = new Recibo();
        recibo.setId(id);
        return recibo;
    }
}
