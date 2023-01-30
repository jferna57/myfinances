package es.jferna57.myfinances.service;

import es.jferna57.myfinances.domain.Entry;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Entry}.
 */
public interface EntryService {
    /**
     * Save a entry.
     *
     * @param entry the entity to save.
     * @return the persisted entity.
     */
    Entry save(Entry entry);

    /**
     * Updates a entry.
     *
     * @param entry the entity to update.
     * @return the persisted entity.
     */
    Entry update(Entry entry);

    /**
     * Partially updates a entry.
     *
     * @param entry the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Entry> partialUpdate(Entry entry);

    /**
     * Get all the entries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Entry> findAll(Pageable pageable);

    /**
     * Get the "id" entry.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Entry> findOne(String id);

    /**
     * Delete the "id" entry.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
