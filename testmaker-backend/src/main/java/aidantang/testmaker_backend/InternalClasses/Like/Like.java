package aidantang.testmaker_backend.InternalClasses.Like;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="likes")
public class Like {

    /*
    Like class. Used to represent that a user liked a quiz.
     */

    @EmbeddedId
    private LikeId id;
}
