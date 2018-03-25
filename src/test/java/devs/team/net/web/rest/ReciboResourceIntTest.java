package devs.team.net.web.rest;

import devs.team.net.AguaPotableCuicunoApp;

import devs.team.net.domain.Recibo;
import devs.team.net.repository.ReciboRepository;
import devs.team.net.service.ReciboService;
import devs.team.net.repository.search.ReciboSearchRepository;
import devs.team.net.service.dto.ReciboDTO;
import devs.team.net.service.mapper.ReciboMapper;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static devs.team.net.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReciboResource REST controller.
 *
 * @see ReciboResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AguaPotableCuicunoApp.class)
public class ReciboResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PAGOANTERIOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_PAGOANTERIOR = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PAGOACTUAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_PAGOACTUAL = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL = new BigDecimal(2);

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_ANIO = 1;
    private static final Integer UPDATED_ANIO = 2;

    private static final Integer DEFAULT_MES = 1;
    private static final Integer UPDATED_MES = 2;

    @Autowired
    private ReciboRepository reciboRepository;

    @Autowired
    private ReciboMapper reciboMapper;

    @Autowired
    private ReciboService reciboService;

    @Autowired
    private ReciboSearchRepository reciboSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReciboMockMvc;

    private Recibo recibo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReciboResource reciboResource = new ReciboResource(reciboService);
        this.restReciboMockMvc = MockMvcBuilders.standaloneSetup(reciboResource)
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
    public static Recibo createEntity(EntityManager em) {
        Recibo recibo = new Recibo()
            .codigo(DEFAULT_CODIGO)
            .numero(DEFAULT_NUMERO)
            .estado(DEFAULT_ESTADO)
            .pagoanterior(DEFAULT_PAGOANTERIOR)
            .pagoactual(DEFAULT_PAGOACTUAL)
            .total(DEFAULT_TOTAL)
            .fecha(DEFAULT_FECHA)
            .anio(DEFAULT_ANIO)
            .mes(DEFAULT_MES);
        return recibo;
    }

    @Before
    public void initTest() {
        reciboSearchRepository.deleteAll();
        recibo = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecibo() throws Exception {
        int databaseSizeBeforeCreate = reciboRepository.findAll().size();

        // Create the Recibo
        ReciboDTO reciboDTO = reciboMapper.toDto(recibo);
        restReciboMockMvc.perform(post("/api/recibos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reciboDTO)))
            .andExpect(status().isCreated());

        // Validate the Recibo in the database
        List<Recibo> reciboList = reciboRepository.findAll();
        assertThat(reciboList).hasSize(databaseSizeBeforeCreate + 1);
        Recibo testRecibo = reciboList.get(reciboList.size() - 1);
        assertThat(testRecibo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testRecibo.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testRecibo.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testRecibo.getPagoanterior()).isEqualTo(DEFAULT_PAGOANTERIOR);
        assertThat(testRecibo.getPagoactual()).isEqualTo(DEFAULT_PAGOACTUAL);
        assertThat(testRecibo.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testRecibo.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testRecibo.getAnio()).isEqualTo(DEFAULT_ANIO);
        assertThat(testRecibo.getMes()).isEqualTo(DEFAULT_MES);

        // Validate the Recibo in Elasticsearch
        Recibo reciboEs = reciboSearchRepository.findOne(testRecibo.getId());
        assertThat(reciboEs).isEqualToIgnoringGivenFields(testRecibo);
    }

    @Test
    @Transactional
    public void createReciboWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reciboRepository.findAll().size();

        // Create the Recibo with an existing ID
        recibo.setId(1L);
        ReciboDTO reciboDTO = reciboMapper.toDto(recibo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReciboMockMvc.perform(post("/api/recibos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reciboDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Recibo in the database
        List<Recibo> reciboList = reciboRepository.findAll();
        assertThat(reciboList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecibos() throws Exception {
        // Initialize the database
        reciboRepository.saveAndFlush(recibo);

        // Get all the reciboList
        restReciboMockMvc.perform(get("/api/recibos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recibo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].pagoanterior").value(hasItem(DEFAULT_PAGOANTERIOR.intValue())))
            .andExpect(jsonPath("$.[*].pagoactual").value(hasItem(DEFAULT_PAGOACTUAL.intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].anio").value(hasItem(DEFAULT_ANIO)))
            .andExpect(jsonPath("$.[*].mes").value(hasItem(DEFAULT_MES)));
    }

    @Test
    @Transactional
    public void getRecibo() throws Exception {
        // Initialize the database
        reciboRepository.saveAndFlush(recibo);

        // Get the recibo
        restReciboMockMvc.perform(get("/api/recibos/{id}", recibo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recibo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.pagoanterior").value(DEFAULT_PAGOANTERIOR.intValue()))
            .andExpect(jsonPath("$.pagoactual").value(DEFAULT_PAGOACTUAL.intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.anio").value(DEFAULT_ANIO))
            .andExpect(jsonPath("$.mes").value(DEFAULT_MES));
    }

    @Test
    @Transactional
    public void getNonExistingRecibo() throws Exception {
        // Get the recibo
        restReciboMockMvc.perform(get("/api/recibos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecibo() throws Exception {
        // Initialize the database
        reciboRepository.saveAndFlush(recibo);
        reciboSearchRepository.save(recibo);
        int databaseSizeBeforeUpdate = reciboRepository.findAll().size();

        // Update the recibo
        Recibo updatedRecibo = reciboRepository.findOne(recibo.getId());
        // Disconnect from session so that the updates on updatedRecibo are not directly saved in db
        em.detach(updatedRecibo);
        updatedRecibo
            .codigo(UPDATED_CODIGO)
            .numero(UPDATED_NUMERO)
            .estado(UPDATED_ESTADO)
            .pagoanterior(UPDATED_PAGOANTERIOR)
            .pagoactual(UPDATED_PAGOACTUAL)
            .total(UPDATED_TOTAL)
            .fecha(UPDATED_FECHA)
            .anio(UPDATED_ANIO)
            .mes(UPDATED_MES);
        ReciboDTO reciboDTO = reciboMapper.toDto(updatedRecibo);

        restReciboMockMvc.perform(put("/api/recibos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reciboDTO)))
            .andExpect(status().isOk());

        // Validate the Recibo in the database
        List<Recibo> reciboList = reciboRepository.findAll();
        assertThat(reciboList).hasSize(databaseSizeBeforeUpdate);
        Recibo testRecibo = reciboList.get(reciboList.size() - 1);
        assertThat(testRecibo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testRecibo.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testRecibo.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testRecibo.getPagoanterior()).isEqualTo(UPDATED_PAGOANTERIOR);
        assertThat(testRecibo.getPagoactual()).isEqualTo(UPDATED_PAGOACTUAL);
        assertThat(testRecibo.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testRecibo.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testRecibo.getAnio()).isEqualTo(UPDATED_ANIO);
        assertThat(testRecibo.getMes()).isEqualTo(UPDATED_MES);

        // Validate the Recibo in Elasticsearch
        Recibo reciboEs = reciboSearchRepository.findOne(testRecibo.getId());
        assertThat(reciboEs).isEqualToIgnoringGivenFields(testRecibo);
    }

    @Test
    @Transactional
    public void updateNonExistingRecibo() throws Exception {
        int databaseSizeBeforeUpdate = reciboRepository.findAll().size();

        // Create the Recibo
        ReciboDTO reciboDTO = reciboMapper.toDto(recibo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReciboMockMvc.perform(put("/api/recibos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reciboDTO)))
            .andExpect(status().isCreated());

        // Validate the Recibo in the database
        List<Recibo> reciboList = reciboRepository.findAll();
        assertThat(reciboList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRecibo() throws Exception {
        // Initialize the database
        reciboRepository.saveAndFlush(recibo);
        reciboSearchRepository.save(recibo);
        int databaseSizeBeforeDelete = reciboRepository.findAll().size();

        // Get the recibo
        restReciboMockMvc.perform(delete("/api/recibos/{id}", recibo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean reciboExistsInEs = reciboSearchRepository.exists(recibo.getId());
        assertThat(reciboExistsInEs).isFalse();

        // Validate the database is empty
        List<Recibo> reciboList = reciboRepository.findAll();
        assertThat(reciboList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRecibo() throws Exception {
        // Initialize the database
        reciboRepository.saveAndFlush(recibo);
        reciboSearchRepository.save(recibo);

        // Search the recibo
        restReciboMockMvc.perform(get("/api/_search/recibos?query=id:" + recibo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recibo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].pagoanterior").value(hasItem(DEFAULT_PAGOANTERIOR.intValue())))
            .andExpect(jsonPath("$.[*].pagoactual").value(hasItem(DEFAULT_PAGOACTUAL.intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].anio").value(hasItem(DEFAULT_ANIO)))
            .andExpect(jsonPath("$.[*].mes").value(hasItem(DEFAULT_MES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recibo.class);
        Recibo recibo1 = new Recibo();
        recibo1.setId(1L);
        Recibo recibo2 = new Recibo();
        recibo2.setId(recibo1.getId());
        assertThat(recibo1).isEqualTo(recibo2);
        recibo2.setId(2L);
        assertThat(recibo1).isNotEqualTo(recibo2);
        recibo1.setId(null);
        assertThat(recibo1).isNotEqualTo(recibo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReciboDTO.class);
        ReciboDTO reciboDTO1 = new ReciboDTO();
        reciboDTO1.setId(1L);
        ReciboDTO reciboDTO2 = new ReciboDTO();
        assertThat(reciboDTO1).isNotEqualTo(reciboDTO2);
        reciboDTO2.setId(reciboDTO1.getId());
        assertThat(reciboDTO1).isEqualTo(reciboDTO2);
        reciboDTO2.setId(2L);
        assertThat(reciboDTO1).isNotEqualTo(reciboDTO2);
        reciboDTO1.setId(null);
        assertThat(reciboDTO1).isNotEqualTo(reciboDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(reciboMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(reciboMapper.fromId(null)).isNull();
    }
}
