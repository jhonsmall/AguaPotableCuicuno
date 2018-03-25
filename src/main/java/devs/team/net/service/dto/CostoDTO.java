package devs.team.net.service.dto;


import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Costo entity.
 */
public class CostoDTO implements Serializable {

    private Long id;

    private String codigo;

    private String servicio;

    private BigDecimal cuota;

    private Long servicioId;

    private Long clasificacionId;

    private Long sectorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public BigDecimal getCuota() {
        return cuota;
    }

    public void setCuota(BigDecimal cuota) {
        this.cuota = cuota;
    }

    public Long getServicioId() {
        return servicioId;
    }

    public void setServicioId(Long servicioId) {
        this.servicioId = servicioId;
    }

    public Long getClasificacionId() {
        return clasificacionId;
    }

    public void setClasificacionId(Long clasificacionId) {
        this.clasificacionId = clasificacionId;
    }

    public Long getSectorId() {
        return sectorId;
    }

    public void setSectorId(Long sectorId) {
        this.sectorId = sectorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CostoDTO costoDTO = (CostoDTO) o;
        if(costoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostoDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", servicio='" + getServicio() + "'" +
            ", cuota=" + getCuota() +
            "}";
    }
}
