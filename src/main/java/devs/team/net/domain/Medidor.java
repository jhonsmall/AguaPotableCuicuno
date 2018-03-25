package devs.team.net.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Medidor.
 */
@Entity
@Table(name = "medidor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "medidor")
public class Medidor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "numeromedidor")
    private Integer numeromedidor;

    @Column(name = "fechaobtuvo")
    private Instant fechaobtuvo;

    @Column(name = "fecha")
    private Instant fecha;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Clasificacion clasificacion;

    @ManyToOne
    private Sector sector;

    @OneToMany(mappedBy = "medidor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CostoMedidor> medidors = new HashSet<>();

    @OneToMany(mappedBy = "medidor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LecturaMedidor> medidors = new HashSet<>();

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

    public Medidor codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getNumeromedidor() {
        return numeromedidor;
    }

    public Medidor numeromedidor(Integer numeromedidor) {
        this.numeromedidor = numeromedidor;
        return this;
    }

    public void setNumeromedidor(Integer numeromedidor) {
        this.numeromedidor = numeromedidor;
    }

    public Instant getFechaobtuvo() {
        return fechaobtuvo;
    }

    public Medidor fechaobtuvo(Instant fechaobtuvo) {
        this.fechaobtuvo = fechaobtuvo;
        return this;
    }

    public void setFechaobtuvo(Instant fechaobtuvo) {
        this.fechaobtuvo = fechaobtuvo;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Medidor fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Medidor usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Clasificacion getClasificacion() {
        return clasificacion;
    }

    public Medidor clasificacion(Clasificacion clasificacion) {
        this.clasificacion = clasificacion;
        return this;
    }

    public void setClasificacion(Clasificacion clasificacion) {
        this.clasificacion = clasificacion;
    }

    public Sector getSector() {
        return sector;
    }

    public Medidor sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Set<CostoMedidor> getMedidors() {
        return medidors;
    }

    public Medidor medidors(Set<CostoMedidor> costoMedidors) {
        this.medidors = costoMedidors;
        return this;
    }

    public Medidor addMedidor(CostoMedidor costoMedidor) {
        this.medidors.add(costoMedidor);
        costoMedidor.setMedidor(this);
        return this;
    }

    public Medidor removeMedidor(CostoMedidor costoMedidor) {
        this.medidors.remove(costoMedidor);
        costoMedidor.setMedidor(null);
        return this;
    }

    public void setMedidors(Set<CostoMedidor> costoMedidors) {
        this.medidors = costoMedidors;
    }

    public Set<LecturaMedidor> getMedidors() {
        return medidors;
    }

    public Medidor medidors(Set<LecturaMedidor> lecturaMedidors) {
        this.medidors = lecturaMedidors;
        return this;
    }

    public Medidor addMedidor(LecturaMedidor lecturaMedidor) {
        this.medidors.add(lecturaMedidor);
        lecturaMedidor.setMedidor(this);
        return this;
    }

    public Medidor removeMedidor(LecturaMedidor lecturaMedidor) {
        this.medidors.remove(lecturaMedidor);
        lecturaMedidor.setMedidor(null);
        return this;
    }

    public void setMedidors(Set<LecturaMedidor> lecturaMedidors) {
        this.medidors = lecturaMedidors;
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
        Medidor medidor = (Medidor) o;
        if (medidor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medidor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medidor{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", numeromedidor=" + getNumeromedidor() +
            ", fechaobtuvo='" + getFechaobtuvo() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
