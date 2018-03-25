package devs.team.net.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A Recibo.
 */
@Entity
@Table(name = "recibo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "recibo")
public class Recibo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "estado")
    private String estado;

    @Column(name = "pagoanterior", precision=10, scale=2)
    private BigDecimal pagoanterior;

    @Column(name = "pagoactual", precision=10, scale=2)
    private BigDecimal pagoactual;

    @Column(name = "total", precision=10, scale=2)
    private BigDecimal total;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "anio")
    private Integer anio;

    @Column(name = "mes")
    private Integer mes;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private LecturaMedidor lecturamedidor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Recibo codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getNumero() {
        return numero;
    }

    public Recibo numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getEstado() {
        return estado;
    }

    public Recibo estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getPagoanterior() {
        return pagoanterior;
    }

    public Recibo pagoanterior(BigDecimal pagoanterior) {
        this.pagoanterior = pagoanterior;
        return this;
    }

    public void setPagoanterior(BigDecimal pagoanterior) {
        this.pagoanterior = pagoanterior;
    }

    public BigDecimal getPagoactual() {
        return pagoactual;
    }

    public Recibo pagoactual(BigDecimal pagoactual) {
        this.pagoactual = pagoactual;
        return this;
    }

    public void setPagoactual(BigDecimal pagoactual) {
        this.pagoactual = pagoactual;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public Recibo total(BigDecimal total) {
        this.total = total;
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Recibo fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Integer getAnio() {
        return anio;
    }

    public Recibo anio(Integer anio) {
        this.anio = anio;
        return this;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public Integer getMes() {
        return mes;
    }

    public Recibo mes(Integer mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Recibo usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LecturaMedidor getLecturamedidor() {
        return lecturamedidor;
    }

    public Recibo lecturamedidor(LecturaMedidor lecturaMedidor) {
        this.lecturamedidor = lecturaMedidor;
        return this;
    }

    public void setLecturamedidor(LecturaMedidor lecturaMedidor) {
        this.lecturamedidor = lecturaMedidor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Recibo recibo = (Recibo) o;
        if (recibo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recibo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recibo{" +
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
