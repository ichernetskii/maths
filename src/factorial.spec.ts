import { factorial } from "./factorial";
import {MathsError} from "./_internals/error";

it("Basic tests", () => {
    expect(factorial(5)).toEqual(120);
    expect(factorial(1)).toEqual(1);
    expect(factorial(0)).toEqual(1);
    expect(() => factorial(-1)).toThrowError(new MathsError(MathsError.values.NegativeNumberError, -1));
});
