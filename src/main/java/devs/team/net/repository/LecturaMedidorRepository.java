package devs.team.net.repository;

import devs.team.net.domain.LecturaMedidor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LecturaMedidor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LecturaMedidorRepository extends JpaRepository<LecturaMedidor, Long> {

}
