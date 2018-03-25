package devs.team.net.service.mapper;

import devs.team.net.domain.*;
import devs.team.net.service.dto.MedidorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Medidor and its DTO MedidorDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, SectorMapper.class, ClasificacionMapper.class})
public interface MedidorMapper extends EntityMapper<MedidorDTO, Medidor> {

    @Mapping(source = "medidores.id", target = "medidoresId")
    @Mapping(source = "medidores.id", target = "medidoresId")
    @Mapping(source = "medidores.id", target = "medidoresId")
    MedidorDTO toDto(Medidor medidor);

    @Mapping(target = "medidors", ignore = true)
    @Mapping(target = "medidors", ignore = true)
    @Mapping(source = "medidoresId", target = "medidores")
    @Mapping(source = "medidoresId", target = "medidores")
    @Mapping(source = "medidoresId", target = "medidores")
    Medidor toEntity(MedidorDTO medidorDTO);

    default Medidor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Medidor medidor = new Medidor();
        medidor.setId(id);
        return medidor;
    }
}
