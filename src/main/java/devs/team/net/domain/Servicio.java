package devs.team.net.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Servicio.
 */
@Entity
@Table(name = "servicio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "servicio")
public class Servicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "norma")
    private String norma;

    @Column(name = "tipo")
    private Integer tipo;

    @OneToMany(mappedBy = "servicio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Costo> servicios = new HashSet<>();

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

    public Servicio codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public Servicio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNorma() {
        return norma;
    }

    public Servicio norma(String norma) {
        this.norma = norma;
        return this;
    }

    public void setNorma(String norma) {
        this.norma = norma;
    }

    public Integer getTipo() {
        return tipo;
    }

    public Servicio tipo(Integer tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public Set<Costo> getServicios() {
        return servicios;
    }

    public Servicio servicios(Set<Costo> costos) {
        this.servicios = costos;
        return this;
    }

    public Servicio addServicio(Costo costo) {
        this.servicios.add(costo);
        costo.setServicio(this);
        return this;
    }

    public Servicio removeServicio(Costo costo) {
        this.servicios.remove(costo);
        costo.setServicio(null);
        return this;
    }

    public void setServicios(Set<Costo> costos) {
        this.servicios = costos;
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
        Servicio servicio = (Servicio) o;
        if (servicio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), servicio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Servicio{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", norma='" + getNorma() + "'" +
            ", tipo=" + getTipo() +
            "}";
    }
}
