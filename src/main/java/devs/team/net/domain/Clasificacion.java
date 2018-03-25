package devs.team.net.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "clasificacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "clasificacion")
public class Clasificacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "estado")
    private Boolean estado;

    @OneToMany(mappedBy = "clasificacion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Costo> clasificacions = new HashSet<>();

    @OneToMany(mappedBy = "clasificacion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EscalasDelMedidor> clasificacions = new HashSet<>();

    @OneToMany(mappedBy = "clasificacion")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Medidor> clasificacions = new HashSet<>();

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

    public Clasificacion codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public Clasificacion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean isEstado() {
        return estado;
    }

    public Clasificacion estado(Boolean estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Set<Costo> getClasificacions() {
        return clasificacions;
    }

    public Clasificacion clasificacions(Set<Costo> costos) {
        this.clasificacions = costos;
        return this;
    }

    public Clasificacion addClasificacion(Costo costo) {
        this.clasificacions.add(costo);
        costo.setClasificacion(this);
        return this;
    }

    public Clasificacion removeClasificacion(Costo costo) {
        this.clasificacions.remove(costo);
        costo.setClasificacion(null);
        return this;
    }

    public void setClasificacions(Set<Costo> costos) {
        this.clasificacions = costos;
    }

    public Set<EscalasDelMedidor> getClasificacions() {
        return clasificacions;
    }

    public Clasificacion clasificacions(Set<EscalasDelMedidor> escalasDelMedidors) {
        this.clasificacions = escalasDelMedidors;
        return this;
    }

    public Clasificacion addClasificacion(EscalasDelMedidor escalasDelMedidor) {
        this.clasificacions.add(escalasDelMedidor);
        escalasDelMedidor.setClasificacion(this);
        return this;
    }

    public Clasificacion removeClasificacion(EscalasDelMedidor escalasDelMedidor) {
        this.clasificacions.remove(escalasDelMedidor);
        escalasDelMedidor.setClasificacion(null);
        return this;
    }

    public void setClasificacions(Set<EscalasDelMedidor> escalasDelMedidors) {
        this.clasificacions = escalasDelMedidors;
    }

    public Set<Medidor> getClasificacions() {
        return clasificacions;
    }

    public Clasificacion clasificacions(Set<Medidor> medidors) {
        this.clasificacions = medidors;
        return this;
    }

    public Clasificacion addClasificacion(Medidor medidor) {
        this.clasificacions.add(medidor);
        medidor.setClasificacion(this);
        return this;
    }

    public Clasificacion removeClasificacion(Medidor medidor) {
        this.clasificacions.remove(medidor);
        medidor.setClasificacion(null);
        return this;
    }

    public void setClasificacions(Set<Medidor> medidors) {
        this.clasificacions = medidors;
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
        Clasificacion clasificacion = (Clasificacion) o;
        if (clasificacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clasificacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Clasificacion{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", estado='" + isEstado() + "'" +
            "}";
    }
}
