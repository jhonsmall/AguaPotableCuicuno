package devs.team.net.service.mapper;

import devs.team.net.domain.*;
import devs.team.net.service.dto.LecturaMedidorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LecturaMedidor and its DTO LecturaMedidorDTO.
 */
@Mapper(componentModel = "spring", uses = {MedidorMapper.class})
public interface LecturaMedidorMapper extends EntityMapper<LecturaMedidorDTO, LecturaMedidor> {

    @Mapping(source = "lecturaMedidores.id", target = "lecturaMedidoresId")
    LecturaMedidorDTO toDto(LecturaMedidor lecturaMedidor);

    @Mapping(target = "lecturamedidors", ignore = true)
    @Mapping(source = "lecturaMedidoresId", target = "lecturaMedidores")
    LecturaMedidor toEntity(LecturaMedidorDTO lecturaMedidorDTO);

    default LecturaMedidor fromId(Long id) {
        if (id == null) {
            return null;
        }
        LecturaMedidor lecturaMedidor = new LecturaMedidor();
        lecturaMedidor.setId(id);
        return lecturaMedidor;
    }
}
