package es.jferna57.myfinances.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.jferna57.myfinances.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EntryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entry.class);
        Entry entry1 = new Entry();
        entry1.setId("id1");
        Entry entry2 = new Entry();
        entry2.setId(entry1.getId());
        assertThat(entry1).isEqualTo(entry2);
        entry2.setId("id2");
        assertThat(entry1).isNotEqualTo(entry2);
        entry1.setId(null);
        assertThat(entry1).isNotEqualTo(entry2);
    }
}
