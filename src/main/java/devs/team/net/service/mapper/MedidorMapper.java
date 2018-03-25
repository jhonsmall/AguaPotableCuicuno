package devs.team.net.service.mapper;

import devs.team.net.domain.*;
import devs.team.net.service.dto.MedidorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Medidor and its DTO MedidorDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, ClasificacionMapper.class, SectorMapper.class})
public interface MedidorMapper extends EntityMapper<MedidorDTO, Medidor> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "clasificacion.id", target = "clasificacionId")
    @Mapping(source = "sector.id", target = "sectorId")
    MedidorDTO toDto(Medidor medidor);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "clasificacionId", target = "clasificacion")
    @Mapping(source = "sectorId", target = "sector")
    @Mapping(target = "medidors", ignore = true)
    @Mapping(target = "medidors", ignore = true)
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
