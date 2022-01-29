import {Mathematica} from "./index";

const mathematica = new Mathematica();

describe("round", () => {
    it("Basic test", () => {
        expect(mathematica.round(3.14159, 2)).toBe(3.14);
    });
});

describe("infix2postfix", () => {
    it("Basic test", () => {
        expect(mathematica.infix2postfix("1-2+3")).toEqual([1, 2, "-", 3, "+"]);
        expect(mathematica.infix2postfix("1-2*3")).toEqual([1, 2, 3, "*", "-"]);
        expect(mathematica.infix2postfix("1*2+3")).toEqual([1, 2, "*", 3, "+"]);
        expect(mathematica.infix2postfix("2^3*4+5")).toEqual([2, 3, "^", 4, "*", 5, "+"]);
        expect(mathematica.infix2postfix("2+3+4^5-6")).toEqual([2, 3, "+", 4, 5, "^", "+", 6, "-"]);
        expect(mathematica.infix2postfix("2-3+4^5/6*7")).toEqual([2, 3, "-", 4, 5, "^", 6, "/", 7, "*", "+"]);
        expect(mathematica.infix2postfix("1+2*3^4-5")).toEqual([1, 2, 3, 4, "^", "*", "+", 5, "-"]);
        // ( )
        expect(mathematica.infix2postfix("1*(2+3)")).toEqual([1, 2, 3, "+", "*"]);
        expect(mathematica.infix2postfix("1*(2+3)")).toEqual([1, 2, 3, "+", "*"]);
        expect(mathematica.infix2postfix("1*(2*3-4)+5")).toEqual([1, 2, 3, "*", 4, "-", "*", 5, "+"]);
        expect(mathematica.infix2postfix("1*(2/(3-4))+5")).toEqual([1, 2, 3, 4, "-", "/", "*", 5, "+"]);
        // unary
        expect(mathematica.infix2postfix("-1-2")).toEqual([0, 1, "-", 2, "-"]);
        expect(mathematica.infix2postfix("(-1)-2")).toEqual([0, 1, "-", 2, "-"]);
        expect(mathematica.infix2postfix("(-1)")).toEqual([0, 1, "-"]);
        expect(mathematica.infix2postfix("-(-1)")).toEqual([0, 0, 1, "-", "-"]);
        expect(mathematica.infix2postfix("+(-1)")).toEqual([0, 0, 1, "-", "+"]);
        // float
        expect(mathematica.infix2postfix("100.100-2.34+3.98")).toEqual([100.1, 2.34, "-", 3.98, "+"]);
        expect(mathematica.infix2postfix("2.0-3.00+4.01^5.99/6.12*7.99")).toEqual([2, 3, "-", 4.01, 5.99, "^", 6.12, "/", 7.99, "*", "+"]);
        expect(mathematica.infix2postfix("0.1*(200.001/(30.3-4.01))+5.50")).toEqual([0.1, 200.001, 30.3, 4.01, "-", "/", "*", 5.5, "+"]);
        expect(mathematica.infix2postfix("-(-0001000.001)")).toEqual([0, 0, 1000.001, "-", "-"]);
        expect(mathematica.infix2postfix("+(-100.100)")).toEqual([0, 0, 100.100, "-", "+"]);
    });
});

describe("calculatePostfix", () => {
    it("Basic test", () => {
        expect(mathematica.calculatePostfix([1, 2, "-", 3, "+"])).toEqual(2);
        expect(mathematica.calculatePostfix([1, 2, 3, "*", "-"])).toEqual(-5);
        expect(mathematica.calculatePostfix([1, 2, 3, 1, "^", "*", "+", 5, "-"])).toEqual(2);
        // ( )
        expect(mathematica.calculatePostfix([1, 2, 3, 4, "-", "/", "*", 5, "+"])).toEqual(3);
        // unary
        expect(mathematica.calculatePostfix([0, 1, "-", 2, "-"])).toEqual(-3);
        expect(mathematica.calculatePostfix([0, 1, "-", 2, "-"])).toEqual(-3);
        expect(mathematica.calculatePostfix([0, 1, "-"])).toEqual(-1);
        expect(mathematica.calculatePostfix([0, 0, 1, "-", "-"])).toEqual(1);
        expect(mathematica.calculatePostfix([0, 0, 1, "-", "+"])).toEqual(-1);
        // float
        expect(mathematica.calculatePostfix([0, 0, 100.100, "-", "+"])).toEqual(-100.1);
    });
});

describe("isNumber", () => {
    it("Basic test", () => {
        expect(mathematica.isNumber(123)).toBe(true);
        expect(mathematica.isNumber(123.000)).toBe(true);
        expect(mathematica.isNumber(+123.000)).toBe(true);
        expect(mathematica.isNumber(-123.123)).toBe(true);
        expect(mathematica.isNumber(true)).toBe(false);
        expect(mathematica.isNumber(null)).toBe(false);
        expect(mathematica.isNumber("null")).toBe(false);
        expect(mathematica.isNumber("0")).toBe(true);
        expect(mathematica.isNumber("-0")).toBe(true);
        expect(mathematica.isNumber("0.123000")).toBe(true);
        expect(mathematica.isNumber("-0.123")).toBe(true);
        expect(mathematica.isNumber("+123.123")).toBe(true);
        expect(mathematica.isNumber("0-")).toBe(false);
        expect(mathematica.isNumber("1+1.11")).toBe(false);
        expect(mathematica.isNumber("^1.1")).toBe(false);
        expect(mathematica.isNumber("11.+11")).toBe(false);
    });
});

describe("isOperator", () => {
    it("Basic test", () => {
        expect(mathematica.isOperator("(")).toBe(true);
        expect(mathematica.isOperator(")")).toBe(true);
        expect(mathematica.isOperator("+")).toBe(true);
        expect(mathematica.isOperator("-")).toBe(true);
        expect(mathematica.isOperator("*")).toBe(true);
        expect(mathematica.isOperator("/")).toBe(true);
        expect(mathematica.isOperator("^")).toBe(true);
        expect(mathematica.isOperator("1")).toBe(false);
        expect(mathematica.isOperator("0")).toBe(false);
        expect(mathematica.isOperator("abc")).toBe(false);
        expect(mathematica.isOperator("))")).toBe(false);
        expect(mathematica.isOperator("*1")).toBe(false);
        expect(mathematica.isOperator(null)).toBe(false);
        expect(mathematica.isOperator(1)).toBe(false);
        expect(mathematica.isOperator(true)).toBe(false);
    });
});

describe("isAction", () => {
    it("Basic test", () => {
        expect(mathematica.isAction("(")).toBe(false);
        expect(mathematica.isAction(")")).toBe(false);
        expect(mathematica.isAction("+")).toBe(true);
        expect(mathematica.isAction("-")).toBe(true);
        expect(mathematica.isAction("*")).toBe(true);
        expect(mathematica.isAction("/")).toBe(true);
        expect(mathematica.isAction("^")).toBe(true);
        expect(mathematica.isAction("1")).toBe(false);
        expect(mathematica.isAction("0")).toBe(false);
        expect(mathematica.isAction("abc")).toBe(false);
        expect(mathematica.isAction("))")).toBe(false);
        expect(mathematica.isAction("*1")).toBe(false);
        expect(mathematica.isAction(null)).toBe(false);
        expect(mathematica.isAction(1)).toBe(false);
        expect(mathematica.isAction(true)).toBe(false);
    });
});
