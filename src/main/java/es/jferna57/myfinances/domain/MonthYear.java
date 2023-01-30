package es.jferna57.myfinances.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A MonthYear.
 */
@Document(collection = "month_year")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MonthYear implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Min(value = 1)
    @Max(value = 12)
    @Field("month")
    private Integer month;

    @NotNull
    @Min(value = 2000)
    @Field("year")
    private Integer year;

    @DBRef
    @Field("entry")
    @JsonIgnoreProperties(value = { "user", "product", "monthYear" }, allowSetters = true)
    private Set<Entry> entries = new HashSet<>();

    @DBRef
    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public MonthYear id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getMonth() {
        return this.month;
    }

    public MonthYear month(Integer month) {
        this.setMonth(month);
        return this;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return this.year;
    }

    public MonthYear year(Integer year) {
        this.setYear(year);
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Set<Entry> getEntries() {
        return this.entries;
    }

    public void setEntries(Set<Entry> entries) {
        if (this.entries != null) {
            this.entries.forEach(i -> i.setMonthYear(null));
        }
        if (entries != null) {
            entries.forEach(i -> i.setMonthYear(this));
        }
        this.entries = entries;
    }

    public MonthYear entries(Set<Entry> entries) {
        this.setEntries(entries);
        return this;
    }

    public MonthYear addEntry(Entry entry) {
        this.entries.add(entry);
        entry.setMonthYear(this);
        return this;
    }

    public MonthYear removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.setMonthYear(null);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public MonthYear user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MonthYear)) {
            return false;
        }
        return id != null && id.equals(((MonthYear) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MonthYear{" +
            "id=" + getId() +
            ", month=" + getMonth() +
            ", year=" + getYear() +
            "}";
    }
}
