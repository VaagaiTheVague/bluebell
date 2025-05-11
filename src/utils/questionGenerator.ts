export enum QuestionType {
    FromDecimal
}

export interface Question {
    type: QuestionType,
    question: string,
    answer: string,
}

export function generateQuestion(type: QuestionType, difficulty: number): Question {
    switch (type) {
        case QuestionType.FromDecimal:
            return generateFromDecimal(difficulty);
    }
}

function generateFromDecimal(digits: number): Question {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits);

    const question = (Math.floor(Math.random() * (max - min + 1)) + min) - 1;
    const answer  = question.toString(2);
    return { type: QuestionType.FromDecimal, question: question.toString(), answer };
}

