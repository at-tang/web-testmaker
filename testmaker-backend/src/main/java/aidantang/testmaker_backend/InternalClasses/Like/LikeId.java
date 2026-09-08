package aidantang.testmaker_backend.InternalClasses.Like;

import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class LikeId {
    /*
    A class that contains the identification attributes that
    makes each like distinct. Contains a quizId and userId, showing
    a user liked a quiz. 
     */

    private String userId;
    private String quizId;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof LikeId)) return false;
        LikeId other = (LikeId) o;
        return this.quizId.equals(other.quizId) && this.userId.equals(other.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.userId, this.quizId);
    }
    
}
