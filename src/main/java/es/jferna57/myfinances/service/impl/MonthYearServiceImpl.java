package es.jferna57.myfinances.service.impl;

import es.jferna57.myfinances.domain.MonthYear;
import es.jferna57.myfinances.repository.MonthYearRepository;
import es.jferna57.myfinances.service.MonthYearService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link MonthYear}.
 */
@Service
public class MonthYearServiceImpl implements MonthYearService {

    private final Logger log = LoggerFactory.getLogger(MonthYearServiceImpl.class);

    private final MonthYearRepository monthYearRepository;

    public MonthYearServiceImpl(MonthYearRepository monthYearRepository) {
        this.monthYearRepository = monthYearRepository;
    }

    @Override
    public MonthYear save(MonthYear monthYear) {
        log.debug("Request to save MonthYear : {}", monthYear);
        return monthYearRepository.save(monthYear);
    }

    @Override
    public MonthYear update(MonthYear monthYear) {
        log.debug("Request to update MonthYear : {}", monthYear);
        return monthYearRepository.save(monthYear);
    }

    @Override
    public Optional<MonthYear> partialUpdate(MonthYear monthYear) {
        log.debug("Request to partially update MonthYear : {}", monthYear);

        return monthYearRepository
            .findById(monthYear.getId())
            .map(existingMonthYear -> {
                if (monthYear.getMonth() != null) {
                    existingMonthYear.setMonth(monthYear.getMonth());
                }
                if (monthYear.getYear() != null) {
                    existingMonthYear.setYear(monthYear.getYear());
                }

                return existingMonthYear;
            })
            .map(monthYearRepository::save);
    }

    @Override
    public Page<MonthYear> findAll(Pageable pageable) {
        log.debug("Request to get all MonthYears");
        return monthYearRepository.findAll(pageable);
    }

    @Override
    public Optional<MonthYear> findOne(String id) {
        log.debug("Request to get MonthYear : {}", id);
        return monthYearRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete MonthYear : {}", id);
        monthYearRepository.deleteById(id);
    }
}
