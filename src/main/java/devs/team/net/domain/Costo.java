package devs.team.net.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Entity
@Table(name = "costo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "costo")
public class Costo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "servicio")
    private String servicio;

    @Column(name = "cuota", precision=10, scale=2)
    private BigDecimal cuota;

    @ManyToOne
    private Servicio servicio;

    @ManyToOne
    private Clasificacion clasificacion;

    @OneToMany(mappedBy = "costo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CostoMedidor> costos = new HashSet<>();

    @ManyToOne
    private Sector sector;

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

    public Costo codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getServicio() {
        return servicio;
    }

    public Costo servicio(String servicio) {
        this.servicio = servicio;
        return this;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public BigDecimal getCuota() {
        return cuota;
    }

    public Costo cuota(BigDecimal cuota) {
        this.cuota = cuota;
        return this;
    }

    public void setCuota(BigDecimal cuota) {
        this.cuota = cuota;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public Costo servicio(Servicio servicio) {
        this.servicio = servicio;
        return this;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public Clasificacion getClasificacion() {
        return clasificacion;
    }

    public Costo clasificacion(Clasificacion clasificacion) {
        this.clasificacion = clasificacion;
        return this;
    }

    public void setClasificacion(Clasificacion clasificacion) {
        this.clasificacion = clasificacion;
    }

    public Set<CostoMedidor> getCostos() {
        return costos;
    }

    public Costo costos(Set<CostoMedidor> costoMedidors) {
        this.costos = costoMedidors;
        return this;
    }

    public Costo addCosto(CostoMedidor costoMedidor) {
        this.costos.add(costoMedidor);
        costoMedidor.setCosto(this);
        return this;
    }

    public Costo removeCosto(CostoMedidor costoMedidor) {
        this.costos.remove(costoMedidor);
        costoMedidor.setCosto(null);
        return this;
    }

    public void setCostos(Set<CostoMedidor> costoMedidors) {
        this.costos = costoMedidors;
    }

    public Sector getSector() {
        return sector;
    }

    public Costo sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
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
        Costo costo = (Costo) o;
        if (costo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Costo{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", servicio='" + getServicio() + "'" +
            ", cuota=" + getCuota() +
            "}";
    }
}
