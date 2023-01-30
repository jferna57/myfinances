package es.jferna57.myfinances.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Entry.
 */
@Document(collection = "entry")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Entry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @DecimalMin(value = "0")
    @Field("amount")
    private Float amount;

    @NotNull
    @Field("entry_date")
    private Instant entryDate;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("product")
    @JsonIgnoreProperties(value = { "entries", "user", "bank" }, allowSetters = true)
    private Product product;

    @DBRef
    @Field("monthYear")
    @JsonIgnoreProperties(value = { "entries", "user" }, allowSetters = true)
    private MonthYear monthYear;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Entry id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Float getAmount() {
        return this.amount;
    }

    public Entry amount(Float amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Instant getEntryDate() {
        return this.entryDate;
    }

    public Entry entryDate(Instant entryDate) {
        this.setEntryDate(entryDate);
        return this;
    }

    public void setEntryDate(Instant entryDate) {
        this.entryDate = entryDate;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Entry user(User user) {
        this.setUser(user);
        return this;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Entry product(Product product) {
        this.setProduct(product);
        return this;
    }

    public MonthYear getMonthYear() {
        return this.monthYear;
    }

    public void setMonthYear(MonthYear monthYear) {
        this.monthYear = monthYear;
    }

    public Entry monthYear(MonthYear monthYear) {
        this.setMonthYear(monthYear);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entry)) {
            return false;
        }
        return id != null && id.equals(((Entry) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entry{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", entryDate='" + getEntryDate() + "'" +
            "}";
    }
}
