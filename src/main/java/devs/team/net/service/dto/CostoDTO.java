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

    private Long costosId;

    private Long costosId;

    private Long costosId;

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

    public Long getCostosId() {
        return costosId;
    }

    public void setCostosId(Long servicioId) {
        this.costosId = servicioId;
    }

    public Long getCostosId() {
        return costosId;
    }

    public void setCostosId(Long sectorId) {
        this.costosId = sectorId;
    }

    public Long getCostosId() {
        return costosId;
    }

    public void setCostosId(Long clasificacionId) {
        this.costosId = clasificacionId;
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
