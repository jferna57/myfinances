package es.jferna57.myfinances.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.jferna57.myfinances.IntegrationTest;
import es.jferna57.myfinances.domain.MonthYear;
import es.jferna57.myfinances.repository.MonthYearRepository;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link MonthYearResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MonthYearResourceIT {

    private static final Integer DEFAULT_MONTH = 1;
    private static final Integer UPDATED_MONTH = 2;

    private static final Integer DEFAULT_YEAR = 2000;
    private static final Integer UPDATED_YEAR = 2001;

    private static final String ENTITY_API_URL = "/api/month-years";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private MonthYearRepository monthYearRepository;

    @Autowired
    private MockMvc restMonthYearMockMvc;

    private MonthYear monthYear;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MonthYear createEntity() {
        MonthYear monthYear = new MonthYear().month(DEFAULT_MONTH).year(DEFAULT_YEAR);
        return monthYear;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MonthYear createUpdatedEntity() {
        MonthYear monthYear = new MonthYear().month(UPDATED_MONTH).year(UPDATED_YEAR);
        return monthYear;
    }

    @BeforeEach
    public void initTest() {
        monthYearRepository.deleteAll();
        monthYear = createEntity();
    }

    @Test
    void createMonthYear() throws Exception {
        int databaseSizeBeforeCreate = monthYearRepository.findAll().size();
        // Create the MonthYear
        restMonthYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monthYear)))
            .andExpect(status().isCreated());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeCreate + 1);
        MonthYear testMonthYear = monthYearList.get(monthYearList.size() - 1);
        assertThat(testMonthYear.getMonth()).isEqualTo(DEFAULT_MONTH);
        assertThat(testMonthYear.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    void createMonthYearWithExistingId() throws Exception {
        // Create the MonthYear with an existing ID
        monthYear.setId("existing_id");

        int databaseSizeBeforeCreate = monthYearRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMonthYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monthYear)))
            .andExpect(status().isBadRequest());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkMonthIsRequired() throws Exception {
        int databaseSizeBeforeTest = monthYearRepository.findAll().size();
        // set the field null
        monthYear.setMonth(null);

        // Create the MonthYear, which fails.

        restMonthYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monthYear)))
            .andExpect(status().isBadRequest());

        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = monthYearRepository.findAll().size();
        // set the field null
        monthYear.setYear(null);

        // Create the MonthYear, which fails.

        restMonthYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monthYear)))
            .andExpect(status().isBadRequest());

        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllMonthYears() throws Exception {
        // Initialize the database
        monthYearRepository.save(monthYear);

        // Get all the monthYearList
        restMonthYearMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(monthYear.getId())))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH)))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)));
    }

    @Test
    void getMonthYear() throws Exception {
        // Initialize the database
        monthYearRepository.save(monthYear);

        // Get the monthYear
        restMonthYearMockMvc
            .perform(get(ENTITY_API_URL_ID, monthYear.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(monthYear.getId()))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR));
    }

    @Test
    void getNonExistingMonthYear() throws Exception {
        // Get the monthYear
        restMonthYearMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingMonthYear() throws Exception {
        // Initialize the database
        monthYearRepository.save(monthYear);

        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();

        // Update the monthYear
        MonthYear updatedMonthYear = monthYearRepository.findById(monthYear.getId()).get();
        updatedMonthYear.month(UPDATED_MONTH).year(UPDATED_YEAR);

        restMonthYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMonthYear.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMonthYear))
            )
            .andExpect(status().isOk());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
        MonthYear testMonthYear = monthYearList.get(monthYearList.size() - 1);
        assertThat(testMonthYear.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testMonthYear.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    void putNonExistingMonthYear() throws Exception {
        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();
        monthYear.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMonthYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, monthYear.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(monthYear))
            )
            .andExpect(status().isBadRequest());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchMonthYear() throws Exception {
        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();
        monthYear.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonthYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(monthYear))
            )
            .andExpect(status().isBadRequest());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamMonthYear() throws Exception {
        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();
        monthYear.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonthYearMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monthYear)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateMonthYearWithPatch() throws Exception {
        // Initialize the database
        monthYearRepository.save(monthYear);

        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();

        // Update the monthYear using partial update
        MonthYear partialUpdatedMonthYear = new MonthYear();
        partialUpdatedMonthYear.setId(monthYear.getId());

        partialUpdatedMonthYear.month(UPDATED_MONTH);

        restMonthYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMonthYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMonthYear))
            )
            .andExpect(status().isOk());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
        MonthYear testMonthYear = monthYearList.get(monthYearList.size() - 1);
        assertThat(testMonthYear.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testMonthYear.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    void fullUpdateMonthYearWithPatch() throws Exception {
        // Initialize the database
        monthYearRepository.save(monthYear);

        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();

        // Update the monthYear using partial update
        MonthYear partialUpdatedMonthYear = new MonthYear();
        partialUpdatedMonthYear.setId(monthYear.getId());

        partialUpdatedMonthYear.month(UPDATED_MONTH).year(UPDATED_YEAR);

        restMonthYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMonthYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMonthYear))
            )
            .andExpect(status().isOk());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
        MonthYear testMonthYear = monthYearList.get(monthYearList.size() - 1);
        assertThat(testMonthYear.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testMonthYear.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    void patchNonExistingMonthYear() throws Exception {
        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();
        monthYear.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMonthYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, monthYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(monthYear))
            )
            .andExpect(status().isBadRequest());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchMonthYear() throws Exception {
        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();
        monthYear.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonthYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(monthYear))
            )
            .andExpect(status().isBadRequest());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamMonthYear() throws Exception {
        int databaseSizeBeforeUpdate = monthYearRepository.findAll().size();
        monthYear.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonthYearMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(monthYear))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MonthYear in the database
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteMonthYear() throws Exception {
        // Initialize the database
        monthYearRepository.save(monthYear);

        int databaseSizeBeforeDelete = monthYearRepository.findAll().size();

        // Delete the monthYear
        restMonthYearMockMvc
            .perform(delete(ENTITY_API_URL_ID, monthYear.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MonthYear> monthYearList = monthYearRepository.findAll();
        assertThat(monthYearList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
