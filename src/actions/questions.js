export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


export function receive_questions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}