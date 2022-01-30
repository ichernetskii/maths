import {isAction, isNumber, isOperator, isTokenInfix} from "./types";

describe("isNumber", () => {
    it("Basic test", () => {
        expect(isNumber(123)).toBe(true);
        expect(isNumber(123.000)).toBe(true);
        expect(isNumber(+123.000)).toBe(true);
        expect(isNumber(-123.123)).toBe(true);
        expect(isNumber(true)).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber("null")).toBe(false);
        expect(isNumber("0")).toBe(true);
        expect(isNumber("-0")).toBe(true);
        expect(isNumber("0.123000")).toBe(true);
        expect(isNumber("-0.123")).toBe(true);
        expect(isNumber("+123.123")).toBe(true);
        expect(isNumber("0-")).toBe(false);
        expect(isNumber("1+1.11")).toBe(false);
        expect(isNumber("^1.1")).toBe(false);
        expect(isNumber("11.+11")).toBe(false);
    });
});

describe("isOperator", () => {
    it("Basic test", () => {
        expect(isOperator("(")).toBe(true);
        expect(isOperator(")")).toBe(true);
        expect(isOperator("+")).toBe(true);
        expect(isOperator("-")).toBe(true);
        expect(isOperator("*")).toBe(true);
        expect(isOperator("/")).toBe(true);
        expect(isOperator("^")).toBe(true);
        expect(isOperator("1")).toBe(false);
        expect(isOperator("0")).toBe(false);
        expect(isOperator("abc")).toBe(false);
        expect(isOperator("))")).toBe(false);
        expect(isOperator("*1")).toBe(false);
        expect(isOperator(null)).toBe(false);
        expect(isOperator(1)).toBe(false);
        expect(isOperator(true)).toBe(false);
    });
});

describe("isTokenInfix", () => {
    it("Basic test", () => {
        expect(isTokenInfix("(")).toBe(true);
        expect(isTokenInfix(")")).toBe(true);
        expect(isTokenInfix("+")).toBe(true);
        expect(isTokenInfix("-")).toBe(true);
        expect(isTokenInfix("*")).toBe(true);
        expect(isTokenInfix("/")).toBe(true);
        expect(isTokenInfix("^")).toBe(true);
        expect(isTokenInfix("1")).toBe(false);
        expect(isTokenInfix("0")).toBe(false);
        expect(isTokenInfix("abc")).toBe(false);
        expect(isTokenInfix("))")).toBe(false);
        expect(isTokenInfix("*1")).toBe(false);
        expect(isTokenInfix(null)).toBe(false);
        expect(isTokenInfix(1)).toBe(true);
        expect(isTokenInfix(true)).toBe(false);
        expect(isTokenInfix(1.1)).toBe(true);
    });
});

describe("isAction", () => {
    it("Basic test", () => {
        expect(isAction("(")).toBe(false);
        expect(isAction(")")).toBe(false);
        expect(isAction("+")).toBe(true);
        expect(isAction("-")).toBe(true);
        expect(isAction("*")).toBe(true);
        expect(isAction("/")).toBe(true);
        expect(isAction("^")).toBe(true);
        expect(isAction("1")).toBe(false);
        expect(isAction("0")).toBe(false);
        expect(isAction("abc")).toBe(false);
        expect(isAction("))")).toBe(false);
        expect(isAction("*1")).toBe(false);
        expect(isAction(null)).toBe(false);
        expect(isAction(1)).toBe(false);
        expect(isAction(true)).toBe(false);
    });
});
