package es.jferna57.myfinances.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.jferna57.myfinances.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MonthYearTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MonthYear.class);
        MonthYear monthYear1 = new MonthYear();
        monthYear1.setId("id1");
        MonthYear monthYear2 = new MonthYear();
        monthYear2.setId(monthYear1.getId());
        assertThat(monthYear1).isEqualTo(monthYear2);
        monthYear2.setId("id2");
        assertThat(monthYear1).isNotEqualTo(monthYear2);
        monthYear1.setId(null);
        assertThat(monthYear1).isNotEqualTo(monthYear2);
    }
}
