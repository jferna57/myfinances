package es.jferna57.myfinances.repository;

import es.jferna57.myfinances.domain.MonthYear;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the MonthYear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonthYearRepository extends MongoRepository<MonthYear, String> {}