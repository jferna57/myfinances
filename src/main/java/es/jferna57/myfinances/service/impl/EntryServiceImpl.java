package es.jferna57.myfinances.service.impl;

import es.jferna57.myfinances.domain.Entry;
import es.jferna57.myfinances.repository.EntryRepository;
import es.jferna57.myfinances.service.EntryService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Entry}.
 */
@Service
public class EntryServiceImpl implements EntryService {

    private final Logger log = LoggerFactory.getLogger(EntryServiceImpl.class);

    private final EntryRepository entryRepository;

    public EntryServiceImpl(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    @Override
    public Entry save(Entry entry) {
        log.debug("Request to save Entry : {}", entry);
        return entryRepository.save(entry);
    }

    @Override
    public Entry update(Entry entry) {
        log.debug("Request to update Entry : {}", entry);
        return entryRepository.save(entry);
    }

    @Override
    public Optional<Entry> partialUpdate(Entry entry) {
        log.debug("Request to partially update Entry : {}", entry);

        return entryRepository
            .findById(entry.getId())
            .map(existingEntry -> {
                if (entry.getAmount() != null) {
                    existingEntry.setAmount(entry.getAmount());
                }
                if (entry.getEntryDate() != null) {
                    existingEntry.setEntryDate(entry.getEntryDate());
                }

                return existingEntry;
            })
            .map(entryRepository::save);
    }

    @Override
    public Page<Entry> findAll(Pageable pageable) {
        log.debug("Request to get all Entries");
        return entryRepository.findAll(pageable);
    }

    @Override
    public Optional<Entry> findOne(String id) {
        log.debug("Request to get Entry : {}", id);
        return entryRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Entry : {}", id);
        entryRepository.deleteById(id);
    }
}
