package devs.team.net.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Recibo entity.
 */
public class ReciboDTO implements Serializable {

    private Long id;

    private String codigo;

    private Integer numero;

    private String estado;

    private BigDecimal pagoanterior;

    private BigDecimal pagoactual;

    private BigDecimal total;

    private Instant fecha;

    private Integer anio;

    private Integer mes;

    private Long usuarioId;

    private Long lecturamedidorId;

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

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getPagoanterior() {
        return pagoanterior;
    }

    public void setPagoanterior(BigDecimal pagoanterior) {
        this.pagoanterior = pagoanterior;
    }

    public BigDecimal getPagoactual() {
        return pagoactual;
    }

    public void setPagoactual(BigDecimal pagoactual) {
        this.pagoactual = pagoactual;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
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

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getLecturamedidorId() {
        return lecturamedidorId;
    }

    public void setLecturamedidorId(Long lecturaMedidorId) {
        this.lecturamedidorId = lecturaMedidorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReciboDTO reciboDTO = (ReciboDTO) o;
        if(reciboDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reciboDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReciboDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", numero=" + getNumero() +
            ", estado='" + getEstado() + "'" +
            ", pagoanterior=" + getPagoanterior() +
            ", pagoactual=" + getPagoactual() +
            ", total=" + getTotal() +
            ", fecha='" + getFecha() + "'" +
            ", anio=" + getAnio() +
            ", mes=" + getMes() +
            "}";
    }
}
