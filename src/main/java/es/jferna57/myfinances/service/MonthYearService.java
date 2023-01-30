package es.jferna57.myfinances.service;

import es.jferna57.myfinances.domain.MonthYear;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link MonthYear}.
 */
public interface MonthYearService {
    /**
     * Save a monthYear.
     *
     * @param monthYear the entity to save.
     * @return the persisted entity.
     */
    MonthYear save(MonthYear monthYear);

    /**
     * Updates a monthYear.
     *
     * @param monthYear the entity to update.
     * @return the persisted entity.
     */
    MonthYear update(MonthYear monthYear);

    /**
     * Partially updates a monthYear.
     *
     * @param monthYear the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MonthYear> partialUpdate(MonthYear monthYear);

    /**
     * Get all the monthYears.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MonthYear> findAll(Pageable pageable);

    /**
     * Get the "id" monthYear.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MonthYear> findOne(String id);

    /**
     * Delete the "id" monthYear.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
