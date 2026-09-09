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

export class QuizEdit {
    id: string;
    title: string;
    description: string;
    time: number;
    visible: boolean;
    questions: Array<Question>;
    userId: string;
    tags: Array<string>;
    randomQuestionOrder: boolean;

    public constructor() {
        this.id =  "newquiz"
        this.title =  ""
        this.description = ""
        this.time = 60
        this.visible = false
        this.questions = [        
            {
            title: "",
            description: "",
            explanation: "",
            points: 1,
            type: "MC",
            caseSensitive: false,
            answers: [
                {
                    content: "",
                    correct: false,
                    explanation: ""
                }
            ]
        }]
        this.userId = ""
        this.tags = []
        this.randomQuestionOrder = false

    }

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
    type: string
}

export interface Answer {
    content: string,
    correct: boolean,
    explanation: string,
    id: string,
    questionId: string
}

export interface DisplayQuiz {
    description: string,
    id: string,
    likes: number,
    ownerName: string,
    plays: number,
    questionCount: number,
    randomQuestionOrder: boolean,
    tags: Array<string>,
    time: number,
    title: string,
    totalPoints: number,
    totalQuestions: number,
    totalRating: number,
    totalUsersRated: number,
    userId: string,
    userLiked: boolean,
    visible: boolean,
    dateCreated: number,
    dateUpdated: number

    
}

export interface QuizResultListEntry {
    id: string,
    quizId: string,
    title: string,
    pointsObtained: number,
    pointsTotal: number,
    userId: string,
    dateAttempted: string

}

export interface QuizResultList {
    numberOfEntries: number,
    entries: Array<QuizResultListEntry>
}

export class UserDetails {
    email: string = ""
    displayName: string = ""
    id: string = ""

    public constructor(email: string, displayName: string, id: string) {
        this.email = email;
        this.displayName = displayName;
        this.id = id;
    }
}