package devs.team.net.web.rest;

import devs.team.net.AguaPotableCuicunoApp;

import devs.team.net.domain.Servicio;
import devs.team.net.repository.ServicioRepository;
import devs.team.net.service.ServicioService;
import devs.team.net.repository.search.ServicioSearchRepository;
import devs.team.net.service.dto.ServicioDTO;
import devs.team.net.service.mapper.ServicioMapper;
import devs.team.net.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static devs.team.net.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServicioResource REST controller.
 *
 * @see ServicioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AguaPotableCuicunoApp.class)
public class ServicioResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_NORMA = "AAAAAAAAAA";
    private static final String UPDATED_NORMA = "BBBBBBBBBB";

    private static final Integer DEFAULT_TIPO = 1;
    private static final Integer UPDATED_TIPO = 2;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private ServicioMapper servicioMapper;

    @Autowired
    private ServicioService servicioService;

    @Autowired
    private ServicioSearchRepository servicioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServicioMockMvc;

    private Servicio servicio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServicioResource servicioResource = new ServicioResource(servicioService);
        this.restServicioMockMvc = MockMvcBuilders.standaloneSetup(servicioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Servicio createEntity(EntityManager em) {
        Servicio servicio = new Servicio()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE)
            .norma(DEFAULT_NORMA)
            .tipo(DEFAULT_TIPO);
        return servicio;
    }

    @Before
    public void initTest() {
        servicioSearchRepository.deleteAll();
        servicio = createEntity(em);
    }

    @Test
    @Transactional
    public void createServicio() throws Exception {
        int databaseSizeBeforeCreate = servicioRepository.findAll().size();

        // Create the Servicio
        ServicioDTO servicioDTO = servicioMapper.toDto(servicio);
        restServicioMockMvc.perform(post("/api/servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicioDTO)))
            .andExpect(status().isCreated());

        // Validate the Servicio in the database
        List<Servicio> servicioList = servicioRepository.findAll();
        assertThat(servicioList).hasSize(databaseSizeBeforeCreate + 1);
        Servicio testServicio = servicioList.get(servicioList.size() - 1);
        assertThat(testServicio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testServicio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testServicio.getNorma()).isEqualTo(DEFAULT_NORMA);
        assertThat(testServicio.getTipo()).isEqualTo(DEFAULT_TIPO);

        // Validate the Servicio in Elasticsearch
        Servicio servicioEs = servicioSearchRepository.findOne(testServicio.getId());
        assertThat(servicioEs).isEqualToIgnoringGivenFields(testServicio);
    }

    @Test
    @Transactional
    public void createServicioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = servicioRepository.findAll().size();

        // Create the Servicio with an existing ID
        servicio.setId(1L);
        ServicioDTO servicioDTO = servicioMapper.toDto(servicio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServicioMockMvc.perform(post("/api/servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Servicio in the database
        List<Servicio> servicioList = servicioRepository.findAll();
        assertThat(servicioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServicios() throws Exception {
        // Initialize the database
        servicioRepository.saveAndFlush(servicio);

        // Get all the servicioList
        restServicioMockMvc.perform(get("/api/servicios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].norma").value(hasItem(DEFAULT_NORMA.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }

    @Test
    @Transactional
    public void getServicio() throws Exception {
        // Initialize the database
        servicioRepository.saveAndFlush(servicio);

        // Get the servicio
        restServicioMockMvc.perform(get("/api/servicios/{id}", servicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(servicio.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.norma").value(DEFAULT_NORMA.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO));
    }

    @Test
    @Transactional
    public void getNonExistingServicio() throws Exception {
        // Get the servicio
        restServicioMockMvc.perform(get("/api/servicios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServicio() throws Exception {
        // Initialize the database
        servicioRepository.saveAndFlush(servicio);
        servicioSearchRepository.save(servicio);
        int databaseSizeBeforeUpdate = servicioRepository.findAll().size();

        // Update the servicio
        Servicio updatedServicio = servicioRepository.findOne(servicio.getId());
        // Disconnect from session so that the updates on updatedServicio are not directly saved in db
        em.detach(updatedServicio);
        updatedServicio
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .norma(UPDATED_NORMA)
            .tipo(UPDATED_TIPO);
        ServicioDTO servicioDTO = servicioMapper.toDto(updatedServicio);

        restServicioMockMvc.perform(put("/api/servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicioDTO)))
            .andExpect(status().isOk());

        // Validate the Servicio in the database
        List<Servicio> servicioList = servicioRepository.findAll();
        assertThat(servicioList).hasSize(databaseSizeBeforeUpdate);
        Servicio testServicio = servicioList.get(servicioList.size() - 1);
        assertThat(testServicio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testServicio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testServicio.getNorma()).isEqualTo(UPDATED_NORMA);
        assertThat(testServicio.getTipo()).isEqualTo(UPDATED_TIPO);

        // Validate the Servicio in Elasticsearch
        Servicio servicioEs = servicioSearchRepository.findOne(testServicio.getId());
        assertThat(servicioEs).isEqualToIgnoringGivenFields(testServicio);
    }

    @Test
    @Transactional
    public void updateNonExistingServicio() throws Exception {
        int databaseSizeBeforeUpdate = servicioRepository.findAll().size();

        // Create the Servicio
        ServicioDTO servicioDTO = servicioMapper.toDto(servicio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServicioMockMvc.perform(put("/api/servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servicioDTO)))
            .andExpect(status().isCreated());

        // Validate the Servicio in the database
        List<Servicio> servicioList = servicioRepository.findAll();
        assertThat(servicioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServicio() throws Exception {
        // Initialize the database
        servicioRepository.saveAndFlush(servicio);
        servicioSearchRepository.save(servicio);
        int databaseSizeBeforeDelete = servicioRepository.findAll().size();

        // Get the servicio
        restServicioMockMvc.perform(delete("/api/servicios/{id}", servicio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean servicioExistsInEs = servicioSearchRepository.exists(servicio.getId());
        assertThat(servicioExistsInEs).isFalse();

        // Validate the database is empty
        List<Servicio> servicioList = servicioRepository.findAll();
        assertThat(servicioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchServicio() throws Exception {
        // Initialize the database
        servicioRepository.saveAndFlush(servicio);
        servicioSearchRepository.save(servicio);

        // Search the servicio
        restServicioMockMvc.perform(get("/api/_search/servicios?query=id:" + servicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].norma").value(hasItem(DEFAULT_NORMA.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Servicio.class);
        Servicio servicio1 = new Servicio();
        servicio1.setId(1L);
        Servicio servicio2 = new Servicio();
        servicio2.setId(servicio1.getId());
        assertThat(servicio1).isEqualTo(servicio2);
        servicio2.setId(2L);
        assertThat(servicio1).isNotEqualTo(servicio2);
        servicio1.setId(null);
        assertThat(servicio1).isNotEqualTo(servicio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServicioDTO.class);
        ServicioDTO servicioDTO1 = new ServicioDTO();
        servicioDTO1.setId(1L);
        ServicioDTO servicioDTO2 = new ServicioDTO();
        assertThat(servicioDTO1).isNotEqualTo(servicioDTO2);
        servicioDTO2.setId(servicioDTO1.getId());
        assertThat(servicioDTO1).isEqualTo(servicioDTO2);
        servicioDTO2.setId(2L);
        assertThat(servicioDTO1).isNotEqualTo(servicioDTO2);
        servicioDTO1.setId(null);
        assertThat(servicioDTO1).isNotEqualTo(servicioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(servicioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(servicioMapper.fromId(null)).isNull();
    }
}
