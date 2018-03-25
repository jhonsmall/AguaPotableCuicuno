package devs.team.net.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the EscalasDelMedidor entity.
 */
public class EscalasDelMedidorDTO implements Serializable {

    private Long id;

    private String codigo;

    private Integer inicio;

    private Integer fin;

    private Long clasificacionId;

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

    public Integer getInicio() {
        return inicio;
    }

    public void setInicio(Integer inicio) {
        this.inicio = inicio;
    }

    public Integer getFin() {
        return fin;
    }

    public void setFin(Integer fin) {
        this.fin = fin;
    }

    public Long getClasificacionId() {
        return clasificacionId;
    }

    public void setClasificacionId(Long clasificacionId) {
        this.clasificacionId = clasificacionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EscalasDelMedidorDTO escalasDelMedidorDTO = (EscalasDelMedidorDTO) o;
        if(escalasDelMedidorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), escalasDelMedidorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EscalasDelMedidorDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", inicio=" + getInicio() +
            ", fin=" + getFin() +
            "}";
    }
}
