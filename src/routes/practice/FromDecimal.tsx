import { createSignal, Show } from 'solid-js';
import { generateQuestion, QuestionType, Question } from '../../utils/questionGenerator';

// TODO: move it to a utils.ts file
function containsNonBinary(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        if (str[i] != '0' && str[i] != '1') {
            return true;
        }
    }
    return false;
}

export default function FromDecimal() {
    const [isCorrect, setIsCorrect] = createSignal<boolean | null>(null);
    const [userInput, setUserInput] = createSignal<string>("");
    const [inputError, setInputError] = createSignal<string | null>(null);
    const [digits, setDigits] = createSignal<number>(2);
    const [question, setQuestion] = createSignal<Question>(generateQuestion(QuestionType.FromDecimal, digits()));
    const [previousQuestion, setPreviousQuestion] = createSignal<Question | null>(null);

    const submitted = (e: SubmitEvent) => {
        e.preventDefault();

        setPreviousQuestion(question());
        validateInput();

        if (inputError() == null) {
            checkUserInput();
        }

        setUserInput("");
    }

    const validateInput = () => {
        if (userInput().length == 0) {
            setInputError('Umm... Is there anything in the input?');
            setIsCorrect(null);
        } else if (containsNonBinary(userInput())) {
            setInputError('Invalid binary format. Use only 0s and 1s.');
            setIsCorrect(null);
        } else {
            setInputError(null);
        }
    }

    const checkUserInput = () => {
        if (userInput() == question().answer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setQuestion(generateQuestion(QuestionType.FromDecimal, digits()));
    }

    const changeDigits = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setDigits(parseInt(target.value));
    }

    const digitsSubmitted = (e: SubmitEvent) => {
        e.preventDefault();
        setQuestion(generateQuestion(QuestionType.FromDecimal, digits()));
    }

    return <>
        <h1>From Decimal</h1>
        <p>{question().question}</p>
        <form onSubmit={submitted}>
            <input
                type="text"
                value={userInput()}
                onInput={(e) => setUserInput(e.currentTarget.value)}
                placeholder="10011"
                class="focus:outline-cyan"
            />
            <button>Submit</button>
        </form>

        <Show when={inputError() != null}>
            <p>{inputError()}</p>
        </Show>
        <Show when={isCorrect()}>
            Correct!
        </Show>
        <Show when={isCorrect() == false}>
        {/*
        // @ts-ignore */}
            <p>Wrong! Correct answer was {previousQuestion().answer}</p>
        </Show>

        <form onSubmit={digitsSubmitted}>
            <input type="range" min='1' max='5' value={digits()} onInput={changeDigits} />
            <button>Change Digits!</button>
        </form>
    </>
}
