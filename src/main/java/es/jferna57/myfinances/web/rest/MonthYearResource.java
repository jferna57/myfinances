package es.jferna57.myfinances.web.rest;

import es.jferna57.myfinances.domain.MonthYear;
import es.jferna57.myfinances.repository.MonthYearRepository;
import es.jferna57.myfinances.service.MonthYearService;
import es.jferna57.myfinances.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link es.jferna57.myfinances.domain.MonthYear}.
 */
@RestController
@RequestMapping("/api")
public class MonthYearResource {

    private final Logger log = LoggerFactory.getLogger(MonthYearResource.class);

    private static final String ENTITY_NAME = "monthYear";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MonthYearService monthYearService;

    private final MonthYearRepository monthYearRepository;

    public MonthYearResource(MonthYearService monthYearService, MonthYearRepository monthYearRepository) {
        this.monthYearService = monthYearService;
        this.monthYearRepository = monthYearRepository;
    }

    /**
     * {@code POST  /month-years} : Create a new monthYear.
     *
     * @param monthYear the monthYear to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new monthYear, or with status {@code 400 (Bad Request)} if the monthYear has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/month-years")
    public ResponseEntity<MonthYear> createMonthYear(@Valid @RequestBody MonthYear monthYear) throws URISyntaxException {
        log.debug("REST request to save MonthYear : {}", monthYear);
        if (monthYear.getId() != null) {
            throw new BadRequestAlertException("A new monthYear cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MonthYear result = monthYearService.save(monthYear);
        return ResponseEntity
            .created(new URI("/api/month-years/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /month-years/:id} : Updates an existing monthYear.
     *
     * @param id the id of the monthYear to save.
     * @param monthYear the monthYear to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monthYear,
     * or with status {@code 400 (Bad Request)} if the monthYear is not valid,
     * or with status {@code 500 (Internal Server Error)} if the monthYear couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/month-years/{id}")
    public ResponseEntity<MonthYear> updateMonthYear(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody MonthYear monthYear
    ) throws URISyntaxException {
        log.debug("REST request to update MonthYear : {}, {}", id, monthYear);
        if (monthYear.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, monthYear.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!monthYearRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MonthYear result = monthYearService.update(monthYear);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monthYear.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /month-years/:id} : Partial updates given fields of an existing monthYear, field will ignore if it is null
     *
     * @param id the id of the monthYear to save.
     * @param monthYear the monthYear to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monthYear,
     * or with status {@code 400 (Bad Request)} if the monthYear is not valid,
     * or with status {@code 404 (Not Found)} if the monthYear is not found,
     * or with status {@code 500 (Internal Server Error)} if the monthYear couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/month-years/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MonthYear> partialUpdateMonthYear(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody MonthYear monthYear
    ) throws URISyntaxException {
        log.debug("REST request to partial update MonthYear partially : {}, {}", id, monthYear);
        if (monthYear.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, monthYear.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!monthYearRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MonthYear> result = monthYearService.partialUpdate(monthYear);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monthYear.getId())
        );
    }

    /**
     * {@code GET  /month-years} : get all the monthYears.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of monthYears in body.
     */
    @GetMapping("/month-years")
    public ResponseEntity<List<MonthYear>> getAllMonthYears(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of MonthYears");
        Page<MonthYear> page = monthYearService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /month-years/:id} : get the "id" monthYear.
     *
     * @param id the id of the monthYear to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the monthYear, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/month-years/{id}")
    public ResponseEntity<MonthYear> getMonthYear(@PathVariable String id) {
        log.debug("REST request to get MonthYear : {}", id);
        Optional<MonthYear> monthYear = monthYearService.findOne(id);
        return ResponseUtil.wrapOrNotFound(monthYear);
    }

    /**
     * {@code DELETE  /month-years/:id} : delete the "id" monthYear.
     *
     * @param id the id of the monthYear to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/month-years/{id}")
    public ResponseEntity<Void> deleteMonthYear(@PathVariable String id) {
        log.debug("REST request to delete MonthYear : {}", id);
        monthYearService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
