import {calculate, infix2postfix} from "./calculate";
import {MathsError} from "./_internals/error";

describe("infix2postfix", () => {
    it("Basic test", () => {
        expect(infix2postfix("1-2+3")).toEqual([1, 2, "-", 3, "+"]);
        expect(infix2postfix("1-2*3")).toEqual([1, 2, 3, "*", "-"]);
        expect(infix2postfix("1*2+3")).toEqual([1, 2, "*", 3, "+"]);
        expect(infix2postfix("2^3*4+5")).toEqual([2, 3, "^", 4, "*", 5, "+"]);
        expect(infix2postfix("2+3+4^5-6")).toEqual([2, 3, "+", 4, 5, "^", "+", 6, "-"]);
        expect(infix2postfix("2-3+4^5/6*7")).toEqual([2, 3, "-", 4, 5, "^", 6, "/", 7, "*", "+"]);
        expect(infix2postfix("1+2*3^4-5")).toEqual([1, 2, 3, 4, "^", "*", "+", 5, "-"]);
        // ( )
        expect(infix2postfix("1*(2+3)")).toEqual([1, 2, 3, "+", "*"]);
        expect(infix2postfix("1*(2+3)")).toEqual([1, 2, 3, "+", "*"]);
        expect(infix2postfix("1*(2*3-4)+5")).toEqual([1, 2, 3, "*", 4, "-", "*", 5, "+"]);
        expect(infix2postfix("1*(2/(3-4))+5")).toEqual([1, 2, 3, 4, "-", "/", "*", 5, "+"]);
        // unary
        expect(infix2postfix("-1-2")).toEqual([0, 1, "-", 2, "-"]);
        expect(infix2postfix("(-1)-2")).toEqual([0, 1, "-", 2, "-"]);
        expect(infix2postfix("(-1)")).toEqual([0, 1, "-"]);
        expect(infix2postfix("-(-1)")).toEqual([0, 0, 1, "-", "-"]);
        expect(infix2postfix("+(-1)")).toEqual([0, 0, 1, "-", "+"]);
        // float
        expect(infix2postfix("100.100-2.34+3.98")).toEqual([100.1, 2.34, "-", 3.98, "+"]);
        expect(infix2postfix("2.0-3.00+4.01^5.99/6.12*7.99")).toEqual([2, 3, "-", 4.01, 5.99, "^", 6.12, "/", 7.99, "*", "+"]);
        expect(infix2postfix("0.1*(200.001/(30.3-4.01))+5.50")).toEqual([0.1, 200.001, 30.3, 4.01, "-", "/", "*", 5.5, "+"]);
        expect(infix2postfix("-(-0001000.001)")).toEqual([0, 0, 1000.001, "-", "-"]);
        expect(infix2postfix("+(-100.100)")).toEqual([0, 0, 100.100, "-", "+"]);

        // error
        expect(() => infix2postfix("1+1+-2")).toThrowError(new MathsError(MathsError.values.ManyActionTokensError, 4, "+", "-"));
        expect(() => infix2postfix("1+1-)j")).toThrowError(new MathsError(MathsError.values.UnexpectedTokenError, "j"));
        expect(() => infix2postfix("1+2+(*2)")).toThrowError(new MathsError(MathsError.values.TokenAfterOpenParenthesesError, "*", 6));
    });
});

describe("calculate", () => {
    it("Basic test", () => {
        expect(calculate([1, 2, "-", 3, "+"])).toEqual(2);
        expect(calculate([1, 2, 3, "*", "-"])).toEqual(-5);
        expect(calculate([1, 2, 3, 1, "^", "*", "+", 5, "-"])).toEqual(2);
        // ( )
        expect(calculate([1, 2, 3, 4, "-", "/", "*", 5, "+"])).toEqual(3);
        // unary
        expect(calculate([0, 1, "-", 2, "-"])).toEqual(-3);
        expect(calculate([0, 1, "-", 2, "-"])).toEqual(-3);
        expect(calculate([0, 1, "-"])).toEqual(-1);
        expect(calculate([0, 0, 1, "-", "-"])).toEqual(1);
        expect(calculate([0, 0, 1, "-", "+"])).toEqual(-1);
        // float
        expect(calculate([0, 0, 100.100, "-", "+"])).toEqual(-100.1);
    });
});
