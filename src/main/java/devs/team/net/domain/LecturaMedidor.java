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
 * A LecturaMedidor.
 */
@Entity
@Table(name = "lectura_medidor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "lecturamedidor")
public class LecturaMedidor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "lecturainicial")
    private Integer lecturainicial;

    @Column(name = "lecturafinal")
    private Instant lecturafinal;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "anio")
    private Integer anio;

    @Column(name = "mes")
    private Integer mes;

    @ManyToOne
    private Medidor medidor;

    @OneToMany(mappedBy = "lecturaMedidor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Recibo> lecturamedidors = new HashSet<>();

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

    public LecturaMedidor codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getLecturainicial() {
        return lecturainicial;
    }

    public LecturaMedidor lecturainicial(Integer lecturainicial) {
        this.lecturainicial = lecturainicial;
        return this;
    }

    public void setLecturainicial(Integer lecturainicial) {
        this.lecturainicial = lecturainicial;
    }

    public Instant getLecturafinal() {
        return lecturafinal;
    }

    public LecturaMedidor lecturafinal(Instant lecturafinal) {
        this.lecturafinal = lecturafinal;
        return this;
    }

    public void setLecturafinal(Instant lecturafinal) {
        this.lecturafinal = lecturafinal;
    }

    public String getEstado() {
        return estado;
    }

    public LecturaMedidor estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Instant getFecha() {
        return fecha;
    }

    public LecturaMedidor fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Integer getAnio() {
        return anio;
    }

    public LecturaMedidor anio(Integer anio) {
        this.anio = anio;
        return this;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public Integer getMes() {
        return mes;
    }

    public LecturaMedidor mes(Integer mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Medidor getMedidor() {
        return medidor;
    }

    public LecturaMedidor medidor(Medidor medidor) {
        this.medidor = medidor;
        return this;
    }

    public void setMedidor(Medidor medidor) {
        this.medidor = medidor;
    }

    public Set<Recibo> getLecturamedidors() {
        return lecturamedidors;
    }

    public LecturaMedidor lecturamedidors(Set<Recibo> recibos) {
        this.lecturamedidors = recibos;
        return this;
    }

    public LecturaMedidor addLecturamedidor(Recibo recibo) {
        this.lecturamedidors.add(recibo);
        recibo.setLecturaMedidor(this);
        return this;
    }

    public LecturaMedidor removeLecturamedidor(Recibo recibo) {
        this.lecturamedidors.remove(recibo);
        recibo.setLecturaMedidor(null);
        return this;
    }

    public void setLecturamedidors(Set<Recibo> recibos) {
        this.lecturamedidors = recibos;
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
        LecturaMedidor lecturaMedidor = (LecturaMedidor) o;
        if (lecturaMedidor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lecturaMedidor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LecturaMedidor{" +
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
