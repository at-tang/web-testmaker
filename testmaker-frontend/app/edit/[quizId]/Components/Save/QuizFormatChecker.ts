import { Question, QuizEdit } from "@/app/Types/types";

export function QuizFormatChecker(quiz: QuizEdit): string {
    /*
    The following function checks if the quiz's input is proper,
    and returns a string detailing where the format error lies. 

    For example, if a Quiz has no title, the function will return: "Quiz has no title"
    However, if a quiz is properly formatted, it will return "".

    This function is only one safeguard to prevent bad inputs. The backend
    application contains its own checker that will reject an improper quiz. 
    While the backend checker is designed to prevent bad actors from providing 
    improper quizzes, this checker is designed for the average user who may 
    not realize an error in their quiz.

    */

    // ERROR 1: Title has no title
    if (quiz.title.length < 8) return "The title for your quiz must be at least 8 characters long."
    if (quiz.title.length > 60) return "Please enter a title that is under 60 characters."

    // ERROR 2: Description must be under 300 characters
    if (quiz.description.length > 1000) return "The description of your quiz cannot be over 300 characters."

    if (quiz.questions.length <= 2) return `Your quiz must have at least 3 questions.`

    for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.questions[i].description.length == 0) return `Question ${i + 1} has a blank description.`
        if (quiz.questions[i].points < 1) return `Question ${i + 1} cannot award less than 1 point.`

        let numOfCorrect: number = 0;

        if (quiz.questions[i].answers.length === 0) return `Question ${i + 1} must have at least one answer.` 
        if (quiz.questions[i].answers.length > 5) return `Question ${i + 1} cannot have more than five answers.`

        for (let j = 0; j < quiz.questions[i].answers.length; j++) {
        
            let currentAnswer = quiz.questions[i].answers[j];

            if (currentAnswer.correct) numOfCorrect++

            if (currentAnswer.content.length == 0) return `Question ${i+1} contains a blank answer`
            if (currentAnswer.content.length > 100) return `Question ${i+1} contains an answer whose description is over 100 characters.`
        }

        if (numOfCorrect < 1) return `Question ${i + 1} must have at least one correct answer.`

    }

    



    return ""; // Blank message means there is nothing wrong with the quiz

}