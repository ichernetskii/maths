import {operatorPriority} from "./assets";

export type Action = "+" | "-" | "*" | "/" | "^";
export type Parentheses = "(" | ")";
export type Operator = Action | Parentheses;
export type TokenPostfix = number | Action;
export type TokenInfix = number | Operator;
export type OperatorPriority =  {
    operator: Operator;
    priority: number;
}

// number or string with number
export const isNumber = (arg: unknown): arg is number => {
    switch (typeof arg) {
        case "number": return true;
        case "string": return /^[+-]?\d+([.]\d+)?$/.test(arg);
        default: return false;
    }
};

export const isOperator = (arg: unknown): arg is Operator =>
    typeof arg === "string"
        ? Object.keys(operatorPriority).includes(arg)
        : false;

export const isAction = (arg: unknown): arg is Action => {
    if (typeof arg !== "string") return false;
    const actions = Object
        .keys(operatorPriority)
        .filter(operator => !["(", ")"]
            .includes(operator)
        );
    return actions.includes(arg);
};

export const isTokenInfix = (arg: unknown): arg is TokenInfix => {
    if (typeof arg === "number") return true;
    return isOperator(arg);
}
