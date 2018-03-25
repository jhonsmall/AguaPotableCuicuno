package devs.team.net.service.mapper;

import devs.team.net.domain.*;
import devs.team.net.service.dto.CostoMedidorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CostoMedidor and its DTO CostoMedidorDTO.
 */
@Mapper(componentModel = "spring", uses = {CostoMapper.class, MedidorMapper.class})
public interface CostoMedidorMapper extends EntityMapper<CostoMedidorDTO, CostoMedidor> {

    @Mapping(source = "costosMedidor.id", target = "costosMedidorId")
    @Mapping(source = "costosMedidores.id", target = "costosMedidoresId")
    CostoMedidorDTO toDto(CostoMedidor costoMedidor);

    @Mapping(source = "costosMedidorId", target = "costosMedidor")
    @Mapping(source = "costosMedidoresId", target = "costosMedidores")
    CostoMedidor toEntity(CostoMedidorDTO costoMedidorDTO);

    default CostoMedidor fromId(Long id) {
        if (id == null) {
            return null;
        }
        CostoMedidor costoMedidor = new CostoMedidor();
        costoMedidor.setId(id);
        return costoMedidor;
    }
}
