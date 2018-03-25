package devs.team.net.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the LecturaMedidor entity.
 */
public class LecturaMedidorDTO implements Serializable {

    private Long id;

    private String codigo;

    private Integer lecturainicial;

    private Instant lecturafinal;

    private String estado;

    private Instant fecha;

    private Integer anio;

    private Integer mes;

    private Long lecturaMedidoresId;

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

    public Integer getLecturainicial() {
        return lecturainicial;
    }

    public void setLecturainicial(Integer lecturainicial) {
        this.lecturainicial = lecturainicial;
    }

    public Instant getLecturafinal() {
        return lecturafinal;
    }

    public void setLecturafinal(Instant lecturafinal) {
        this.lecturafinal = lecturafinal;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public Integer getMes() {
        return mes;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Long getLecturaMedidoresId() {
        return lecturaMedidoresId;
    }

    public void setLecturaMedidoresId(Long medidorId) {
        this.lecturaMedidoresId = medidorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LecturaMedidorDTO lecturaMedidorDTO = (LecturaMedidorDTO) o;
        if(lecturaMedidorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lecturaMedidorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LecturaMedidorDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", lecturainicial=" + getLecturainicial() +
            ", lecturafinal='" + getLecturafinal() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", anio=" + getAnio() +
            ", mes=" + getMes() +
            "}";
    }
}
