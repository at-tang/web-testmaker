export interface Quiz {
    title: string,
    description: string,
    type: string,
    points: number,
    explanation: string,
    answers: Array<Answer>
}