package es.jferna57.myfinances.service;

import es.jferna57.myfinances.domain.Bank;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Bank}.
 */
public interface BankService {
    /**
     * Save a bank.
     *
     * @param bank the entity to save.
     * @return the persisted entity.
     */
    Bank save(Bank bank);

    /**
     * Updates a bank.
     *
     * @param bank the entity to update.
     * @return the persisted entity.
     */
    Bank update(Bank bank);

    /**
     * Partially updates a bank.
     *
     * @param bank the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Bank> partialUpdate(Bank bank);

    /**
     * Get all the banks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Bank> findAll(Pageable pageable);

    /**
     * Get the "id" bank.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Bank> findOne(String id);

    /**
     * Delete the "id" bank.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
