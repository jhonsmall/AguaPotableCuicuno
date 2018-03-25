package devs.team.net.service.mapper;

import devs.team.net.domain.*;
import devs.team.net.service.dto.CostoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Costo and its DTO CostoDTO.
 */
@Mapper(componentModel = "spring", uses = {ServicioMapper.class, SectorMapper.class, ClasificacionMapper.class})
public interface CostoMapper extends EntityMapper<CostoDTO, Costo> {

    @Mapping(source = "costos.id", target = "costosId")
    @Mapping(source = "costos.id", target = "costosId")
    @Mapping(source = "costos.id", target = "costosId")
    CostoDTO toDto(Costo costo);

    @Mapping(target = "costos", ignore = true)
    @Mapping(source = "costosId", target = "costos")
    @Mapping(source = "costosId", target = "costos")
    @Mapping(source = "costosId", target = "costos")
    Costo toEntity(CostoDTO costoDTO);

    default Costo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Costo costo = new Costo();
        costo.setId(id);
        return costo;
    }
}
