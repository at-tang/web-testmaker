export interface GivenAnswer {
    questionId: string,
    givenAnswers: Array<String>
}

export interface Quiz {
    id: string,
    title: string, 
    description: string,
    time: number,
    visible: boolean,
    questions: Array<Question>,
    userId: string,
    tags: Array<string>,
    randomQuestionOrder: boolean
}

export interface Question {
    answers: Array<Answer>,
    caseSensitive: boolean,
    correctAnswers: Array<String>,
    description: string,
    explanation: string,
    hint: any,
    id: string,
    number: number,
    points: number,
    title: string,
    type: string
}

export interface Answer {
    content: string,
    correct: boolean,
    explanation: string,
    id: string,
    questionId: string
}