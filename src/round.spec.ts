import {round} from "./round";
import {MathsError} from "./_internals/error";

it("Basic tests", () => {
    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(3.14159, 4)).toBe(3.1416);
    expect(round(3.14159, )).toBe(3);
    expect(round(3.6, )).toBe(4);
    expect(round(14.1, -1)).toBe(10);
    expect(round(16.1, -1)).toBe(20);
    expect(() => round(16.1, 5.01)).toThrowError(new MathsError(MathsError.values.NotIntegerNumberError, 5.01));
});
