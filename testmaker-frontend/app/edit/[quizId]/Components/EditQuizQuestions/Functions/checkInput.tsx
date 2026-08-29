export const checkInput = (quiz) => {

    for (question in quiz.questions) {

        // Check that every question has a title
        if (title == "") return "Please enter a title for your quiz.";

        // Check that every question has at least one answer
        if (question.answers.length == 0) {
            return "There exist questions without any answers";
        }

        let numCorrect = 0;
        for (answer in question.answers) {
            if (answer.correct == true) numCorrect += 1

            // Check that there are no blank answers
            if (answer.content == "") return "An answer for a question is left blank."

        }

        // Check that every question has at least one correct answer
        if (numCorrect == 0) return "A question does not have correct answer"
    }
    return "";
}