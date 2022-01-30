import {Action, Operator} from "./types";

export const operatorPriority: Record<Operator, number> = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
    "(": 4,
    ")": 0,
}

export const makeAction = (a: number, b: number, action: Action): number => {
    switch (action) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        case "^": return a ** b;
    }
}
